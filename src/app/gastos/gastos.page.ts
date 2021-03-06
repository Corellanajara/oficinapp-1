import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController} from '@ionic/angular';
import { GastoService } from '../_servicios/gasto.service';

interface Gasto {
  id: number;
  titulo: string;
  tipo: number;
  descripcion: string;
  monto: number;
  fecha: Date;
}

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})

export class GastosPage implements OnInit {

  gastos = [];
  public gasto : Gasto = {id:0,titulo:'',tipo:0,descripcion:'',monto:0,fecha:new Date()};

  constructor(private gastoService:GastoService,
              private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) { }

  ngOnInit() {
  }

  public guardarGasto(){
    console.log('entra');
    this.gasto.id = 0 + (this.gastos.length + 1);
    this.gastoService.insertar(this.gasto).subscribe(gasto=>{
      console.log('entra2');
    })
    console.log('entra3');
    this.gastos.push(this.gasto);
    this.gasto = {id:0,titulo:'',tipo:0,descripcion:'',monto:0,fecha:new Date()};
  }

  async confirmar() {
    console.log(this.gasto);

    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>Agregar un Gasto</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.guardarGasto();
          }
        }
      ]
    });

    await alert.present();
  }
}
