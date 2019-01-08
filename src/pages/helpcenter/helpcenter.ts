import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpcenterDetailPage } from '../helpcenter-detail/helpcenter-detail';

/**
 * Generated class for the HelpcenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-helpcenter',
  templateUrl: 'helpcenter.html',
})
export class HelpcenterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goDetail(category){
    this.navCtrl.push(HelpcenterDetailPage, {
      category: category
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpcenterPage');
  }

}
