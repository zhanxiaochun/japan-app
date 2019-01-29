import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { AppService, AppGlobal } from '../../app/app.service';
import { AppService } from '../../app/app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductPurchase2orderPage } from '../product-purchase2order/product-purchase2order';

/**
 * Generated class for the ProductPurchasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-purchase',
  templateUrl: 'product-purchase.html',
})
export class ProductPurchasePage {

  token: String;
  url: String;
  product: Array<any> = [];
  productnum: Number = 1;
  isdone: Number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService, public sanitizer: DomSanitizer) {
    this.url = this.navParams.get('url');
    this.token = this.appService.getToken();
    console.log(this.url);
    this.getProduct();
  }

  // 获取商品
  getProduct(){
    this.appService.show();
    let params = {
      urls: this.url
    }
    console.log(this.url);
    this.appService.httpPost2('ds', params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        this.isdone = 1;
        this.product['productname'] = rs.data[0]['productname'];
        this.product['producturl'] = rs.data[0]['url'];
        this.product['productprice'] = rs.data[0]['productprice'];
        this.product['images'] = rs.data[0]['images'];
        this.product['content'] = rs.data[0]['content'];
        this.product['note'] = '';
        this.appService.hide();
      }else{
        this.appService.alert('对不起，未找到该商品');
        this.navCtrl.pop();
        this.appService.hide();
      }
    })
  }

  // 增加数量
  plus(){
    this.productnum = Number(this.productnum) + 1;
  }

  // 减少数量
  reduce(){
    if(this.productnum > 1){
      this.productnum = Number(this.productnum) - 1;
    }else{
      this.productnum = 1;
    }
  }

  // 提交
  gobuy(){
    console.log(this);
    let params = {
      token: this.token,
      url: this.product['producturl'],
      productName: this.product['productname'],
      property: '',
      price: this.product['productprice'],
      count: this.productnum,
      images: this.product['images'],
      content: this.product['content'],
      note: this.product['note'],
    }
    // this.appService.httpPost(AppGlobal.API.createPurchaseOrder, params, rs=>{
    //   console.log(rs);
    // })
    this.navCtrl.push(ProductPurchase2orderPage,{
      product: params
    });
  }

  // 转义HTML
  assembleHTML(strHTML: any) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPurchasePage');
  }

}
