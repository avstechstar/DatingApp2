import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Flagstaff client';
  users: any;

  constructor(/*private http: HttpClient,*/ private accountService: AccountService){}

  ngOnInit() {
  //  this.getUsers(); // move the function to the home.component
   this.setCurrentUser();
  }

  setCurrentUser(): void{
    const stt: any = localStorage.getItem('user');
    const user: User = JSON.parse(stt);

    this.accountService.setCurrentUser(user);
  }

  // getUsers(){
  //   this.http.get('https://localhost:5001/api/users').subscribe(response => {
  //     this.users = response;
  //   }, error=>{
  //     console.log(error)
  //   })
  // }
}
