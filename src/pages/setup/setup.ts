import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { MemberPage } from '../member/member';
import { PasswordLoginPage } from '../password-login/password-login';
import { PasswordPayPage } from '../password-pay/password-pay';
import { MemberAddressPage } from '../member-address/member-address';

/**
 * Generated class for the SetupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // 会员资料
  goMember(){
    this.navCtrl.push(MemberPage);
  }

  // 修改登录密码
  goPassLogin(){
    this.navCtrl.push(PasswordLoginPage);
  }

  // 修改支付密码
  goPassPay(){
    this.navCtrl.push(PasswordPayPage);
  }

  // 收货地址
  goAddress(){
    this.navCtrl.push(MemberAddressPage);
  }

  // 退出登录
  goLogout(){
    window.localStorage.removeItem('token');
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetupPage');
  }

}
