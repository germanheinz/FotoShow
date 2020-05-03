import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UIserviceService } from '../../services/uiservice.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Usuario } from '../../interfaces/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  @ViewChild('slidePrincipal', null) slides: IonSlides;

  loginUser = {
    email: 'test@test.com',
    password: '1234'
  };

  registerUser: Usuario = {
    email: 'test@test.com',
    nombre: 'test',
    password: '1234',
    avatar: 'av-1.png'
  };

  constructor(private usuarioService: UsuarioService, private uiServiceService: UIserviceService, private navController: NavController) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login(f: NgForm){
    if (f.invalid){ return; }
    console.log(f.value);
    const valid = await this.usuarioService.login(f.value.email, f.value.password);

    if (valid['ok']) {
      // if is valid, go to tabs. Pass the path and Animation!
      this.navController.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      this.uiServiceService.alertInformative(valid['mensaje']);
    }

  }

  async register(g: NgForm){

    if (g.invalid){ return; }
    console.log(g.value);
    const valid = await this.usuarioService.register(this.registerUser);

    if (valid['ok']) {
      // if is valid, go to tabs. Pass the path and Animation!
      this.navController.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      this.uiServiceService.alertInformative(valid['err'].errmsg);
    }

  }

  showRegister(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
  showLogin(){
    this.slides.lockSwipes(false); 
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }
}
