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
  wechatpay: Boolean = false;
  alipay: Boolean = false;
  paytype: Number = 0;
  amount: Number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService) {
    this.token = this.appService.getToken();
    this.coin = AppGlobal.coin;
  }

  // 支付方式
  paymethod(type){
    if(type == 1){
      this.alipay = true;
      this.wechatpay = false;
    }else if(type == 2){
      this.alipay = false;
      this.wechatpay = true;
    }
    this.paytype = type;
  }

  // 立即充值
  rechargenow(){
    console.log(this.paytype);
    if(this.amount == undefined){
      this.appService.toast('请输入充值金额');return;
    }
    if(this.paytype < 1){
      this.appService.toast('请选择支付方式');return;
    }
    let params = {
      token: this.token,
      type: this.paytype,
      money: this.amount,
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
