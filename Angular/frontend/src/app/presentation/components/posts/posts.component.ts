import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardModule } from 'primeng/card';

import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-posts',
  imports: [
    CardModule,
    ButtonModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit{
  //input variables for Title, authos and content
  @Input() post: any = {};
  @Input() editable : boolean = false;
  @Output() deletePost : any = new EventEmitter<any>();
  @Output() editPost : any = new EventEmitter<any>();
  
  title : string = "";
  content : string = "";

  ngOnInit(): void {
    this.title = `${this.post.title} - ${this.post.user.username}`;
    this.content = this.post.content
  }

  deleteThisPost() : void {
    console.log(this.post.id);
    this.deletePost.emit(this.post.id);
  }

  editThisPost() : void {
    this.editPost.emit(this.post);
  }

  constructor() { }
}
