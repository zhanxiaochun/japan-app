import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the HelpcenterDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-helpcenter-detail',
  templateUrl: 'helpcenter-detail.html',
})
export class HelpcenterDetailPage {

  content: Array<any> = [];
  category: Number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService, public sanitizer: DomSanitizer) {
    this.category = this.navParams.get('category');
    this.getContent(this.category);
  }

  // 获取文章
  getContent(id){
    let params = {
      category: id
    }
    this.appService.httpGet(AppGlobal.API.getArticle, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        this.content = rs.data;
      }
    })
  }

    // 转义HTML
    assembleHTML(strHTML: any) {
      return this.sanitizer.bypassSecurityTrustHtml(strHTML);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpcenterDetailPage');
  }

}
