import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { OrderCommentwritePage } from '../order-commentwrite/order-commentwrite';

/**
 * Generated class for the OrderCommentlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-commentlist',
  templateUrl: 'order-commentlist.html',
})
export class OrderCommentlistPage {

  orderid: string;
  token: string;
  orderInfo: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
    this.token = this.appService.getToken();
    this.orderid = this.navParams.get('orderid');
    this.getOrderinfo();
  }

  getOrderinfo(){
    let params = {
      token: this.token,
      orderid: this.orderid
    }
    this.appService.httpGet(AppGlobal.API.getOrderinfo, params, rs=>{
      if(rs.code == 200){
        this.orderInfo = rs.data;
        for(let i = 0; i < this.orderInfo['extData'].length; i++){
          // if(data[i]['extData'][j]['prop'] != null && data[i]['extData'][j]['prop'][0]['attrValue']){
          //   data[i]['extData'][j]['attr'] = '';
          //   for(let l = 0; l < data[i]['extData'][j]['prop'].length; l++){
          //     data[i]['extData'][j]['attr'] += data[i]['extData'][j]['prop'][l]['attrKey']['propertyname']+':'+data[i]['extData'][j]['prop'][l]['attrValue']+' ';
          //   }
          // }
          if(this.orderInfo['extData'][i]['prop'] != null && this.orderInfo['extData'][i]['prop'][0]['attrValue']){
            this.orderInfo['extData'][i]['attr'] = '';
            for(let j = 0; j < this.orderInfo['extData'][i]['prop'].length; j++){
              this.orderInfo['extData'][i]['attr'] += this.orderInfo['extData'][i]['prop'][j]['attrKey']['propertyname']+':'+this.orderInfo['extData'][i]['prop'][j]['attrValue']+' ';
            }
          }
        }
      }
      // console.log(this.orderInfo);
    })
  }

  // 
  goComment(img,name,oid,pid){
    this.navCtrl.push(OrderCommentwritePage,{
      img: img,
      name: name,
      orderid: oid,
      productid: pid
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderCommentlistPage');
  }

}
