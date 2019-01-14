import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { ProductListPage } from '../product-list/product-list';
import { StatusBar } from '@ionic-native/status-bar';
import { ProductSearchPage } from '../product-search/product-search';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  categoryleft: Array<any> = [];
  parentid: string;
  categoryright: Array<any> = [];
  cateid: any;
  // selectedMenuTarget: any;
  // products: Array<any> = [];
  hasmore = true;
  islock = false;
  catechecked = true;

  @ViewChild('scroll') scrollElement: any;
  @ViewChild('spinner') spinnerElement: any;

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService, private statusBar: StatusBar) {
    
    this.cateid = this.navParams.get('cateid');
    if(this.cateid == undefined){
      this.cateid = 1;
    }
    this.getCategory(this.cateid);
    // this.getChildCategory();
  }

  // 获取分类
  getCategory(cid){
    let params = {
      type: cid,
    }
    this.appService.httpGet(AppGlobal.API.getCategoryTop, params, rs=>{
      this.categoryleft = rs.data;
      this.parentid = rs.data[0].id;
      this.getChildCategory(this.parentid);
    })
  }

  // 获取子分类
  getChildCategory(id){
    let params = {
      type: 1,
      deep: 4,
      parent: id
    }
    this.appService.httpGet(AppGlobal.API.getCategory, params, rs=>{
      this.categoryright = rs.data;
      this.parentid = id;
      // this.hasmore = false;
    })
  }

  // 跳转到商品列表页
  goProductList(cid){
    let params = {
      type: this.cateid,
      category: cid,
      search: '',
      order: 'default',
      page: 1
    }
    this.navCtrl.push(ProductListPage, {
      // cateid: cid
      param: params
    });
  }

  // 搜索
  search(){
    this.navCtrl.push(ProductSearchPage);
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ListPage');
  //   this.statusBar.styleDefault();
  //   // this.statusBar.styleLightContent();
  //   this.statusBar.overlaysWebView(false);
  //   this.statusBar.backgroundColorByHexString('#999');
  // }

  ionViewWillEnter(){
    // this.statusBar.styleLightContent();
    this.statusBar.styleDefault();
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#999');
  }

}
