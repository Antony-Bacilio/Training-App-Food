import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment'
import { FavoriteProvider } from '../../providers/favorite/favorite';

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
    private favoriteService: FavoriteProvider) {
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
  }

}
