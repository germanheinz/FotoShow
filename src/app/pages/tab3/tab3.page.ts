import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interface';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UIserviceService } from '../../services/uiservice.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  user: Usuario;

  constructor(private usuarioService: UsuarioService,private uiServiceService: UIserviceService, private postsService: PostsService) {}

  ngOnInit(): void {
    this.user = this.usuarioService.getUser();
  }

  logout(){
    this.postsService.pagePosts = 0;
    this.usuarioService.logout();
  }

  async updateUser(f: NgForm) {
  if (f.invalid) {
    return;
  }
  const updated = await this.usuarioService.updateUser(this.user);
  console.log(updated);
  if (updated) {
    this.uiServiceService.presentToast('User Updated');
  } else {
    this.uiServiceService.presentToast(`We could't update the User`);
  }

  }

}
