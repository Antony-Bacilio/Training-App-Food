import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EmailComposer } from '@ionic-native/email-composer'; //Email Plugin

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private emailComposer: EmailComposer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  

  /** Fonction ajouté afin d'utiliser les fonctionnalités du Plugin Email de Ionic native */
  //Et qui sera appelée dans le 'contact.hmtl' lors que le bouton email et cliqué;
  sendEmail() {

    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
        console.log('VERIFIE');
      }
     });

    let email = {
      to: 'antonybaciliosalazar@gmail.com',
      subject: '[ConFusion]: Query',
      body: 'Dear Sir/Madam:',
      isHtml: true
    };

    // Send a text message using default options
    this.emailComposer.open(email);
  }

}
