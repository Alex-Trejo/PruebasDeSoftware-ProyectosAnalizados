import { Component, OnInit } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { PostsService } from '../../core/services/posts.service';
import { PostsComponent } from '../components/posts/posts.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    ToolbarModule,
    ButtonModule,
    PostsComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  posts : any = [];

  constructor(
    private readonly postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.postsService.getAllPublicPosts().subscribe( (res) => {
      this.posts = res.data;
      this.posts = this.posts.getPublicPosts;
    }, (error) => {
      console.log(error);
    }
    );
  }

}
