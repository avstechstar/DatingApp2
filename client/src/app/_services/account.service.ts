
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) =>{
        const user = response;
        if (user){
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) =>{
        if(user){
          this.setCurrentUser(user);
        }
       // return user;
      })
    )
  }
   
  setCurrentUser(user: User){
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles); // if is single value, push to the array as one element
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
}

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(undefined );
  }
  
  // token is not encrypted, it is clear text, only the signature is encrypted
  getDecodedToken(token){ // 3 parts in the token, we want to get the middle part,i.e. payload
    return JSON.parse(atob(token.split('.')[1]))
  }

}
