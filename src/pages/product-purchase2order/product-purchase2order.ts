import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { MemberAddresscheckPage } from '../member-addresscheck/member-addresscheck';

/**
 * Generated class for the ProductPurchase2orderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-purchase2order',
  templateUrl: 'product-purchase2order.html',
})
export class ProductPurchase2orderPage {

  token: String;
  product: Array<any> = [];
  address: Array<any> = [];
  coin: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService, public events: Events) {
    this.events.subscribe('address',(data)=>{
      console.log(data);
      this.address = data;
    })
    this.product = navParams.get('product');
    this.product['total'] = Number(this.product['price']) * Number(this.product['count']);
    this.token = this.appService.getToken();
    this.coin = AppGlobal.coin;
    console.log(this.product);
    this.getAddress();
  }

  // 获取地址
  getAddress(){
    let params = {
      token: this.token
    }
    this.appService.httpGet(AppGlobal.API.memberGetAddress, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        for(let i = 0; i < rs.data.length; i++){
          if(rs.data[i]['isdefault'] == 1){
            this.address = rs.data[i];
            console.log(this.address);
            break;
          }
        }
      }
    })
  }

   //管理地址
   manageAddress(){
    this.navCtrl.push(MemberAddresscheckPage);
    // this.navCtrl.push(PaysuccessPage);
  }

  // 提交订单
  createOrders(){
    let params = {
      token: this.token,
      url: this.product['url'],
      productName: this.product['productName'],
      property: '',
      price: this.product['price'],
      count: this.product['count'],
      images: this.product['images'].join(','),
      content: this.product['content'],
      note: this.product['note'],
      addressId: this.address['id']
    }
    this.appService.httpPost(AppGlobal.API.createPurchaseOrder, params, rs=>{
      console.log(rs);
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPurchase2orderPage');
  }

}
