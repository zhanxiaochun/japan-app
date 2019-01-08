import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { MemberAddresscheckPage } from '../member-addresscheck/member-addresscheck';
import { PaysuccessPage } from '../paysuccess/paysuccess';

/**
 * Generated class for the ProductCart2orderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-cart2order',
  templateUrl: 'product-cart2order.html',
})
export class ProductCart2orderPage {

  token:string;
  cart:Array<any> = [];
  cart1:Array<any> = [];
  cart2:Array<any> = [];
  cart3:Array<any> = [];
  cartIds: Array<any> = [];
  address: Array<any> = [];
  transport: Array<any> = [];
  typeprice: Array<any> = [];
  total:Number;
  coin:string;
  cartNum:Number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService, public events: Events) {
    this.events.subscribe('address',(data)=>{
      console.log(data);
      this.address = data;
    })
    this.token = this.appService.getToken();
    this.coin = AppGlobal.coin;
    this.cartIds = navParams.get('ids');
    this.getCartShop();
    this.getAddress();
    console.log(this.cartIds);
    this.typeprice[1] = 0;
    this.typeprice[2] = 0;
    this.typeprice[3] = 0;
    this.total = 0;
    this.cartNum = 0;
  }

  // 获取购物车-商城
  getCartShop(){
    let params = {
      token: this.token,
      // type: 1,
      shopCartIds: this.cartIds.join(',')
    }
    console.log(params);
    this.appService.httpGet(AppGlobal.API.getCartProduct, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        this.cart = rs.data['carts'];
        this.transport = rs.data['transport'];
        this.cart['length'] = this.cart.length;
        console.log(this.transport);
        if(this.transport[1] > 0){
          this.total = Number(this.total) + Number(this.transport[1]);
        }
        if(this.transport[2] > 0){
          this.total = Number(this.total) + Number(this.transport[2]);
        }
        if(this.transport[3] > 0){
          this.total = Number(this.total) + Number(this.transport[3]);
        }
        //
        if(this.cart['length'] > 0){
          this.cart.forEach((val,key) => {
            this.cartNum = Number(this.cartNum) + 1;
            this.cart[key]['attr'] = '';
            this.cart[key]['check'] = false;
            
            if(val['propertyX'] != null){
              if(val['propertyX']['attrValueList'].length > 0){
                val['propertyX']['attrValueList'].forEach((v,k) => {
                  this.cart[key]['attr'] += v['attrKey']['propertyname']+':'+v['attrValue']+' ';
                });
              }
              this.typeprice[val['type']] += Number(val['propertyX']['price']) * Number(val['amount']);
              this.total = Number(this.total) + Number(val['propertyX']['price']) * Number(val['amount']);
            }else{
              this.typeprice[val['type']] += Number(val['product']['webprice']) * Number(val['amount']);
              this.total = Number(this.total) + Number(Number(val['product']['webprice']) * Number(val['amount']));
            }
            // 
            if(val['type'] == 1){
              this.cart1.push(val);
            }else if(val['type'] == 2){
              this.cart2.push(val);
            }else if(val['type'] == 3){
              this.cart3.push(val);
            }        
          });
        }
      }
    })
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

   // 生成订单
  createOrders(){
    let params = {
      token: this.token,
      shopCartIds: this.cartIds.join(','),
      addressId: this.address['id'],
      note: ''
    }
    this.appService.httpPost(AppGlobal.API.createOrder, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        this.appService.alert('success',this.navCtrl.push(PaysuccessPage,{
          data: rs.data
        }));
      }
    })
  }

  // 支付成功
  paySuccess(){
    this.navCtrl.push(PaysuccessPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductCart2orderPage');
  }

}
