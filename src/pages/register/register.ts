import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService,AppGlobal } from './../../app/app.service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  domain: string;
  codeurl: string;
  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 60,//总共时间
    disable: true
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
    this.domain = AppGlobal.domain;
    // 初始化图片验证码
    // this.codereset();
  }

  // 获取短信验证码
  getphonecode(phone){
    if(this.verifyCode.disable){
      console.log(phone.value);
      let params = {
        area: '0086',
        mobile: phone.value,
        type: 1
      }
      this.appService.httpPost(AppGlobal.API.getRegistCode, params , rs=>{
        console.log(rs);
        if(rs.code == 200){
          console.log(this.verifyCode);
          this.verifyCode.countdown = rs.data.expire;
          this.verifyCode.disable = false;
          this.settime();
        }
      });
    }else{
      console.log('请稍后重试');
    }
    
  }

  // 提交信息
  registerDataSubmit(phone,code,pass,repass){
    let params = {
      area: '0086',
      mobile: phone.value,
      code: code.value,
      password: pass.value,
      rePassword: repass.value,
    }
    this.appService.httpPost(AppGlobal.API.registerSubmit, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        alert('success');
      }
      
    })
  }

  //倒计时
  settime(){
    if (this.verifyCode.countdown == 0) {
        // debugger
        this.verifyCode.verifyCodeTips = "获取验证码";
        this.verifyCode.disable = true;
        return;
    } else {
        this.verifyCode.countdown--;
    }
    setTimeout(() => {
        this.verifyCode.verifyCodeTips = "重新获取" + this.verifyCode.countdown + "秒";
            this.settime();
    }, 1000);
}


  // 刷新验证码
  codereset(){
    let time = new Date().getTime();
    // 加时间戳 每次刷新验证码
    this.codeurl = this.domain + '/captchaapi/image/'+time;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
