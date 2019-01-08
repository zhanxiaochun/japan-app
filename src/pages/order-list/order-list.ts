import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { OrderCommentlistPage } from '../order-commentlist/order-commentlist';

/**
 * Generated class for the OrderListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage {

  token: string;
  coin: string;
  allOrders: Array<any> = [];
  pet: string;
  page: Number;
  orderNum: Number = 0;
  orderhas: Number = 0;
  status: Number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
    this.status = this.navParams.get('status');
    this.token = this.appService.getToken();
    this.coin = AppGlobal.coin;
    if(this.status == 0){
      this.pet = 'all';
    }else if(this.status == 2){
      this.pet = 'waitPay';
    }else if(this.status == 7){
      this.pet = 'waitReceive';
    }else if(this.status == 8){
      this.pet = 'waitComment';
    }else if(this.status == 9){
      this.pet = 'finished';
    }
    
    this.page = 1;
    this.getAll(this.status);
  }

  // 获取全部订单
  getAll(status){
    this.status = status
    let params = {
      token: this.token,
      type: 1,
      page: this.page,
      status: this.status
    }
    this.appService.httpGet(AppGlobal.API.getOrders, params, rs=>{
      if(rs.code == 200){
        this.orderNum = 0;
        this.clearData(rs.data);
        this.allOrders = this.allOrders.concat(rs.data);
      }else{
        this.orderNum = 0;
      }
    })
  }

  // 全部订单
  getAllOrders(){
    this.allOrders = [];
    this.page = 1;
    this.getAll(0);
  }

  // 获取待付款订单
  getWaitPayOrders(){
    this.allOrders = [];
    this.page = 1;
    this.getAll(2);
  }

  // 获取待收货订单
  getWaitReceive(){
    this.allOrders = [];
    this.page = 1;
    this.getAll(7);
  }

  // 获取待评论订单
  getWaitComment(){
    this.allOrders = [];
    this.page = 1;
    this.getAll(8);
  }

  // 获取完成订单
  getFinished(){
    this.allOrders = [];
    this.page = 1;
    this.getAll(9);
  }

  // 确认收货
  receiveConfirm(id){
    let params = {
      token: this.token,
      id: id
    }
    this.appService.httpPost(AppGlobal.API.receiveConfirm, params, rs=>{
      if(rs.code == 200){
        this.appService.alert('确认收货成功');
      }
    })
  }

  // 删除订单
  deleteOrder(id){
    let params = {
      token: this.token,
      id:id
    }
    this.appService.httpPost(AppGlobal.API.deleteOrder, params, rs=>{
      if(rs.code == 200){
        this.appService.alert('删除成功');
      }
    })
  }

  // 评论订单
  goComment(id){
    this.navCtrl.push(OrderCommentlistPage,{
      orderid: id
    });
  }


  // 整理数据
  clearData(data){
    for(let i = 0; i < data.length; i++){
      this.orderNum = Number(this.orderNum) + 1;
      data[i]['amount'] = 0;
      for(let j = 0; j < data[i]['extData'].length; j++){
        // data[i]['amount'] += Number(data[i]['extData'][j]['amount']);
        data[i]['amount'] += 1;
        if(data[i]['extData'][j]['prop'] != null && data[i]['extData'][j]['prop'][0]['attrValue']){
          data[i]['extData'][j]['attr'] = '';
          for(let l = 0; l < data[i]['extData'][j]['prop'].length; l++){
            data[i]['extData'][j]['attr'] += data[i]['extData'][j]['prop'][l]['attrKey']['propertyname']+':'+data[i]['extData'][j]['prop'][l]['attrValue']+' ';
          }
        }
      }
    }
    console.log(this.orderNum);
  }

  getWaitfor(){
    console.log('adfd');
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

  // 加载更多
  loadMoreOrder(infiniteScroll){
    console.log(this.orderNum);
    this.page = Number(this.page) + 1;
    this.getAll(this.status);
    if(infiniteScroll){
      infiniteScroll.complete();
      if(this.orderNum < 15){
        this.orderhas = 1;
        infiniteScroll.enable(false);
        this.appService.toast("已加载所有");
      }else{
        this.orderNum = 0;
      }
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderListPage');
  }

}
