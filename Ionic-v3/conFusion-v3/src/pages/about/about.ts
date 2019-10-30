import { Component, OnInit, Inject } from '@angular/core'; /** Ajout interface 'OnInit' et 'Inject' */
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/** Appel  à l'interface 'Leader' avec ses variables*/
import { Leader } from '../../shared/leader'; 

/** Appel au Provider (Service) permettant la 'comunication' (demande/récuperation données) avec la BdD (db.json)  */
import { LeaderProvider } from '../../providers/leader/leader'; 




/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage implements OnInit{

  leaders: Leader[];
  leaderErrMess: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private leaderService: LeaderProvider,
    @Inject('BaseURL') private BaseURL) {
  }

  ngOnInit(){
    /** Appel fonction 'getLeaders' et pas 'getFeatureLeader()' ou 'getLeader()' de LeaderProvider.ts */
    this.leaderService.getLeaders() 
    .subscribe(leaders => this.leaders = leaders, 
        errmess => this.leaderErrMess = <any>errmess);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
