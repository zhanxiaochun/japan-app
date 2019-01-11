import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';

/**
 * Generated class for the RechargePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recharge',
  templateUrl: 'recharge.html',
})
export class RechargePage {

  token: String;
  coin: String;
  wechat: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService) {
    this.token = this.appService.getToken();
    this.coin = AppGlobal.coin;
  }

  // 立即充值
  rechargenow(){
    let params = {
      token: this.token,
      type: 2,
      money: 100,
      note: '',
    }
    this.appService.httpPost(AppGlobal.API.recharge, params, rs=>{
      console.log(rs);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RechargePage');
  }

}
