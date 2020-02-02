import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { DishdetailPage } from '../dishdetail/dishdetail';
import { FavoriteProvider } from '../../providers/favorite/favorite';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit{

  dishes: Dish[];
  errMess: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private dishservice: DishProvider,
    private favoriteService: FavoriteProvider, 
    private toastCtrl: ToastController,
    @Inject('BaseURL') private BaseURL) {
  }

  ngOnInit(){
    this.dishservice.getDishes()
      .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);  
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  /** PUSH -> Empiler dans une pile (en créant de Fils à chaque empilation)
   *  POP -> Depiler (afin de revenir un arrière)
   */
  dishSelected(event, dish){
    //C'est bon, On push à nous-même.
    this.navCtrl.push(DishdetailPage, { 
      dish: dish}); /** La page 'DishdetailPage serait le FILS de ce 'Dish' précis  */
  }

  /** Création fonction afin d'ajouter Dishes dans Favorites */
  addToFavorites(dish: Dish) {
    console.log('Adding to Favorites', dish.id);
    this.favoriteService.addFavorite(dish.id);

    /** Appel de notre variable 'toastCrtl' déclarée dans le constructeur de 'menu', permettant de 'créer' et 'présenter' notre Toast */
    this.toastCtrl.create({
      message: "Dish" + dish.id + "added as favorite succesfully (menu.ts page)",
      duration: 3000
    }).present();
  }

}
