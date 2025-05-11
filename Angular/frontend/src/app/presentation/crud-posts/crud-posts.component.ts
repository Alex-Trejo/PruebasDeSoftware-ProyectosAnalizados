import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button'; 
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../../core/services/posts.service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { MessageService } from 'primeng/api';
import { PostsComponent } from '../components/posts/posts.component';


@Component({
  selector: 'app-crud-posts',
  imports: [
    CardModule,
    PostsComponent,
    ButtonModule,
    DialogModule,
    FloatLabelModule,
    InputTextModule,
    ToggleSwitchModule,
    CommonModule,
    
    FormsModule
  ],
  templateUrl: './crud-posts.component.html',
  styleUrl: './crud-posts.component.scss'
})
export class CrudPostsComponent implements OnInit{
  constructor(
    private readonly postsService : PostsService,
    private readonly messageService : MessageService
  ){}

  @Output() redirectLogin : any = new EventEmitter();
  visible : boolean = false;
  checked : boolean = false;
  title : string = "";
  body : string = "";
  isEdit : boolean = false;
  authToken : string = "";
  posts : any = [];

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.redirectLogin.emit();
    }else {
      this.authToken = localStorage.getItem('token') ?? "";
    }

    this.loadPosts();
  }

  loadPosts() : void {
    this.postsService.getMyPosts(this.authToken).subscribe( (res) => {
      console.log(res);
      this.posts = res.data;
      this.posts = this.posts.getMyPosts;
      
    }
    );
  }

  deletePost(id : string) : void {
    this.postsService.deletePost(id, this.authToken).subscribe( (res) => {
      console.log(res);
      this.messageService.add({severity:'success', summary:'Success', detail:'Post deleted successfully'});
      this.loadPosts();
    }, (error) => {
      console.log(error);
      this.messageService.add({severity:'error', summary:'Error', detail:'Post could not be deleted'});
    });
  }
  currentPost : any = {};
  editPost(post : any) : void {
    this.title = post.title;
    this.body = post.content;
    this.visible = true;
    console.log(post);
    this.currentPost = post;
    this.isEdit = true;
  }

  savePost() : void {
    if (!this.isEdit) {
      console.log(this.title, this.body, this.checked, this.authToken);
      this.postsService.createPost(this.title, this.body, this.checked, this.authToken).subscribe( (res) => {
        console.log(res);
        this.messageService.add({severity:'success', summary:'Success', detail:'Post created successfully'});
        this.loadPosts();
        this.clearForm();
      }, (error) => {
        console.log(error);
        this.messageService.add({severity:'error', summary:'Error', detail:'Post could not be created'});
      });
      
      this.visible = false;
    }else {
      this.postsService.editPost(this.currentPost.id, this.title, this.body, this.checked, this.authToken).subscribe( (res) => {
        console.log(res);
        this.messageService.add({severity:'success', summary:'Success', detail:'Post edited successfully'});
        this.loadPosts();
        this.clearForm(); 
      }
      );
      this.visible = false;
      this.isEdit = false;
      this.loadPosts();
    }
  }

  clearForm(): void {
    this.title = "";
    this.body = "";
    this.checked = false;
    this.visible = false;  
  }

  showDialogToAdd() : void {
    this.visible = true;
    this.isEdit = false;
  }
}
