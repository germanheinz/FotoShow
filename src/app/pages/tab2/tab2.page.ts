import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { RouterModule, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  tempImages: string [] = [];

  post = {
    mensaje: '',
    coords: '',
    postPosition: false
  };

  loadingGeoLocalization = false;

  constructor(private postsService: PostsService, private router: Router, private geolocation: Geolocation, private camera: Camera) {}

  async crearPost(){
    console.log(this.post);
    const created = await this.postsService.createPost(this.post);
    this.post = {
        mensaje: '',
        coords: null,
        postPosition: false
      };
    this.tempImages = [];
    this.router.navigateByUrl('/main/tabs/tab1');
  }
  geoLocation(){
    if(!this.post.postPosition){
      this.post.coords = null;
      this.loadingGeoLocalization = false;
      return;
    }
    this.loadingGeoLocalization = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.loadingGeoLocalization = false;
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      console.log(coords);
      this.post.coords = coords;
     }).catch((error) => {
       console.log('Error getting location', error);
       this.loadingGeoLocalization = false;
     });
  }
  cameraSetting(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    this.imageProcessor(options);
  }

  library(){
      const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.imageProcessor(options);
  }

  imageProcessor(options: CameraOptions){
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
     //  let base64Image = 'data:image/jpeg;base64,' + imageData;
 
     const img = window.Ionic.WebView.convertFileSrc(imageData);
     this.postsService.uploadFile(imageData);
     this.tempImages.push(img);
 
     }, (err) => {
      // Handle error
     });
  }

}
