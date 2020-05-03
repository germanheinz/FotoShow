import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interface';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UIserviceService } from '../../services/uiservice.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {


  constructor(private postsService: PostsService, private usuarioService: UsuarioService) {}

  ngOnInit(): void {

  }
  logout(){
    this.postsService.pagePosts = 0;
    this.usuarioService.logout();
  }

}
