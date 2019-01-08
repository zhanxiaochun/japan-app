import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the PurchasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html',
})
export class PurchasePage {

  token: string;
  // producturl: string;
  productname: string;
  url: string;
  budget: string;
  price: string;
  productnum: Number;
  productattr: string;
  remarks: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, public appService: AppService) {
    this.token = this.appService.getToken();
  }

  // 提交订单
  orderSubmit(){
    let params = {
      token: this.token,
      url: this.url,
      name: this.productname,
      budget: this.budget,
      price: '',
      amount: this.productnum,
      color: this.productattr,
      note: this.remarks,
      material: '',
      size: '',
      images: '',
    }
    this.appService.httpPost(AppGlobal.API.submitCustom, params, rs=>{
      console.log(rs);
    })
    console.log(this);
  }

  getPhoto(){
    const options: CameraOptions = {
      allowEdit:true,
      quality:100,
      destinationType:this.camera.DestinationType.FILE_URI,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      saveToPhotoAlbum:true,
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      alert(base64Image);
    }, (err) => {
      alert("版本不兼容，请从相册选取");
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchasePage');
  }

}
