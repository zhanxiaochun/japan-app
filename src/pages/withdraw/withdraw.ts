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
  alipay: Boolean = false;
  wechatpay: Boolean = false;
  type: Number = 0;
  amount: Number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService) {
    this.token = this.appService.getToken();
    this.coin = AppGlobal.coin;
  }

  // 提现方式
  method(type){
    if(type == 1){
      this.alipay = true;
      this.wechatpay = false;
    }else if(type == 2){
      this.alipay = false;
      this.wechatpay = true;
    }
    this.type = type;
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

  withrownow(){
    if(this.type < 1){
      this.appService.toast('请选择提现方式');return;
    }
    if(this.amount == undefined){
      this.appService.toast('请输入提现金额');return;
    }
    
    let params = {
      token: this.token,
      type: this.type,
      money: this.amount,
      account: '1',
      name: '1',
      note: '1'
    }
    this.appService.httpPost(AppGlobal.API.withdraw, params, rs=>{
      if(rs.code == 200){
        console.log(rs);
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawPage');
    this.getBalance();
  }

}
