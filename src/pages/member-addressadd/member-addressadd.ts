import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';

/**
 * Generated class for the MemberAddressaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-addressadd',
  templateUrl: 'member-addressadd.html',
})
export class MemberAddressaddPage {

  token: string;
  name: string;
  address: string;
  mobile: string;
  zipcode: string;
  title: string;
  id: string;
  paddress: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService, public events: Events) {
    this.token = this.appService.getToken();
    this.id = this.navParams.get('id');
    if(this.id){
      this.title = '编辑收货地址';
      this.getOneAddress();
    }else{
      this.title = '新增收货地址';
    }
  }

  // 获取单个地址
  getOneAddress(){
    let params = {
      token: this.token,
      id: this.id
    }
    this.appService.httpGet(AppGlobal.API.memberFindAddress, params, rs=>{
      if(rs.code == 200){
        this.name = rs.data.name;
        this.mobile = rs.data.mobile;
        this.zipcode = rs.data.zipcode;
        this.address= rs.data.address;
      }
    })
  }


  // 新增地址
  submitAdd(){
    let params = {
      token: this.token,
      name: this.name,
      address: this.address,
      mobile: this.mobile,
      zipcode: this.zipcode,
    }
    if(this.id){
      let paramsupdate = {
        token: this.token,
        id: this.id,
        name: this.name,
        address: this.address,
        mobile: this.mobile,
        zipcode: this.zipcode
      }
      this.appService.httpPost(AppGlobal.API.memberUpdateAddress, paramsupdate, rs=>{
        if(rs.code == 200){
          this.appService.alert('编辑成功',this.navCtrl.pop().then(()=>{
            this.events.publish('aaa','ddd');
          }));
        }else{
          this.appService.toast(rs.msg);
        }
      })
    }else{
      this.appService.httpPost(AppGlobal.API.memberAddressAdd, params, rs=>{
        if(rs.code == 200){
          this.appService.alert('新增成功',this.navCtrl.pop().then(()=>{
            this.events.publish('aaa','ddd');
          }));
        }else{
          this.appService.toast(rs.msg);
        }
      })
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberAddressaddPage');
  }

}
