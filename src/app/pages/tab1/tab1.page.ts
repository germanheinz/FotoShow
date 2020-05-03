import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private postsService: PostsService) {}

  posts: Post[] = [];
  able = true;

  ngOnInit() {
   this.next();
   this.postsService.newPost
     .subscribe(post => {
       this.posts.unshift(post);
     });
  }
  next(event?, pull: boolean = false) {

    this.postsService.getPosts(pull)
    .subscribe(resp => {
      console.log(resp);
      this.posts.push(...resp.posts);

      if (event) {
        event.target.complete();
        if (resp.posts.length === 0 ) {
          this.able = false;
        }
      }
    });
  }
  doRefresh(event){
    this.next(event, true);
    this.able = true;
    this.posts = [];
  }

}
