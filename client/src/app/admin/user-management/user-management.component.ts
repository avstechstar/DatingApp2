import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: Partial<User[]>;
  bsModalRef: BsModalRef;
  
  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles(){
    this.adminService.getUsersWithRoles().subscribe(users=>{
      this.users = users;
    })
  }

  openRolesModal(user: User){
    const config = {
      class: 'model-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(user)
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, config); // RolesModalComponent bring up the roles-modal.component

    //  the roles-modal.component.ts -> updateSelectedRoles()
    this.bsModalRef.content.updateSelectedRoles.subscribe(values => {
      const rolesToUpdate = {
        roles: [...values.filter(el=>el.checked === true).map(el=> el.name)]
      };
      if(rolesToUpdate) {
        this.adminService.updateUserRoles(user.username, rolesToUpdate.roles).subscribe(()=>{
          user.roles = [...rolesToUpdate.roles]
        })
      }
    })
    //#region 
    // copied from https://valor-software.com/ngx-bootstrap/#/modals
    // const initialState = {
    //     list: [
    //       'Open a modal with component',
    //       'Pass your data',
    //       'Do something else',
    //       'test 1',
    //       '...'
    //     ],
    //     title: 'Modal with component'
    // };
    // this.bsModalRef = this.modalService.show(RolesModalComponent, {initialState});
    // this.bsModalRef.content.closeBtnName = 'CloseX';
  //#endregion
    //this.bsModalRef = this.modalService.show(RolesModalComponent)
  }

  private getRolesArray(user){
    const roles = [];
    const userRoles = user.roles ;
    const availableRoles: any[]=[
      {name:'Admin', value: 'Admin'},
      {name:'Moderator', value: 'Moderator'},
      {name:'Member', value: 'Member'}
    ];

    availableRoles.forEach(role =>{
      let isMatch = false;
      for (const userRole of userRoles){
        if(role.name === userRole){
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if(!isMatch){
        role.checked = false;
        roles.push(role);
      }
    })
    return roles;
  }

}
