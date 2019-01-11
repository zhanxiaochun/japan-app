import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { AppService, AppGlobal } from './../../app/app.service';
import { DomSanitizer } from '@angular/platform-browser';

import { ProductAttrPage } from '../product-attr/product-attr';
import { ProductCartPage } from '../product-cart/product-cart';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  token: string;
  pid: string;
  product: Array<any> = [];
  comment: Array<any> = [];
  attr: Array<any> = [];
  selectTitle: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService, public sanitizer: DomSanitizer, public modalCtrl: ModalController, public events: Events) {
    this.pid = this.navParams.get('pid');
    this.token = this.appService.getToken();
    this.selectTitle = '选择颜色尺寸及数量';
    this.getPorductDetail(this.pid);
    this.events.subscribe('attr',(data)=>{
      this.attr = data;
      // 显示已选
      this.selectTitle = '';
      data.select.forEach((val,key) => {
        this.selectTitle += val.attrKey+":"+val.attrVal+'  ';
      });
      this.selectTitle += ' X'+ data.amount;
      this.addcart();
    })
  }

  productcontent: string="explains";

  getPorductDetail(id){
    let params = {
      id:id
    }
    this.appService.httpGet(AppGlobal.API.getDetails, params, rs=>{
      this.product = rs.data;
      console.log(this.product);
    })
  }

  // 转义HTML
  assembleHTML(strHTML: any) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }

  // 获取评论
  getComment(id){
    let params = {
      id: id,
      page: 1
    }
    this.appService.httpGet(AppGlobal.API.getComment, params, rs=>{
      if(rs.code == 200){
        this.comment = rs.data;
      }
      
      console.log(this.comment);
    })
  }

  presentProfileModal() {
    console.log(this.product);
    let profileModal = this.modalCtrl.create(ProductAttrPage, {product:this.product});
    profileModal.present();
  }

  // 加入购物车
  addcart(){
    // console.log(this.attr['amount']);return;
    // this.presentProfileModal();
    if(this.attr['amount'] > 0){
      let params = {
        token: this.token,
        type: this.product['type'],
        productid: this.product['id'],
        amount: this.attr['amount'],
        propertyexid: this.attr['propertyexid'],
      }
      this.appService.httpPost(AppGlobal.API.addcart, params, rs=>{
        console.log(rs);
        if(rs.code == 200){
          this.appService.toast('加入购物车成功');
        }
      })
    }else{
      this.presentProfileModal();
    }
    
  }

  // 跳转购物车
  gocart(){
    this.navCtrl.push(ProductCartPage);
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

}
