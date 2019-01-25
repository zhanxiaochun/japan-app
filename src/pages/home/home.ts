import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AppService, AppGlobal } from './../../app/app.service';

import { ListPage } from '../list/list';
import { ProductDetailPage } from '../product-detail/product-detail';
import { ProductCartPage } from '../product-cart/product-cart';
import { StatusBar } from '@ionic-native/status-bar';
import { ProductSearchPage } from '../product-search/product-search';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  slides: Array<any> = [];
  selfshopimg: Array<any> = [];
  amazonimg: Array<any> = [];
  takutenimg: Array<any> = [];
  selfshopproducts: Array<any> = [];
  amazonproducts: Array<any> = [];
  takutenproducts: Array<any> = [];

  category: Array<any> = [];
  categories: Array<any> = [];
  products: Array<any> = [];
  coin: String;

  spinner1: boolean = true;
  token: string;


  constructor(public appService: AppService,public navCtrl: NavController, private statusBar: StatusBar) {
    // platform.ready().then(()=>{
    //   statusBar.styleLightContent();
    //   statusBar.overlaysWebView(false);
    //   statusBar.backgroundColorByHexString('#ff4633');
    // })

    this.coin = AppGlobal.coin;
    
    this.category = [
      {id: 2, url: '../../assets/imgs/cate3.png', title: '亚马逊'},
      {id: 3, url: '../../assets/imgs/cate2.png', title: '乐天'},
      {id: 1, url: '../../assets/imgs/cate1.png', title: '商城'}
    ];
    this.getSlides();
    this.getShopImg();
    this.getAmazonImg();
    this.getTakutenImg();
    this.getSelfPorducts();
    this.getAmazonPorducts();
    this.getTakutenPorducts();

  }

  // 提取token
  ionViewWillEnter(){
    // this.token=window.localStorage.getItem('token');
    // console.log(this.token);
    // this.platform.ready().then(()=>{
      this.statusBar.styleLightContent();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#ff4633');
    // })
    
  }



  //获取banner
  getSlides() {
    let params = {
      cate: 1
    }
    this.appService.httpGet(AppGlobal.API.getBanner, params, rs => {
      console.debug(rs);
      this.slides = rs.data;
      this.spinner1 = false;
    })
  }

  // 获取商城人气图片
  getShopImg(){
    let params = {
      cate: 5
    }
    this.appService.httpGet(AppGlobal.API.getHotImg, params, rs=>{
      console.debug(rs);
      this.selfshopimg = rs.data[0];
    })
  }

  // 获取亚马逊热销图片
  getAmazonImg(){
    let params = {
      cate: 6
    }
    this.appService.httpGet(AppGlobal.API.getHotImg, params, rs=>{
      console.debug(rs);
      this.amazonimg = rs.data[0];
    })
  }

  // 获取乐天热销图片
  getTakutenImg(){
    let params = {
      cate: 7
    }
    this.appService.httpGet(AppGlobal.API.getHotImg, params, rs=>{
      console.debug(rs);
      this.takutenimg = rs.data[0];
    })
  }
  
  //获取商城产品
  getSelfPorducts() {
    let params = {
      type: 1
    }
    this.appService.httpGet(AppGlobal.API.getProductsHot, params, rs => {
      console.debug(rs);
      this.selfshopproducts = rs.data;
    })
  }

  //获取亚马逊产品
  getAmazonPorducts() {
    let params = {
      type: 2
    }
    this.appService.httpGet(AppGlobal.API.getProductsHot, params, rs => {
      console.debug(rs);
      this.amazonproducts = rs.data;
    })
  }

  //获取乐天产品
  getTakutenPorducts() {
    let params = {
      type: 3
    }
    this.appService.httpGet(AppGlobal.API.getProductsHot, params, rs => {
      console.debug(rs);
      this.takutenproducts = rs.data;
    })
  }

  // 跳转商品列表
  goProductList(id){
    this.navCtrl.push(ListPage, {
      cateid:id
    });
  }


  //商品详情
  goDetails(id) {
    this.navCtrl.push(ProductDetailPage, {
      pid:id
    })
  }

  // 购物车
  goCart(){
    this.navCtrl.push(ProductCartPage);
  }

  // 搜索
  search(){
    this.navCtrl.push(ProductSearchPage);
  }



  pushList(){
    this.navCtrl.push(ListPage);
  }

}
