import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';

/**
 * Generated class for the WithdrawPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-withdraw',
  templateUrl: 'withdraw.html',
})
export class WithdrawPage {

  token: String;
  coin: String;
  balance: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService) {
    this.token = this.appService.getToken();
    this.coin = AppGlobal.coin;
  }

  // 获取余额
  getBalance(){
    let params = {
      token: this.token
    }
    this.appService.httpGet(AppGlobal.API.memberInfo, params, rs=>{
      if(rs.code == 200){
        this.balance = rs.data['balance'];
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawPage');
    this.getBalance();
  }

}
