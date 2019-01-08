import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PaysuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paysuccess',
  templateUrl: 'paysuccess.html',
})
export class PaysuccessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  gohome(){
    // this.navCtrl.push(HomePage);
    this.navCtrl.popToRoot();
  }

  goorder(){
    console.log('order');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaysuccessPage');
  }

}
