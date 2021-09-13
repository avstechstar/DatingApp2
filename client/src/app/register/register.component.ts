import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  // @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate_registerComponentParent: Date;
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate_registerComponentParent = new Date();
    this.maxDate_registerComponentParent.setFullYear(this.maxDate_registerComponentParent.getFullYear()-18);

  }

  initializeForm(){
    this.registerForm = this.fb.group({
      gender:         ['male'],
      username:         ['', Validators.required],
      knownAs:         ['', Validators.required],
      dateOfBirth:         ['', Validators.required],
      city:         ['', Validators.required],
      country:         ['', Validators.required],
      password:         ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword:  ['', [Validators.required, this.matchValues('password') ]]
    })
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, 
    //        Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', [Validators.required, this.matchValues('password') ]) 
    // })
 
    // this.registerForm.controls.password.valueChanges.subscribe(()=>{
    //   this.registerForm.controls.confirmPassword.updateValueAndValidity(); // prevent change password after confirmPasswor validation
    // })
  }

  matchValues(matchTo: string): ValidatorFn{  
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
        ? null: {isMatching: true}
    }
    // control?.vaue is the confirmPassword control,
    // matchTo is the password control
    // return null means matching passowrd and confirmpasswor.

  }

  register(){
    //console.log(this.registerForm.value);
    this.accountService.register(this.registerForm.value).subscribe(response =>{
          this.router.navigateByUrl('/members');
    }, error=>{
      this.validationErrors = error;
      //console.log(error);
      //this.toastr.error(error.error);
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
    //console.log('cancelled');
  }

}
