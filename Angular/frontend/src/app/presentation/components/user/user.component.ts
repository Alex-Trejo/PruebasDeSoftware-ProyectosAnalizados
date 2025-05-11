import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CardModule } from 'primeng/card';

import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user',
  imports: [
    CardModule,
    ButtonModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{
  
  @Input() user: any = {};
  @Input() editable : boolean = false;
  @Output() deleteUser : any = new EventEmitter<any>();
  @Output() editUser : any = new EventEmitter<any>();
  
  username : string = "";
  role : string = "";
  password: string = "";

  ngOnInit(): void {
    this.username = `${this.user.username}`;
    this.role = `${this.user.role}`;
    this.password = `${this.user.password}`;
  }

  deleteThisUser() : void {
    console.log(this.user.id);
    this.deleteUser.emit(this.user.id);
  }

  editThisUser() : void {
    this.editUser.emit(this.user);
  }

  constructor() { }

}
