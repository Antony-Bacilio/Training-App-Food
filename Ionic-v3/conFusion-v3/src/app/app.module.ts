import { BrowserModule } from '@angular/platform-browser';

import { HttpModule} from '@angular/http'

import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage'; //Appel à notre outil, déjà installé, Storage;

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { MenuPage } from '../pages/menu/menu';
import { ContactPage } from '../pages/contact/contact';
import { DishdetailPage} from '../pages/dishdetail/dishdetail';
import { FavoritesPage } from '../pages/favorites/favorites';
import { ReservationPage } from '../pages/reservation/reservation';
import { CommentPage } from '../pages/comment/comment'; //Modal (pas une 'vrai' page)
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register'; //Modal (pas une 'vrai' page)

/* Ionic Native Plugins (?) */
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen'; //Splash Screen = Ecran de démarrage;
import { LocalNotifications } from '@ionic-native/local-notifications'; //Local Notification Plugin
import { EmailComposer } from '@ionic-native/email-composer'; //Email Plugin
import { SocialSharing } from '@ionic-native/social-sharing'; //Socail media Plugin


import { DishProvider } from '../providers/dish/dish';
import { LeaderProvider } from '../providers/leader/leader';
import { PromotionProvider } from '../providers/promotion/promotion';
import { ProcessHttpmsgProvider } from '../providers/process-httpmsg/process-httpmsg';

import { baseURL} from '../shared/baseurl';
import { FavoriteProvider } from '../providers/favorite/favorite';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    MenuPage,
    ContactPage,
    DishdetailPage,
    FavoritesPage,
    ReservationPage,
    CommentPage, //Modal - Rajouté même si elle est dans un onglet (dans l'onglet Menu->DishDetails)
    LoginPage,
    RegisterPage //Modal dans "Login page"
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    MenuPage,
    ContactPage,
    DishdetailPage,
    FavoritesPage,
    ReservationPage,
    CommentPage, //Modal - Rajouté même si elle est dans un onglet (dans l'onglet Menu->DishDetails)
    LoginPage,
    RegisterPage //Modal dans "Login page"
  ],
  providers: [
    StatusBar,
    SplashScreen, //Ecran de démarrage
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications, //Local Notification Plugin
    DishProvider,
    LeaderProvider,
    PromotionProvider,
    ProcessHttpmsgProvider,
    {provide: 'BaseURL', useValue: baseURL},
    FavoriteProvider,
    EmailComposer, //Email plugin
    SocialSharing, //Social media plugin
  ]
})
export class AppModule {}
