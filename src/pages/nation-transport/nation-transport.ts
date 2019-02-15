import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { MemberAddresscheckPage } from '../member-addresscheck/member-addresscheck';
import { OrderTranslistPage } from '../order-translist/order-translist';

/**
 * Generated class for the NationTransportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nation-transport',
  templateUrl: 'nation-transport.html',
})
export class NationTransportPage {

  token: string;
  address: string;
  receiveman: string;
  postcode:string;
  phone:string;
  raddress: Array<any> = [];
  companyname:string;
  transportorder: string;
  senddate:string;
  note:string;
  success: Number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService, public events: Events) {
    this.events.subscribe('address',(data)=>{
      console.log(data);
      this.raddress = data;
    })
    this.success = 0;
    
  }

  // 获取日本地址
  getAddress(){
    let params = {
      dict: 38016
    }
    this.appService.httpGet(AppGlobal.API.getDictVal, params, rs=>{
      if(rs.code == 200){
        this.address = rs.data['value'];
      }
    })
  }

  // 获取收件人
  getReceiveMan(){
    let params = {
      dict: 38017
    }
    this.appService.httpGet(AppGlobal.API.getDictVal, params, rs=>{
      if(rs.code == 200){
        this.receiveman = rs.data['value'];
      }
    })
  }

  // 获取邮编
  getPostcode(){
    let params = {
      dict: 38018
    }
    this.appService.httpGet(AppGlobal.API.getDictVal, params, rs=>{
      if(rs.code == 200){
        this.postcode = rs.data['value'];
      }
    })
  }

  // 获取电话
  getPhone(){
    let params = {
      dict: 38019
    }
    this.appService.httpGet(AppGlobal.API.getDictVal, params, rs=>{
      if(rs.code == 200){
        this.phone = rs.data['value'];
      }
    })
  }

  // 获取收货地址
  getReceiveAddress(){
    let params = {
      token: this.token
    }
    this.appService.httpGet(AppGlobal.API.memberGetAddress, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        for(let i = 0; i < rs.data.length; i++){
          if(rs.data[i]['isdefault'] == 1){
            this.raddress = rs.data[i];
            console.log(this.raddress);
            break;
          }
        }
      }
    })
  }

  // 选择地址
  manageAddress(){
    if(this.token == null){
      this.appService.toast(AppGlobal.loginnote);
    }else{
      this.navCtrl.push(MemberAddresscheckPage);
    }
    
  }

  // 提交订单
  submitOrder(){
    console.log(this);
    let params = {
      token: this.token,
      companyName: this.companyname,
      companyNo: this.transportorder,
      sellDate: this.senddate,
      note: this.note,
      addressId: this.raddress['id']
    }
    // console.log(params);return false;
    if(params.token == null){
      this.appService.toast(AppGlobal.loginnote);return false;
    }
    if(params.addressId == undefined){
      this.appService.toast('请设置收货地址');return false;
    }
    this.appService.checkParams(params.companyName,'请填写快递公司');
    if(params.companyNo == '' || params.companyNo == undefined){
      this.appService.toast('请填写快递单号');return false;
    }
    if(params.sellDate == '' || params.sellDate == undefined){
      this.appService.toast('请选择发货日期');return false;
    }
    if(params.note == undefined){
      params.note = '';
    }
    
    this.appService.httpPost(AppGlobal.API.submitTransOrder, params, rs=>{
      console.log(rs);
      this.success = 1;
    })
  }

  // 返回首页
  gohome(){
    this.navCtrl.popToRoot();
    // this.navCtrl.parent.select(0);
  }

  // 查看订单
  goorder(){
    this.navCtrl.push(OrderTranslistPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NationTransportPage');
  }

  ionViewWillEnter(){
    this.token = this.appService.getToken();
    this.getAddress();
    this.getReceiveMan();
    this.getPostcode();
    this.getPhone();
    this.getReceiveAddress();
  }

}
