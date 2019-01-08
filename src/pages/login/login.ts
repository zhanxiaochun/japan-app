import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
  }

  // 登录
  loginDataSubmit(mobile,pass){
    let params = {
      mobile: mobile.value,
      password: pass.value,
    }
    this.appService.httpPost(AppGlobal.API.loginSubmit, params, rs=>{
      console.log(rs);
      // 登录成功，缓存token
      if(rs.code == 200){
        window.localStorage.setItem('token',rs.data.token);
            this.navCtrl.setRoot(TabsPage);
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
