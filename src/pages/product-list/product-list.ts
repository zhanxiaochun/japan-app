import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { ProductDetailPage } from '../product-detail/product-detail';

/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  cateid: string;
  products: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
    let aa = navParams.get('product');
    console.log(aa);
    this.cateid = navParams.get('cateid');
    console.log(this.cateid);
    if(aa == undefined){
      this.getProductList(this.cateid);
    }else{
      this.products = aa;
    }
    
  }

  // 获取列表
  getProductList(category){
    let params = {
      type: 1,
      category:category,
      search: '',
      order: 'default',
      page: 1
    }
    this.appService.httpGet(AppGlobal.API.getProducts, params, rs=>{
      this.products = rs.data;
      console.log(this.products);
    })
  }

  // 跳转到详情
  goDetails(id){
    this.navCtrl.push(ProductDetailPage,{
      pid:id
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }

}
