import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { MemberAddressaddPage } from '../member-addressadd/member-addressadd';


/**
 * Generated class for the MemberAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-address',
  templateUrl: 'member-address.html',
})
export class MemberAddressPage {

  token: string;
  address: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService, public events: Events) {
    
    // this.getAddress();
    this.events.subscribe('aaa',(data)=>{
      console.log(data);
      this.getAddress();
    });
  }

  // 获取地址
  getAddress(){
    this.address = [];
    let params = {
      token: this.token,
    }
    this.appService.httpGet(AppGlobal.API.memberGetAddress, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        this.address = rs.data;
      }
    })
  }

  // 设置默认地址
  setDefault(id,isdefault){
    console.log(id);
    if(isdefault == 0){
      let params = {
        token: this.token,
        id: id,
      }
      this.appService.httpPost(AppGlobal.API.setDefaultAddress, params, rs=>{
        this.address.forEach((val,key) => {
          if(val.id == id){
            this.address[key]['isdefault'] = 1;
          }else{
            this.address[key]['isdefault'] = 0;
          }
        });
        this.appService.alert('设置成功');
      })
    }else{
      console.log('done');
    }
    
  }

  // 编辑地址
  updateAddress(id){
    this.navCtrl.push(MemberAddressaddPage,{
      id: id
    })
  }

  // 删除地址
  deleteAddress(id){
    let params = {
      token: this.token,
      id: id
    }
    this.appService.httpPost(AppGlobal.API.memberDelAddress, params, rs=>{
      if(rs.code == 200){
        this.appService.alert('删除成功',this.getAddress());
      }
    })
  }

  // 新增地址
  addressAdd(){
    this.navCtrl.push(MemberAddressaddPage);
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad MemberAddressPage');
  //   this.getAddress();
  // }

  ionViewWillEnter(){
    this.token = this.appService.getToken();
    this.getAddress();
  }

}
