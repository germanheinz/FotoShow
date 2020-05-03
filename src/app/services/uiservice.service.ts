import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UIserviceService {

  constructor(private alertController: AlertController, private toastController: ToastController) { }


  async alertInformative(messages: string) {
    const alert = await this.alertController.create({
      message: messages,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 1500
    });
    toast.present();
  }
}
