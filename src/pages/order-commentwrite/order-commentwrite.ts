import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { OrderListPage } from '../order-list/order-list';

/**
 * Generated class for the OrderCommentwritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-commentwrite',
  templateUrl: 'order-commentwrite.html',
})
export class OrderCommentwritePage {

  token: string;
  product: Array<any> = [];
  content: string;
  success: Number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
    this.token = appService.getToken();
    this.product['img'] = navParams.get('img');
    this.product['name'] = navParams.get('name');
    this.product['orderid'] = navParams.get('orderid');
    this.product['productid'] = navParams.get('productid');
    console.log(this.product);
    this.success = 0;
  }

  // 发布评论
  sendComment(){
    let params = {
      token: this.token,
      id: this.product['orderid'],
      productId: this.product['productid'],
      content: this.content
    }
    this.success = 1;
    console.log(params);
    this.appService.httpPost(AppGlobal.API.sendComment, params, rs=>{
      console.log(rs);
      if(rs.data == 200){
        this.success = 1;
      }
    })
  }

  // 返回首页
  gohome(){
    this.navCtrl.popToRoot();
  }

  // 返回我的订单
  goorder(){
    this.navCtrl.push(OrderListPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderCommentwritePage');
  }

}
