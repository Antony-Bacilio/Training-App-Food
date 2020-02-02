//import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';

/** Quand on a les Favoris et on les montre, 
 * alors on devrait le retourner comme un Observable d'un type d'array dish.
 * C'est pour ça on a besoin de Dish (Interface) et DishProvider pour récuperer les données*/
import { Observable } from 'rxjs/Observable';

import { DishProvider } from '../dish/dish';
//Pour le Assignment 3 maybe : import { Storage } from '@ionic/storage'
import { LocalNotifications } from '@ionic-native/local-notifications'; //Declaré aussi dans 'app.module.ts' (providers[...])
import 'rxjs/add/operator/map';


/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(public http: Http /*HttpClient*/,
    private dishesService: DishProvider, //private storage : Storage,
    private localNotifications: LocalNotifications) {
    console.log('Hello FavoriteProvider Provider');
    this.favorites = [];

  }

  addFavorite(id:number): boolean {
    if(!this.isFavorite(id)) {
      this.favorites.push(id);  /** On se sert d'Array afin d'utiliser 'push()' et 'pop()' */
      //this.storage.set('favorites', this.favorites);

      this.localNotifications.schedule({
        id: id,
        text: 'Dish' + id + 'ajouté comme un favoris successfully',
      })
    } 
    console.log('favorites', this.favorites);
    return true;

  }

  isFavorite(id:number):boolean {
    return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    /**
     * Appel tous les Dishes, puis Filtrer only Dishes qui sont dans la 'Liste de favoris' 
     *en vérifiant si appartient à la Liste ou pas;
     */ 
    return this.dishesService.getDishes() 
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  
  /** Retourner la mise-à-jour de 'Liste de dishes' */
  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id); // Vérifier si 'id' est dans notre Liste, sinon retourner -1;

    //Si 'index' du 'dish' existe dans la 'Liste de favoris'
    if(index >=0) {
      this.favorites.splice(index, 1);
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite'+id);
    }

  }

}
