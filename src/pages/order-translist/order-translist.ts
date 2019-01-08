import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';

/**
 * Generated class for the OrderTranslistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-translist',
  templateUrl: 'order-translist.html',
})
export class OrderTranslistPage {

  token: string;
  transportOrder: string;
  status: Number = 0;
  page: Number = 1;
  orders: Array<any> = [];
  coin: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
    this.status = this.navParams.get('status');
    this.token = appService.getToken();
    this.coin = AppGlobal.coin;
    // if(this.status == 0){
    //   this.transportOrder = 'all';
    //   this.getOrders(this.status);
    // }
    if(this.status == 0){
      this.transportOrder = 'all';
    }else if(this.status == 1){
      this.transportOrder = 'waitConfirm';
    }else if(this.status == 2){
      this.transportOrder = 'waitPay';
    }else if(this.status == 7){
      this.transportOrder = 'waitReceive';
    }else if(this.status == 8){
      this.transportOrder = 'finished';
    }else if(this.status == 9){
      this.transportOrder = 'finished';
    }

    this.getOrders(this.status);
  }

  // 获取订单
  getOrders(status){
    this.status = status
    let params = {
      token: this.token,
      type: 3,
      page: this.page,
      status: this.status
    }
    this.appService.httpGet(AppGlobal.API.getOrders, params, rs=>{
      if(rs.code == 200){
        this.orders = rs.data;
        // console.log(this.orders);
      }
    })
  }

  // 全部订单
  getAllOrders(){
    this.orders = [];
    this.page = 1;
    this.getOrders(0);
  }

  // 待确认订单
  getWaitConfirm(){
    this.orders = [];
    this.page = 1;
    this.getOrders(1);
  }

  // 待支付
  getWaitPayOrders(){
    this.orders = [];
    this.page = 1;
    this.getOrders(2);
  }

  // 待收货
  getWaitReceive(){
    this.orders = [];
    this.page = 1;
    this.getOrders(7);
  }

  // 已完成
  getFinished(){
    this.orders = [];
    this.page = 1;
    this.getOrders(8);
  }

  // 确认收货
  makesure(id){
    let params = {
      token: this.token,
      id: id
    }
    this.appService.httpPost(AppGlobal.API.receiveConfirm, params, rs=>{
      if(rs.code == 200){
        this.getOrders(this.status);
        this.appService.alert('确认成功');
      }
    })
  }

  // 删除运单
  delete(id){
    let params = {
      token: this.token,
      id:id
    }
    this.appService.httpPost(AppGlobal.API.deleteOrder, params, rs=>{
      if(rs.code == 200){
        this.getOrders(this.status);
        this.appService.alert('删除成功');
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderTranslistPage');
  }

}
