import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, App } from 'ionic-angular';
import { AppService, AppGlobal } from './../../app/app.service';

/**
 * Generated class for the ProductAttrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-attr',
  templateUrl: 'product-attr.html',
})
export class ProductAttrPage {
  product: Array<any> = [];
  product2: Array<any> = [];
  productAttr: Array<any> = [];
  attrData: Array<any> = [];
  attr: Array<any> = [];
  attrArr: Array<any> = [];
  attrString: string;
  propertyexid: string; // 属性id
  productnum: number; // 数量
  attrSelect: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public events: Events, private appService: AppService) {
    this.product = this.navParams.get('product');
    this.product2 = this.navParams.get('product');
    this.productAttr = this.product['property'];
    this.attrArr = this.productAttr;
    this.productnum = 1;
    this.propertyexid = '';
  
    for(let i = 0; i < this.productAttr.length; i++){

      // this.attrArr[i]['id'] = this.productAttr[i]['id'];
      // this.attrArr[i]['price'] = this.productAttr[i]['price'];
      // this.attrArr[i]['inventory'] = this.productAttr[i]['invertory'];
      
      for(let j = 0; j < this.productAttr[i]['attrValueList'].length; j++){
        let iskeys = this.checkAttrKey(this.attrData, this.productAttr[i]['attrValueList'][j]['attrKey']['propertyname']);
        console.log(iskeys);
        // 数组中没有该属性
        if(iskeys >= 0){
          // 判断是否存在
          let isvals = this.checkAttrVal(this.attrData[iskeys]['attrVal'], this.productAttr[i]['attrValueList'][j]['attrValue']);
          if(isvals == -1){
            this.attrData[iskeys]['attrVal'].push(this.productAttr[i]['attrValueList'][j]['attrValue']);
          }
        }else{
          //新增
          this.attrData.push({
            attrKey: this.productAttr[i]['attrValueList'][j]['attrKey']['propertyname'],
            attrVal: [this.productAttr[i]['attrValueList'][j]['attrValue']]
          })
        }

        // 
        // console.log(this.productAttr[i]['attrValueList'][j]);
        let proAttr = '';
        this.productAttr[i]['attrValueList'].forEach((val,key) => {
          proAttr += val['attrValue'];
          // console.log(val);
          // console.log(key);
        });
        // console.log(proAttr);
        this.attrArr[i]['attr'] = proAttr;
      }

      // 获取组合属性的价格等信息
      // console.log(this.productAttr[i]);

    }
    console.log(this.attrData);
    console.log(this.attrArr);
  }


  // 商品属性


  // 判断属性值是否已经记录
  checkAttrKey(arr, key){
    let iskey = -1;
    for(let i = 0; i < arr.length; i++){
      if(key == arr[i]['attrKey']){
        iskey = i;
        break;
      }
    }
    return iskey;
  }

  // 判断数组中属性值
  checkAttrVal(arr, val){
    let isval = -1;
    for(let i = 0; i < arr.length; i++){
      if(val == arr[i]){
        isval = i;
        break;
      }
    }
    return isval;
  }

  // 选择属性
  selectAttr(attr,key){
    console.log(attr);
    console.log(key);
    this.attr[key] = attr;
    this.attrString = this.attr.join("");

    // 属性名称
    this.attrData.forEach((v,k) => {
      if(key == k){
        console.log(v);
        // this.attrSelect[key]['attrKey'] = v;
        // this.attrSelect[key]['attrVal'] = attr;
        let temArr = {
          attrKey:v.attrKey,
          attrVal:attr
        }
        this.attrSelect[key] = temArr;
      }
    });
    console.log(this.attrSelect);
    
    // 匹配数据
    for(let i = 0; i < this.attrArr.length; i++){
      if(this.attrString == this.attrArr[i]['attr']){
        this.product['webprice'] = this.attrArr[i]['price'];
        this.product['stock'] = this.attrArr[i]['inventory'];
        this.propertyexid = this.attrArr[i]['id'];
        break;
      }
    }
  }

  // 退出弹框
  dismiss() {
    // 数据重置
    this.product = this.product2;
    this.viewCtrl.dismiss();
  }

  // 确定选择
  makesure(){
    // console.log(this.productAttr);
    if((this.productAttr.length > 0) && (this.propertyexid == '')){
      this.appService.toast('请选择商品属性');return;
    }
    let params = {
      propertyexid: this.propertyexid,
      amount: this.productnum,
      select: this.attrSelect,
    }
    console.log(params);
    this.navCtrl.pop().then(()=>{
      this.events.publish('attr',params);
    })
  }

  // 数量加
  plus(){
    this.productnum = Number(this.productnum)+1;
    if(this.productnum > Number(this.product['stock'])){
      this.productnum = Number(this.product['stock']);
    }
  }

  // 数量减
  reduce(){
    this.productnum = Number(this.productnum)-1;
    if(Number(this.productnum) < 1){
      this.productnum = 1;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductAttrPage');
  }

}
