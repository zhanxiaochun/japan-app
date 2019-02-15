import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { SetupPage } from '../setup/setup';
import { AppService, AppGlobal } from '../../app/app.service';
import { OrderListPage } from '../order-list/order-list';
import { ProductCartPage } from '../product-cart/product-cart';
import { NationTransportPage } from '../nation-transport/nation-transport';
import { OrderTranslistPage } from '../order-translist/order-translist';
import { PurchasePage } from '../purchase/purchase';
import { OrderPurchasePage } from '../order-purchase/order-purchase';
import { HelpcenterPage } from '../helpcenter/helpcenter';
import { StatusBar } from '@ionic-native/status-bar';
import { RechargePage } from '../recharge/recharge';
import { WithdrawPage } from '../withdraw/withdraw';
import { MemberPage } from '../member/member';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  token: string;
  member: Array<any> = [];

  constructor(public navCtrl: NavController, public appService: AppService, private statusBar: StatusBar) {
    
    //this.ionViewWillEnter();
    // this.getMenberInfo();
  }

  

  login(){
    console.log('login');
    this.navCtrl.push(LoginPage);
  }

  register(){
    console.log('register');
    this.navCtrl.push(RegisterPage);
  }

  
  ionViewWillEnter(){
    // this.token=window.localStorage.getItem('token');
    // console.log(this.token);
    this.token = this.appService.getToken();
    this.getMenberInfo();
    this.statusBar.styleBlackOpaque();
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#ff4633');
  }

  // 获取会员信息
  getMenberInfo(){
    let params = {
      token: this.token
    }
    this.appService.httpGet(AppGlobal.API.memberInfo, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        this.member = rs.data;
      }else{
        this.member['balance'] = 0;
        this.member['score'] = 0;
      }
    })
  }

  // 判断是否登录
  checkToken(){
    if(this.token == null){
      this.appService.toast(AppGlobal.loginnote);
      return false;
    }else{
      return true;
    }
  }

  // 跳转到会员资料
  goMember(){
    
    this.navCtrl.push(MemberPage);
  }

  // 设置
  goSetup(){
    if(this.checkToken()){
      this.navCtrl.push(SetupPage);
    }
    
  }

  // 购物车
  goCart(){
    if(this.checkToken()){
      this.navCtrl.push(ProductCartPage);
    }
    
  }

  // 退出登录
  logout(){
    window.localStorage.removeItem('token');
    this.navCtrl.setRoot(LoginPage);
  }

  // 商城订单
  shopOrder(status){
    if(this.checkToken()){
      this.navCtrl.push(OrderListPage, {
        status: status
      });
    }
    
  }

  // 国际转运
  nationTransport(){
    this.navCtrl.push(NationTransportPage);
  }

  // 线下代购
  purchase(){
    this.navCtrl.push(PurchasePage);
  }

  // 转运订单
  goTransOrder(status){
    if(this.checkToken()){
      this.navCtrl.push(OrderTranslistPage, {
        status: status
      });
    }
    
  }

  // 线下代购订单
  goPurchaseOrder(status){
    if(this.checkToken()){
      this.navCtrl.push(OrderPurchasePage, {
        status: status
      });
    }
    
  }

  // 帮助中心
  helpCenter(){
    this.navCtrl.push(HelpcenterPage);
  }

  // 充值
  goRecharge(){
    if(this.checkToken()){
      this.navCtrl.push(RechargePage);
    }
    
  }

  // 提现
  goWithdraw(){
    if(this.checkToken()){
      this.navCtrl.push(WithdrawPage);
    }
    
  }

}
