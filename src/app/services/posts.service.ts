import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { ResponsePosts, Post } from '../interfaces/interface';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  pagePosts = 0;
  newPost = new EventEmitter<Post>();

  constructor(public http: HttpClient, private usuarioService: UsuarioService, private fileTransfer: FileTransfer) { }

  getPosts(pull: boolean = false) {

    if(pull){
      this.pagePosts = 0;
    }
    this.pagePosts++;
    return this.http.get<ResponsePosts>(`${URL}/posts/?pagina=${this.pagePosts}`);
  }
  createPost(post){
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise(resolve => {
      this.http.post(`${URL}/posts`, post, {headers})
      .subscribe(resp => {
        console.log(resp);
        this.newPost.emit(resp['post']);
        resolve(true);
      });
    });

}

uploadFile(img: string){
const options: FileUploadOptions = {
  fileKey: 'image',
  headers: {
    'x-token': this.usuarioService.token
  }
};
const fileTransfer: FileTransferObject = this.fileTransfer.create();
fileTransfer.upload(img, `${URL}/posts/upload`, options)
.then(data => {
  console.log(data);
}).catch(err => {
  console.log('error en carga', err);
});
}

}
