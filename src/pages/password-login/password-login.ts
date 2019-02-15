import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';

/**
 * Generated class for the PasswordLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-login',
  templateUrl: 'password-login.html',
})
export class PasswordLoginPage {

  token: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
    this.ionViewWillEnter();
  }

  // 提取token
  ionViewWillEnter(){
    this.token=window.localStorage.getItem('token');
    console.log(this.token);
  }

  // 提交修改
  makesure(oldpass,pass,repass){
    let params = {
      token: this.token,
      oldPassword: oldpass.value,
      password: pass.value,
      rePassword: repass.value
    }
    this.appService.httpPost(AppGlobal.API.memberUpdatePass, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        this.appService.alert('修改成功',this.navCtrl.pop().then(()=>{
          
        }));
      }else{
        this.appService.toast(rs.msg);
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordLoginPage');
  }


}
