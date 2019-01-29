import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { ProductCart2orderPage } from '../product-cart2order/product-cart2order';

/**
 * Generated class for the ProductCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-cart',
  templateUrl: 'product-cart.html',
})
export class ProductCartPage {

  token: string;
  cart: Array<any> = [];
  cart2: Array<any> = [];
  cart3: Array<any> = [];
  type1:boolean;
  type2:boolean;
  type3:boolean;
  type0:boolean;
  cartIds: Array<any> = [];
  coin:string;
  cartNum: Number;
  total: Number;
  status: Number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService) {
    this.token = this.appService.getToken();
    this.getCartShop();
    this.getCartAmazon();
    this.getCartRatuken();
    this.type1 = this.type2 = this.type3 = this.type0 = false;
    this.coin = AppGlobal.coin;
    this.cartNum = 0;
    this.total = 0.00;
    this.status = 0;
  }

  // 获取购物车-商城
  getCartShop(){
    let params = {
      token: this.token,
      type: 1
    }
    this.appService.httpGet(AppGlobal.API.getCartProduct, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        this.cart = rs.data['carts'];
        this.cart['length'] =this.cart.length;
        //
        if(this.cart['length'] > 0){
          this.cart.forEach((val,key) => {
            this.cart[key]['attr'] = '';
            this.cart[key]['check'] = false;
            if(val['propertyX'] != null){
              // console.log(val['propertyX']['attrValueList'].length);
              if(val['propertyX']['attrValueList'].length > 0){
                val['propertyX']['attrValueList'].forEach((v,k) => {
                  this.cart[key]['attr'] += v['attrKey']['propertyname']+':'+v['attrValue']+' ';
                });
              }
              
            }         
          });
        }
        
      }
      // console.log(this.cart);
    })
  }

  // 获取购物车-亚马逊
  getCartAmazon(){
    let params = {
      token: this.token,
      type: 2
    }
    this.appService.httpGet(AppGlobal.API.getCartProduct, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        this.cart2 = rs.data['carts'];
        this.cart2['length'] = this.cart2.length;
        //
        if(this.cart2['length'] > 0){
          this.cart2.forEach((val,key) => {
            this.cart2[key]['attr'] = '';
            this.cart2[key]['check'] = false;
            if(val['propertyX'] != null){
              // console.log(val['propertyX']['attrValueList'].length);
              if(val['propertyX']['attrValueList'].length > 0){
                val['propertyX']['attrValueList'].forEach((v,k) => {
                  this.cart[key]['attr'] += v['attrKey']['propertyname']+':'+v['attrValue']+' ';
                });
              }
              
            }         
          });
        }
        
      }
      // console.log(this.cart2);
    })
  }

  // 获取购物车-亚马逊
  getCartRatuken(){
    let params = {
      token: this.token,
      type: 3
    }
    this.appService.httpGet(AppGlobal.API.getCartProduct, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        this.cart3 = rs.data['carts'];
        this.cart3['length'] = this.cart3.length;
        //
        if(this.cart3['length'] > 0){
          this.cart3.forEach((val,key) => {
            this.cart3[key]['attr'] = '';
            this.cart3[key]['check'] = false;
            if(val['propertyX'] != null){
              // console.log(val['propertyX']['attrValueList'].length);
              if(val['propertyX']['attrValueList'].length > 0){
                val['propertyX']['attrValueList'].forEach((v,k) => {
                  this.cart[key]['attr'] += v['attrKey']['propertyname']+':'+v['attrValue']+' ';
                });
              }   
            }          
          });
        }
        
      }
      console.log(this.cart3);
    })
  }

  // 加
  plus(num,id,key,type){
    
    let params = {
      token: this.token,
      id: id,
      amount: Number(num) + 1,
    }
    this.appService.httpPost(AppGlobal.API.updateCartAmount, params, rs=>{
      if(rs.code == 200){
        if(type == 1){
          this.cart[key]['amount'] = Number(num) + 1;
        }else if(type == 2){
          this.cart2[key]['amount'] = Number(num) + 1;
        }else if(type == 3){
          this.cart3[key]['amount'] = Number(num) + 1;
        }
        this.calculate();
      }
    })
  }

  // 减
  reduce(num,id,key,type){
    let params = {
      token: this.token,
      id: id,
      amount: Number(num) - 1,
    }
    this.appService.httpPost(AppGlobal.API.updateCartAmount, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        if(type == 1){
          this.cart[key]['amount'] = Number(num) - 1;
        }else if(type == 2){
          this.cart2[key]['amount'] = Number(num) - 1;
        }else if(type == 3){
          this.cart3[key]['amount'] = Number(num) - 1;
        }
        this.calculate();
      }
    })
  }

  // 选择产品
  selectProduct(id){
    if(this.cartIds.length > 0){
      let ishave = false;
      for(let i = 0; i < this.cartIds.length; i++){
        if(this.cartIds[i] == id){
          ishave = false;
          //删除
          this.cartIds.splice(i,1);
          break;
        }else{
          ishave = true;
        }
      }
      if(ishave){
        this.cartIds.push(id);
      }
    }else{
      this.cartIds.push(id);
    }
    this.calculate();
  }

  // 选择商品 - 分类全选
  checktype(cate,type){

    if(cate == 1){
      for(let i = 0; i < this.cart.length; i++){
        // this.cart[i]['check'] = type;
        if(this.cart[i]['check'] != type){
          this.cart[i]['check'] = type;
          this.selectProduct(this.cart[i]['id']);
        }
        // console.log(this.cart);
      }
    }else if(cate == 2){
      for(let i = 0; i < this.cart2.length; i++){
        if(this.cart2[i]['check'] != type){
          this.cart2[i]['check'] = type;
          this.selectProduct(this.cart2[i]['id']);
        }
      }
    }else if(cate == 3){
      for(let i = 0; i < this.cart3.length; i++){
        // this.cart3[i]['check'] = type;
        // this.selectProduct(this.cart3[i]['id']);
        if(this.cart3[i]['check'] != type){
          this.cart3[i]['check'] = type;
          this.selectProduct(this.cart3[i]['id']);
        }
      }
    }
    this.calculate();
  }

  // 全选
  checkall(type){
    this.type0 = this.type1 = this.type2 = this.type3 = type;
    if(type){
      // console.log('sd');
      this.cartIds = [];
      for(let i = 0; i < this.cart.length; i++){
        this.cart[i]['check'] = type;
        this.cartIds.push(this.cart[i]['id']);
      }
      for(let j = 0; j < this.cart2.length; j++){
            this.cart2[j]['check'] = type;
            this.cartIds.push(this.cart2[j]['id']);
      }
      for(let k = 0; k < this.cart3.length; k++){
            this.cart3[k]['check'] = type;
            this.cartIds.push(this.cart3[k]['id']);
      }
    }else{
      this.cartIds = [];
      for(let i = 0; i < this.cart.length; i++){
        this.cart[i]['check'] = type;
      }
      for(let j = 0; j < this.cart2.length; j++){
        this.cart2[j]['check'] = type;
      }
      for(let k = 0; k < this.cart3.length; k++){
        this.cart3[k]['check'] = type;
      }
    }
    // console.log(this.cartIds);
    this.calculate();
  }

  // 总计
  calculate(){
    this.total = 0;
    this.cartNum = this.cartIds.length;
    for(let i = 0; i < this.cartIds.length; i++){
      for(let j = 0; j < this.cart.length; j++){
        if(this.cartIds[i] == this.cart[j]['id']){
          if(this.cart[j]['propertyX'] != null){
            this.total = Number(this.total) + Number(this.cart[j]['propertyX']['price']) * Number(this.cart[j]['amount']);
          }else{
            this.total = Number(this.total) + Number(this.cart[j]['product']['webprice']) * Number(this.cart[j]['amount']);
          }
        }
      }
      for(let k = 0; k < this.cart2.length; k++){
        if(this.cartIds[i] == this.cart2[k]['id']){
          if(this.cart2[k]['propertyX'] != null){
            this.total = Number(this.total) + Number(this.cart2[k]['propertyX']['price']) * Number(this.cart2[k]['amount']);
          }else{
            this.total = Number(this.total) + Number(this.cart2[k]['product']['webprice']) * Number(this.cart2[k]['amount']);
          }
        }
      }
      for(let l = 0; l < this.cart3.length; l++){
        if(this.cartIds[i] == this.cart3[l]['id']){
          if(this.cart3[l]['propertyX'] != null){
            this.total = Number(this.total) + Number(this.cart3[l]['propertyX']['price']) * Number(this.cart3[l]['amount']);
          }else{
            this.total = Number(this.total) + Number(this.cart3[l]['product']['webprice']) * Number(this.cart3[l]['amount']);
          }
        }
      }
    }
  }

  // 确认订单
  confirmOrder(){
    this.navCtrl.push(ProductCart2orderPage,{
      ids:this.cartIds
    });
  }

  // 编辑
  chanagestatus(status){
    this.status = status;
    // console.log(this.status);
  }

  // 删除购物车
  delCart(){
    // console.log(this.cartIds);
    let params = {
      token: this.token,
      id: this.cartIds.join(',')
    }
    this.appService.httpPost(AppGlobal.API.deleteCart, params, rs=>{
      console.log(rs);
      if(rs.code == 200){
        this.appService.alert('删除成功');
        this.getCartShop();
        this.getCartAmazon();
        this.getCartRatuken();
        this.type1 = this.type2 = this.type3 = this.type0 = false;
        this.cartNum = 0;
        this.total = 0.00;
        this.status = 0;
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductCartPage');
  }


}
