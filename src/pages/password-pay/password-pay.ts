import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';

/**
 * Generated class for the PasswordPayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-pay',
  templateUrl: 'password-pay.html',
})
export class PasswordPayPage {

  token: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
    this.ionViewWillEnter();
  }

  // 提取token
  ionViewWillEnter(){
    this.token=window.localStorage.getItem('token');
  }

  // 提交修改
  makesure(oldpass,pass,repass){
    let params = {
      token: this.token,
      oldPaypass: oldpass.value,
      payPass: pass.value,
      rePayPass: repass.value,
    }
    this.appService.httpPost(AppGlobal.API.memberUpdatePaypass, params, rs=>{
      console.log(rs);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPayPage');
  }

}
