import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the ReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html',
})
export class ReservationPage {

  reservationForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder) {


      // Créaton du 'formulaire reactive'
      /** Une fois le Model est ouvert, le formulaire 'form' sera affiché dedans le Model */
      this.reservationForm = this.formBuilder.group({ //Création structure pour notre formulaire reactive;
          guests: 3,
          smoking: false,
          dateTime: ['', Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationPage');
  }

  //Fonction utilisée après cliquer sur "Cancel" ou "X" afin de revenir en arrière
  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    console.log(this.reservationForm.value);
    this.viewCtrl.dismiss();
  }

}
