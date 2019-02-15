import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';

/**
 * Generated class for the MemberNicknamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-nickname',
  templateUrl: 'member-nickname.html',
})
export class MemberNicknamePage {

  token: string;
  member: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
    
    
  }

  // 提取token
  ionViewWillEnter(){
    // this.token=window.localStorage.getItem('token');
    this.token = this.appService.getToken();
    this.getMemberInfo();
  }

  // 获取用户信息
  getMemberInfo(){
    let params = {
      token: this.token
    }
    this.appService.httpGet(AppGlobal.API.memberInfo, params, rs=>{
      if(rs.code == 200){
        this.member = rs.data;
      }
    })
  }

  // 保存昵称
  makesure(name){
    let params = {
      token: this.token,
      nickname: name.value,
      name: '',
      mobile: '',
      gender: '',
      icon: '',
    }
    this.appService.httpPost(AppGlobal.API.memberUpdate, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        this.appService.alert('操纵成功');
      }else{
        this.appService.alert('操作失败');
      }
    })
  }

  // 清空输入框
  makeEmpty(){
    this.member['nickname'] = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberNicknamePage');
  }

}
