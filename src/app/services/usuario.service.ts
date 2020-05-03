import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/interface';
import { NavController } from '@ionic/angular';



const URL = environment.url;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  token: string = null;
  usuario: Usuario;

  constructor(private http: HttpClient, private storage: Storage, private navController: NavController) { }

  getUser(){
    if (!this.usuario._id) {
      this.verifyToken();
    }
    return {...this.usuario};
  }

  login(email: string, password: string) {
    const data = {email, password};

    //I make a Promise, 
    //because I need handle the response of this service in component Login

    return new Promise( resolve => {
      this.http.post<Usuario>(`${URL}/user/login`, data)
      .subscribe(async resp => {
      console.log(resp);

      // Send Token to Save in Storage
      if (resp['ok']) {
        await this.saveToken(resp[ 'token' ]);
        resolve(resp);
      } else {
        this.token = null;
        this.storage.clear();
        resolve(resp);
      }

    });

    });
  }

  register(user: Usuario){
    return new Promise(resolve => {
      this.http.post<Usuario>(`${URL}/user/create`, user)
      .subscribe(async resp => {
          console.log(resp);
          if (resp['ok']) {
            await this.saveToken(resp[ 'token' ]);
            resolve(resp);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(resp);
          }
      });
    });
  }
  async saveToken(token: string){
    this.token = token;
    await this.storage.set('token', this.token);
    await this.verifyToken();
  }
  async loadTokenFromStorage() {
    this.token = await this.storage.get('token') || null;
  }

  async verifyToken(): Promise<boolean> {

    await this.loadTokenFromStorage();

    if (!this.token) {
      this.navController.navigateRoot('/login');
      return Promise.resolve(false);
    }

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise<boolean>(resolve => {
      this.http.get(`${URL}/user/`, {headers}).subscribe(resp => {
        if (resp['ok']) {
          this.usuario = resp['usuario'];
          resolve(true);
        } else {
          this.navController.navigateRoot('/login');
          resolve(false);
        }
      });
    });
  }

  updateUser(user: Usuario) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });
    return new Promise<boolean>(resolve => {
    this.http.post(`${URL}/user/update`, user, {headers})
    .subscribe(resp => {
      console.log(resp);

      if (resp['ok']) {
        this.saveToken(resp['token']);
        resolve(true);
      } else {
        resolve(false);
      }
    });
    });
  }

  logout(){
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    this.navController.navigateRoot('/login', {animated: true});
  }

  }
