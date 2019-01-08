import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

 

import { FormGroup } from '@angular/forms';

 

// import { File } from '@ionic-native/file';

import { ImagePicker } from '@ionic-native/image-picker';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {

  path: string;

loginForm: FormGroup;

username: any;

password: any;

fileTransfer: FileTransferObject = this.transfer.create();

  constructor(public navCtrl: NavController,

    public navParams: NavParams,
    
    private camera: Camera,
    
    private transfer: FileTransfer, private imagePicker: ImagePicker) {
    
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


  /**

* 打开摄像头

*/

openCamera() {

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
  
  this.upload();
  
  //If it's file URI
  
  // this.path = imageData;
  
  }, (err) => {
  
  // Handle error
  
  });
  
  }
  
  /**
  
  * 文件上传
  
  */
  
  upload() {
  
  const apiPath = "https://www.icooder.cn/uploadapi/image";
  
  
  let options: FileUploadOptions = {
  
  fileKey: 'file',
  
  fileName: localStorage.getItem("userName") + '.jpg', //文件名称
  
  headers: {},
  
  // 如果要传参数，写这里
  
  params: {
  
  token: '3142aeb2c083af6936add7c7bc5174ad'
  
  }
  
  };
  
  this.fileTransfer.upload(this.path, apiPath, options)
  
  .then((data) => {
  
  alert(JSON.stringify(data))
  
  }, (err) => {
  
  alert(err.error)
  
  });
  
  }
  
  // 打开手机相册
  
  openImgPicker() {
  
    let temp = '';
    
    this.imagePicker.getPictures(this.imagePickerOpt)
    
    .then((results) => {
    
    for (var i = 0; i < results.length; i++) {
    
    temp = results[i];
    
    }
    
    alert(temp)
    
    this.path = temp;
    
    this.upload();
    
    }, (err) => {
    
    alert('ERROR:' + err);//错误：无法从手机相册中选择图片！
    
    });
  
  }
 


  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
  }

}
