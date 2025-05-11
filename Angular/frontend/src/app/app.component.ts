import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './presentation/home/home.component';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./presentation/login/login.component";
import { ToastModule } from 'primeng/toast';
import { PostsComponent } from './presentation/components/posts/posts.component';
import { CrudPostsComponent } from "./presentation/crud-posts/crud-posts.component";
import { UserComponent } from './presentation/components/user/user.component';
import { CrudUserComponent } from './presentation/crud-user/crud-user.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    HomeComponent,
    PostsComponent,
    ToastModule,
    ButtonModule,
    ToolbarModule,
    CommonModule, 
    LoginComponent, 
    CrudPostsComponent,
    CrudUserComponent,
    UserComponent
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PostApp';
  currentView : string = 'home';


  changeView(view: string){
    this.currentView = view;
  }
}
