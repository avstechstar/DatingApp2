import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable } from 'rxjs';
import { User } from '../_models/user';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {}
  // loggedIn: boolean = false;
  // currentUser$: Observable<User> = this.accountSerivce.currentUser$;

  //constructor(private accountSerivce: AccountService) { }
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    // this.getCurrentUser();
    // this.currentUser$ = this.accountSerivce.currentUser$;

  }

  login(){
     this.accountService.login(this.model).subscribe(response=>{
      console.log(response);
      // this.loggedIn = true;
    }, error=>{
      console.log(error);
    })
  }

  logout(){
    this.accountService.logout();
    // this.loggedIn = false;
  }

  // getCurrentUser()
  // {
  //   this.accountSerivce.currentUser$.subscribe(user =>{
  //     this.loggedIn =!! user;
  //   }, error =>{
  //     console.log(error);      
  //   })
  // }
}
