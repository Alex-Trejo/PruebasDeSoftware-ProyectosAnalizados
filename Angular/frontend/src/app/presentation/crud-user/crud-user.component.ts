import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button'; 
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { MessageService } from 'primeng/api';
import { UserComponent } from '../components/user/user.component';



@Component({
  selector: 'app-crud-user',
  imports: [
    CardModule,
    UserComponent,
    ButtonModule,
    DialogModule,
    FloatLabelModule,
    InputTextModule,
    ToggleSwitchModule,
    CommonModule,
    
    FormsModule
  ],
  templateUrl: './crud-user.component.html',
  styleUrl: './crud-user.component.scss'
})
export class CrudUserComponent implements OnInit{
  constructor(
    private readonly userService : UserService,
    private readonly messageService : MessageService
  ){}

  @Output() redirectLogin : any = new EventEmitter();
  visible : boolean = false;
  checked : boolean = false;
  username : string = "";
  role : string = "";
  password: string = "";
  isEdit : boolean = false;
  authToken : string = "";
  users : any = [];
  roles : any = [];

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.redirectLogin.emit();
    }else {
      this.authToken = localStorage.getItem('token') ?? "";
    }

    this.loadUsers();
  }

  loadUsers() : void {
    this.userService.getUsers(this.authToken).subscribe( (res) => {
      console.log(res);
      this.users = res.data;
      this.users = this.users.getUsers;
    });
  }


  deleteUser(id : string) : void {
    this.userService.deleteUser(id, this.authToken).subscribe( (res) => {
      console.log(res);
      this.loadUsers();
      console.log(res);
        this.messageService.add({severity:'success', summary:'Success', detail:'User delete successfully'});
        this.loadUsers();
    });
  }

  currentUser : any = {};
  editUser(user : any) : void {
    this.isEdit = true;
    this.visible = true;
    this.username = user.username;
    this.role = user.role;
    this.password = user.password;
    console.log(user);
    this.currentUser = user;
  }

  clearForm(): void {
    this.username = "";
    this.password = "";
    this.role = "";
    this.visible = false; 
  }

  saveUser() : void {
    if (!this.isEdit) {
      console.log(this.username, this.role,this.password,this.authToken);
      this.userService.createUser(this.username, this.password,this.role, this.authToken).subscribe( (res) => {
        console.log(res);
        this.messageService.add({severity:'success', summary:'Success', detail:'User created successfully'});
        this.loadUsers();
        this.clearForm();
        
      }, (error) => {
        console.log(error);
        this.messageService.add({severity:'error', summary:'Error', detail:'User could not be created'});
      });
    }else {
      this.userService.editUser(this.currentUser.id, this.username, this.password,this.role, this.authToken).subscribe( (res) => {
        console.log(res);
        this.messageService.add({severity:'success', summary:'Success', detail:'User edited successfully'});
        this.loadUsers(); 
        this.clearForm();
        
      }, (error) => {
        console.log(error);
        this.messageService.add({severity:'error', summary:'Error', detail:'User could not be edited'});
      });

      this.visible = false;
      this.isEdit = false;
      this.loadUsers();
      
    }
  }


  showDialogToAdd() : void {
    this.isEdit = false;
    this.visible = true;
  
  }



  





}
