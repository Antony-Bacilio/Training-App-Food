import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Dish } from '../../shared/dish';


/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  commentForm: FormGroup; //Définir le Formulaire
  dish: Dish;
  donnees: any; //Variable nous permettant de résoudre l'assignement 2;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCrtl: ViewController,
    private formBuilder: FormBuilder) {

      // Obtenir 'data' de la page
      //var dataPage = navParams.get('data');

      //Implementation de notre formulaire 'commentForm'
      this.commentForm = this.formBuilder.group({
        author: ['', Validators.required],
        rating: 5,
        comment: [''],
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  //Fonction utilisée après cliquer sur "Cancel" ou "X" afin de revenir en arrière
  dismissModal() {
    // Retourner 'data' du modal
    this.viewCrtl.dismiss();// Whatever should be returned, e.g. a variable name: { name : this.name } 
  }

  onSubmit() {
    console.log(this.commentForm.value);
    this.donnees = this.commentForm.value;
    this.donnees.date = new Date().toISOString(); //Récuperation de la date automatiquement;

    // Retourner 'data' du modal
    this.viewCrtl.dismiss(this.donnees); // Whatever should be returned, e.g. a variable name: { name : this.name } 
  }

}
