import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { ProductListPage } from '../product-list/product-list';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the ProductSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-search',
  templateUrl: 'product-search.html',
})
export class ProductSearchPage {

  searchinfo: String;
  searchstr: String;
  searcharr: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService, private statusBar: StatusBar) {
    
    this.getsearch();
  }

  // 搜索
  searchproduct(){
    let params = {
      type: '',
      category: '',
      search: this.searchinfo,
      order: '',
      page: 1,
    }
    this.appService.httpGet(AppGlobal.API.getProducts, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        // 判断是否有缓存
        if(this.searchstr != null){
          // 如果搜索超过50个，则删除之前的
          for(let i = 0; i < this.searcharr.length; i++){
            // 判断是否有已经搜索过
            if(this.searcharr[i] == this.searchinfo){
              this.searcharr.splice(i,1);
              console.log(this.searcharr);
            }
            if(i >= 9){
              // this.searcharr.shift();
              this.searcharr.pop();
            }
          }
          // this.searcharr.push(this.searchinfo);
          this.searcharr.unshift(this.searchinfo);
        }else{
          this.searcharr[0] = this.searchinfo;
        }

        window.localStorage.setItem('search',this.searcharr.join('##'));
        this.getsearch();
        this.navCtrl.push(ProductListPage, {
          product: rs.data,
          param: params,
          searchinfo: this.searchinfo
        })
      }
    })
  }

  // 点击缓存记录搜索
  searchitem(str){
    let params = {
      type: '',
      category: '',
      search: str,
      order: '',
      page: 1,
    }
    this.appService.httpGet(AppGlobal.API.getProducts, params, rs=>{
      if(rs.code == 200){
        this.searchinfo = str;
        for(let i = 0; i < this.searcharr.length; i++){
          // 判断是否有已经搜索过
          if(this.searcharr[i] == this.searchinfo){
            this.searcharr.splice(i,1);
            this.searcharr.unshift(this.searchinfo);
          }
        }
        this.navCtrl.push(ProductListPage, {
          product: rs.data,
          param: params,
          searchinfo: this.searchinfo
        })
      }
    })
  }

  // 获取缓存的搜索信息
  getsearch(){
    this.searchstr =  window.localStorage.getItem('search');
    console.log(this.searchstr);
    if(this.searchstr != null){
      this.searcharr = this.searchstr.split('##');
      // this.searcharr = this.searcharr.reverse();
    }
  }

  // 清除缓存
  clearsearch(){
    window.localStorage.removeItem('search');
    this.getsearch();
    this.searcharr = [];
  }


  @ViewChild(Navbar) navBar: Navbar;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductSearchPage');
    this.navBar.backButtonClick = this.backButtonClick;
    this.statusBar.styleLightContent();
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#999');
  }

  backButtonClick = (e: UIEvent) => {
    // do something
    this.navCtrl.popToRoot();
  }

}
