import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/_models/message';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm: NgForm;
  @Input() messages: Message[];
  @Input() username: string; // you will get this populated from Member-detail-component.html
  messageContent: string;

  constructor(private messageSerice: MessageService) { }

  ngOnInit(): void {

  }

  sendMessage(){
    this.messageSerice.sendMessage(this.username, this.messageContent).subscribe(message=>{
        this.messages.push(message);
        this.messageForm.reset();
      })
  }
  
}
