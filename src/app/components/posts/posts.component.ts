import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../interfaces/interface';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  @Input() posts: Post [] = [];

  constructor() { }

  ngOnInit() {
    console.log(this.posts);
  }

}
