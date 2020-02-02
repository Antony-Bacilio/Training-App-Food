import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment'
import { FavoriteProvider } from '../../providers/favorite/favorite'; //Import Ionic native plugin
import { SocialSharing } from '@ionic-native/social-sharing'; //Import Ionic native plugin

import { CommentPage } from '../comment/comment';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  dish: Dish;
  errMess: string;
  avgstars: string;
  numcommments: number; 
  favorite: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject('BaseURL') private BaseURL,
    private favoriteService: FavoriteProvider,
    private toastCtrl : ToastController,
    private actionSheetCtrl : ActionSheetController,
    public modalCtrl: ModalController,
    private socialSharing: SocialSharing,
    ) {
      this.dish = navParams.get('dish');
      this.favorite = favoriteService.isFavorite(this.dish.id); // Appel de notre fonction créée 'isFavorite()' dans FavoriteProvider;
      this.numcommments = this.dish.comments.length;

      let total = 0;
      this.dish.comments.forEach(comment => total += comment.rating);
      this.avgstars = (total/this.numcommments).toFixed(2); /** 2 valeurs après la ',' décimal */
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  /** Création fonction afin d'ajouter Dishes dans Favorites */
  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteService.addFavorite(this.dish.id);

    /** Appel de notre variable 'toastCrtl' déclarée dans le constructeur de 'dishDetails', permettant de 'créer' et 'présenter' notre Toast */
    this.toastCtrl.create({
      message: "Dish" + this.dish.id + "added as favorite succesfully (dishDetails.ts page)",
      position: 'middle',
      duration: 3000
    }).present();
  }

  /** Permet d'ouvrir le Modal comment */
  openCommentModal() {
    let modal = this.modalCtrl.create(CommentPage); // Création Modal en dehors de la page 'CommentPage'

    // Obtenir/Recevoir 'data' du modal:
    modal.onDidDismiss( data => {
                          if(data) this.dish.comments.push(data);
                      } ); //Avec 'push()' pour ajouter à la 'pile' de commentaires les données récuperées du modal

    modal.present();
  }

  moreOptionsDish() {
    let actionSheet = this.actionSheetCtrl.create({
      title : "Choisir Actions",
      buttons : [
        {
          text : "Add to Favorites ",
          handler : () => {
            console.log("Add favorites floating button cliqué");
            this.addToFavorites();
          }
        },
        {
          text : "Add a Comment",
          handler : () => {
            console.log("Add Comment floating bouton cliqué");
            this.openCommentModal();

          }
        },
        { /** 'Boutons' ajouté afin d'utiliser le Ionic Native Plugin de Social Media */
          text: 'Partager via Facebook',
          handler: () => {

            // Check if sharing via email is supported
            this.socialSharing.canShareVia('com.apple.social.facebook').then(() => {
              // Sharing via email is possible
            }).catch(() => {
              // Sharing via email is not possible
            });

            this.socialSharing.shareViaFacebook(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Publié successfully to Facebook'))
              .catch(() => console.log('Echec to post to Facebook'));
          }

        },
        {
          text: 'Partager via Twitter',
          handler: () => {

            // Check if sharing via email is supported
            this.socialSharing.canShareVia('twitter').then(() => {
              // Sharing via email is possible
            }).catch(() => {
              // Sharing via email is not possible
            });

            this.socialSharing.shareViaTwitter(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Publié successfully to Twitter'))
              .catch(() => console.log('Echec to post to Twitter'));
          }

        },
        {
          text : "Refuser",
          role : "cancel",
          handler : () => {
            console.log("Cancel cliqué");
          }
        }
      ]

    });

    actionSheet.present();

  }

}
