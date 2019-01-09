import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { ProductListPage } from '../product-list/product-list';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService) {
    this.getsearch();
   if(this.searchstr != null){
     this.searcharr = this.searchstr.split('##');
   }
   console.log(this.searchstr);
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
        // 将缓存搜索转为数组
        if(this.searchstr != null){
          // 如果搜索超过50个，则删除之前的
          for(let i = 0; i < this.searcharr.length; i++){
            if(i >= 9){
              this.searcharr.shift();
            }
          }
          this.searcharr.push(this.searchinfo);
          console.log(this.searchinfo);
          console.log(this.searcharr);
          this.getsearch();
        }
        window.localStorage.setItem('search',this.searcharr.join('##'));
        this.navCtrl.push(ProductListPage, {
          product: rs.data
        })
      }
    })
  }

  // 获取缓存的搜索信息
  getsearch(){
    this.searchstr =  window.localStorage.getItem('search');
  }

  // 清除缓存
  clearsearch(){
    console.log('ss');
    window.localStorage.removeItem('search');
    this.getsearch();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductSearchPage');
  }

}
