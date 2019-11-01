//import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(public http: Http /*HttpClient*/) {
    console.log('Hello FavoriteProvider Provider');
    this.favorites = [];

  }

  addFavorite(id:number): boolean {
    this.favorites.push(id);  /** On se sert d'Array afin d'utiliser 'push()' et 'pop()' */
    return true

  }

  isFavorite(id:number):boolean {
    return this.favorites.some(el => el == id);
  }

}
