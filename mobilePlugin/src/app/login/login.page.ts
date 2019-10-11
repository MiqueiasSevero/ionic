import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login:any ; 
  estatus:any;

  constructor(private barcodeScanner: BarcodeScanner,public toastController: ToastController) { }

  pegarBarcod(){
    this.barcodeScanner.scan().then(barcodeData => {

      this.login = barcodeData.text;
      if(this.login != "692710"){

        this.estatus = "Não autorizado";
        this.presentToast(this.estatus,"danger");

      }else{
        this.estatus = "Autorizado - Bem Vindo :"+ this.login;
        this.presentToast(this.estatus,"success");
      }
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

  async presentToast(mensagem:any,color:any) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 10000,
      color:color
    });
    toast.present();
  }


  ngOnInit() {
  }

}
