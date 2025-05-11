import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { AuthService } from '../../core/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    PanelModule

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  @Output() onLogin : any = new EventEmitter();

  constructor(
    private readonly authService : AuthService,
    private readonly messageService : MessageService
  ) { }

  isLogin : boolean = true;
  isAuth : boolean = false;
  name : string = "";
  password : string = "";
  confirmPassword : string = "";

  ngOnInit(): void {
    this.isAuth = (localStorage.getItem('token')) ? true : false;
  }

  logOutHandler () : void {
    localStorage.removeItem('token');
    this.isAuth = false
  }

  validateAuthForm() : boolean{
    //all fields are required
    if(this.name === "" || this.password === "" || (!this.isLogin &&  this.confirmPassword === "")) {
      this.messageService.add({severity:'error', summary:'Error', detail:'All fields are required'});
      return true;
    }

    if(!this.isLogin  && this.password !== this.confirmPassword) {
      this.messageService.add({severity:'error', summary:'Error', detail:'Passwords do not match'});
      return true;
    } 
    if (this.password.length < 8) {
      this.messageService.add({severity:'error', summary:'Error', detail:'Password must be at least 8 characters long'});
      return true;
    }
    return true;
    
  }

  handleSignUp() : void {
    if (!this.validateAuthForm()) return;

    this.authService.signUp(this.name, this.password).subscribe( (res) => {
      console.log(res);
      this.messageService.add({severity:'success', summary:'Success', detail:'User created successfully'});
      this.isLogin = true;
    }, (error) => {
      console.log(error);
      this.messageService.add({severity:'error', summary:'Error', detail:'error.login.message'});
    });

  }

  handleLogIn() : void {
    if (!this.validateAuthForm()) return;

    this.authService.logIn(this.name, this.password).subscribe( (res) => {
      console.log(res);
      const response : any = res.data;
      localStorage.setItem('token', response.login.token);
      this.messageService.add({severity:'success', summary:'Success', detail:'User logged in successfully'});
      setTimeout(() => {
        this.onLogin.emit();
      }, 1000);
    }, (error) => {
      console.log(error);
      this.messageService.add({severity:'error', summary:'Error', detail:'error.login.message'});
    });
  }

  switchToSignUp() : void {
    this.isLogin = !this.isLogin;
  }



}
