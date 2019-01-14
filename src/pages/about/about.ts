import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { ProductPurchasePage } from '../product-purchase/product-purchase';
import { StatusBar } from '@ionic-native/status-bar';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  headimg: String;
  producturl: String;

  constructor(public navCtrl: NavController, public appService: AppService, private statusBar: StatusBar) {
    this.getImg();
  }

  // 获取图片
  getImg(){
    let params = {
      cate: 9
    }
    this.appService.httpGet(AppGlobal.API.getBanner, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        this.headimg = rs.data[0]['url'];
        console.log(this.headimg);
      }
    })
  }

  getProducturl(){
    this.navCtrl.push(ProductPurchasePage, {
      url: this.producturl
    })
  }

  ionViewWillEnter(){
    // this.statusBar.styleLightContent();
    this.statusBar.styleDefault();
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#999');
  }

}
