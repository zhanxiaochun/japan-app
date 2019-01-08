import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { MemberAddressaddPage } from '../member-addressadd/member-addressadd';
import { MemberAddressPage } from '../member-address/member-address';

/**
 * Generated class for the MemberAddresscheckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-addresscheck',
  templateUrl: 'member-addresscheck.html',
})
export class MemberAddresscheckPage {

  token: string;
  address: Array<any> = [];
  checkedAddress: Array<any> = [];
  addressId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService, public events: Events) {
    this.token = this.appService.getToken();
    this.getAddress();
  }

   // 获取地址
   getAddress(){
    let params = {
      token: this.token,
    }
    this.appService.httpGet(AppGlobal.API.memberGetAddress, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        this.address = rs.data;
        for(let i = 0; i < this.address.length; i++){
          this.address[i]['check'] = false;
        }
      }
    })
  }

  // 选择地址
  selectAddress(id){
    console.log(id);
    for(let i = 0; i < this.address.length; i++){
      if(this.address[i]['id'] == id){
        if(this.address[i]['check']){
          this.addressId = this.address[i]['id'];
          this.checkedAddress = this.address[i];
          this.makesureAddress();
        }else{
          this.addressId = '0';
        }
      }else{
        this.address[i]['check'] = false;
      }
    }
    console.log(this.addressId);
    
  }

  // 返回确认订单
  makesureAddress(){
    this.navCtrl.pop().then(()=>{
      this.events.publish('address',this.checkedAddress);
    })
  }

  // 新增
  addressAdd(){
    this.navCtrl.push(MemberAddressaddPage);
  }

  // 管理
  goaddress(){
    this.navCtrl.push(MemberAddressPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberAddresscheckPage');
  }

}
