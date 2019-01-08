import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';

/**
 * Generated class for the OrderPurchasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-purchase',
  templateUrl: 'order-purchase.html',
})
export class OrderPurchasePage {

  token: String;
  orders: Array<any> = [];
  status: Number = 0;
  purchase: String;
  page: Number = 1;
  coin: String;
  orderNum: Number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
    this.status = this.navParams.get('status');
    this.token = this.appService.getToken();
    this.coin = AppGlobal.coin;
    if(this.status == 0){
      this.purchase = 'all';
    }else if(this.status == 1){
      this.purchase = 'waitConfirm';
    }else if(this.status == 2){
      this.purchase = 'waitPay';
    }else if(this.status == 7){
      this.purchase = 'waitReceive';
    }else if(this.status == 8){
      this.purchase = 'waitComment';
    }else if(this.status == 9){
      this.purchase = 'finished';
    }
    this.getOrders(this.status);
    console.log(this.purchase);
  }

  // 获取订单
  getOrders(status){
    this.status = status
    let params = {
      token: this.token,
      type: 4,
      page: this.page,
      status: this.status
    }
    this.appService.httpGet(AppGlobal.API.getOrders, params, rs=>{
      if(rs.code == 200){
        this.orderNum = 0;
        this.clearData(rs.data);
        this.orders = this.orders.concat(rs.data);
      }else{
        this.orderNum = 0;
      }
    })
  }

  // 全部订单
  getAll(){
    this.orders = [];
    this.page = 1;
    this.getOrders(0);
  }

  // 待确认
  getWaitConfirm(){
    this.orders = [];
    this.page = 1;
    this.getOrders(1);
  }

  // 待付款
  getWaitPay(){
    this.orders = [];
    this.page = 1;
    this.getOrders(2);
  }

  // 获取待收货订单
  getWaitReceive(){
    this.orders = [];
    this.page = 1;
    this.getOrders(7);
  }

  // 已完成
  getFinished(){
    this.orders = [];
    this.page = 1;
    this.getOrders(9);
  }

  // 整理数据
  clearData(data){
    for(let i = 0; i < data.length; i++){
      this.orderNum = Number(this.orderNum) + 1;
      data[i]['amount'] = 0;
      for(let j = 0; j < data[i]['extData'].length; j++){
        data[i]['amount'] += Number(data[i]['extData'][j]['amount']);
        // data[i]['amount'] += 1;
        // if(data[i]['extData'][j]['prop'] != null && data[i]['extData'][j]['prop'][0]['attrValue']){
        //   data[i]['extData'][j]['attr'] = '';
        //   for(let l = 0; l < data[i]['extData'][j]['prop'].length; l++){
        //     data[i]['extData'][j]['attr'] += data[i]['extData'][j]['prop'][l]['attrKey']['propertyname']+':'+data[i]['extData'][j]['prop'][l]['attrValue']+' ';
        //   }
        // }
      }
    }
    console.log(data);
  }

  // 取消订单
  cancelOrder(id){
    let params = {
      token: this.token,
      id: id
    }
    this.appService.httpPost(AppGlobal.API.cancelOrder, params ,rs=>{
      console.log(rs);
      if(rs.code == 200){
        this.appService.alert('取消成功');
      }
    })
  }

  // 确认收货
  confirmReceive(id){
    let params = {
      token: this.token,
      id: id
    }
    this.appService.httpPost(AppGlobal.API.receiveConfirm, params, rs=>{
      if(rs.code == 200){
        this.appService.alert('确认成功');
      }
    })
  }

  //物流信息
  transInfo(id){
    console.log(id+'物流信息');
  }

  // 删除订单
  deleteOrder(id){
    let params = {
      token: this.token,
      id: id
    }
    this.appService.httpPost(AppGlobal.API.deleteOrder, params, rs=>{
      if(rs.code == 200){
        this.appService.alert('删除成功');
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPurchasePage');
  }

}
