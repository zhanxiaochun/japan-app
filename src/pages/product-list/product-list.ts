import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { ProductDetailPage } from '../product-detail/product-detail';
import { ProductSearchPage } from '../product-search/product-search';
import { ProductCartPage } from '../product-cart/product-cart';

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
  param: Array<any> = [];
  active: String = 'default';
  priceorder: String = 'price-asc';
  searchinfo: String;
  producthas: Number = 0;
  page: Number = 1;
  category: Number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
    let aa = navParams.get('product');
    this.param = navParams.get('param');
    this.searchinfo = navParams.get('searchinfo');
    this.cateid = navParams.get('cateid');
    if(aa == undefined){
      this.getProductList(this.cateid);
    }else{
      this.products = aa;
    } 
  }


  // 获取列表
  getProductList(category){
    this.category = category;
    let params = {
      type: 1,
      category:category,
      search: '',
      order: 'default',
      page: this.page
    }
    
    this.appService.httpGet(AppGlobal.API.getProducts, params, rs=>{
      this.products = rs.data;
      console.log(this.products);
    })
  }

  // 加载更多
  loadMoreOrder(infiniteScroll){
    
    if(infiniteScroll){
      infiniteScroll.complete();
      if(this.products.length < 15){
        this.producthas = 1;
        infiniteScroll.enable(false);
        this.appService.toast("已加载所有");
      }else{
        // this.orderNum = 0;
        this.page = Number(this.page) + 1;
        this.getProductList(this.category);
      }
    }
  }

  // 跳转到详情
  goDetails(id){
    this.navCtrl.push(ProductDetailPage,{
      pid:id
    })
  }

  // 搜索
  search(){
    this.navCtrl.push(ProductSearchPage);
  }

  // 购物车
  goCart(){
    this.navCtrl.push(ProductCartPage);
  }

  // 筛选
  getSelect(order){
    this.active = order;
    if(order == 'price'){
      if(this.priceorder == 'price-desc'){
        order = 'price-desc';
        this.priceorder = 'price-asc';
        console.log(this.priceorder);
      }else{
        order = 'price-asc';
        this.priceorder = 'price-desc';
        console.log(this.priceorder);
      }
    }
    
    let params = {
      category: this.param['category'],
      page: 1,
      search: this.param['search'],
      type: this.param['type'],
      order: order,
    }
    this.appService.httpGet(AppGlobal.API.getProducts, params, rs=>{
      this.products = rs.data;
      console.log(this.products);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }

}
