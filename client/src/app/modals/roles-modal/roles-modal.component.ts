import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';
//import { EventEmitter } from 'stream';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.scss']
})
export class RolesModalComponent implements OnInit {
  @Input() updateSelectedRoles = new EventEmitter(); // is used in user-management.compnent.ts
  user: User;
  roles: any[] ; // if is :any, then solve the problem

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  //get called when click on the submit button
  updateRoles(){
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }

}
