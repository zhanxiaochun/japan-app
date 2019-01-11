import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
// import { FormGroup } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


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
  path: String;
  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService, public actionSheetCtrl: ActionSheetController, private camera: Camera, private transfer: FileTransfer, private imagePicker: ImagePicker) {
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


  // 图片
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: '拍照',
        role: 'takePhoto',
        handler: () => {
          this.takePhoto();
        }
      }, {
        text: '从相册选择',
        role: 'chooseFromAlbum',
        handler: () => {
          this.xiangce();
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log("cancel");
        }
      }]
    });

    actionSheet.present().then(value => {
      return value;
    });
  }

  // 调用相册时传入的参数

  private imagePickerOpt = {
    maximumImagesCount: 3,//选择一张图片
    width: 800,
    height: 800,
    quality: 80
    };
  
  // 图片上传的的api
  public uploadApi: string;


  takePhoto() {
    const options: CameraOptions = {
      quality: 90, //相片质量 0 -100
      destinationType: this.camera.DestinationType.DATA_URL, //DATA_URL 是 base64 FILE_URL 是文件路径
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true, //是否保存到相册
      // sourceType: this.camera.PictureSourceType.CAMERA , //是打开相机拍照还是打开相册选择 PHOTOLIBRARY : 相册选择, CAMERA : 拍照,
    }

    this.camera.getPicture(options).then((imageData) => {
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.path = base64Image;
      // this.upload();
      //If it's file URI
      // this.path = imageData;
      }, (err) => {
      // Handle error
      });
  }

  xiangce() {
   
    let temp = '';
    console.log('ss');
    this.imagePicker.getPictures(this.imagePickerOpt)
    .then((results) => {
      
      for (var i = 0; i < results.length; i++) {
        temp = results[i];
      }
    // alert(temp)
    this.path = temp;
    this.upload();
    }, (err) => {
      alert('ERROR:' + err);//错误：无法从手机相册中选择图片！
    });
  }

  /**
  
  * 文件上传
  
  */
  
 upload() {
  const apiPath = "https://www.icooder.cn/uploadapi/image";
  // const apiPath = AppGlobal.API.uploadImg;

  let options: FileUploadOptions = {
    fileKey: 'file',
    fileName: localStorage.getItem("userName") + '.jpg', //文件名称
    headers: {},
    // 如果要传参数，写这里
    params: {
    token: this.token
    }
  };

  this.fileTransfer.upload(String(this.path), apiPath, options)
  .then((data) => {
    alert(JSON.stringify(data));
    let rsdata = JSON.parse(data['response']);
    // alert(rsdata['msg']);
    alert(JSON.stringify(data)+'ss');
    
    if(rsdata['code'] == 200){
      
      // this.member['avatar'] = rsdata['data']['data']['path'];
      
    }else{
      // alert(JSON.stringify(data)+'ss');
      this.appService.alert('上传图片失败');
    }
  }, (err) => {
    alert(err.error)
  });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchasePage');
  }

}
