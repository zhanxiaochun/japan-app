// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
// import { AppService, AppGlobal } from '../../app/app.service';
// import { MemberNicknamePage } from '../member-nickname/member-nickname';
// import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
// import {Camera, CameraOptions} from "@ionic-native/camera";
// import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
// // import { File } from '@ionic-native/file';




// @IonicPage()
// @Component({
//   selector: 'page-member',
//   templateUrl: 'member.html',
// })
// export class MemberPage {

//   token: string;
//   member: Array<any> = [];
//   avatar: string = "";
//   tmpimg: String = '';
//   fileTransfer: FileTransferObject = this.transfer.create();

//   constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService, public actionSheetCtrl: ActionSheetController, public imagePicker: ImagePicker, public camera: Camera, private transfer: FileTransfer) {
//     this.ionViewWillEnter();
//     this.getMemberInfo();
//   }

//   // 提取token
//   ionViewWillEnter(){
//     this.token=window.localStorage.getItem('token');
//     console.log(this.token);
//   }

//   // 获取用户信息
//   getMemberInfo(){
//     let params = {
//       token: this.token
//     }
//     this.appService.httpGet(AppGlobal.API.memberInfo, params, rs=>{
//       console.log(rs);
//       if(rs.code == 200){
//         this.member = rs.data;
//         this.member['avatar'] = 'https://www.icooder.cn/static/images/member/default_face.png';
//       }else{
//         console.log('获取信息失败');
//       }
//     })
//   }

//   // 修改昵称
//   goNickname(){
//     this.navCtrl.push(MemberNicknamePage);
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad MemberPage');
//   }

//   presentActionSheet() {
//     let actionSheet = this.actionSheetCtrl.create({
//       buttons: [{
//         text: '拍照',
//         role: 'takePhoto',
//         handler: () => {
//           this.takePhoto();
//         }
//       }, {
//         text: '从相册选择',
//         role: 'chooseFromAlbum',
//         handler: () => {
//           this.chooseFromAlbum();
//         }
//       }, {
//         text: '取消',
//         role: 'cancel',
//         handler: () => {
//           console.log("cancel");
//         }
//       }]
//     });

//     actionSheet.present().then(value => {
//       return value;
//     });
//   }
//   takePhoto() {
//     const options: CameraOptions = {
//       quality: 100,
//       allowEdit: true,
//       targetWidth: 200,
//       targetHeight: 200,
//       saveToPhotoAlbum: true,
//     };

//     this.camera.getPicture(options).then(image => {
//       console.log('Image URI: ' + image);
//       this.avatar = image.slice(7);
//     }, error => {
//       console.log('Error: ' + error);
//     });
//   }

//   chooseFromAlbum() {
//     const options: ImagePickerOptions = {
//       maximumImagesCount: 2,
//       width: 200,
//       height: 200
//     };
//     this.imagePicker.getPictures(options).then(images => {
//       if (images.length > 1) {
//         this.presentAlert();
//       } else if (images.length === 1) {
//         console.log('Image URI: ' + images[0]);
//         // this.appService.alert(images.join('--'));
//         // this.tmpimg = images[0];
//         this.avatar = images[0].slice(7);
//         this.tmpimg = this.avatar;
//         this.appService.alert(this.avatar);
//       }
//     }, error => {
//       console.log('Error: ' + error);
//     });
//   }

//   presentAlert() {
//     // let alert = this.alertCtrl.create({title: "上传失败", message: "只能选择一张图片作为头像哦", buttons: ["确定"]});
//     // alert.present().then(value => {
//     //   return value;
//     // });
//     console.log('dd');
//   }

//   upload() {
//     // ionic 官方文档例子漏写了这句话
//     // http://ionicframework.com/docs/native/file-transfer/
//     //
//     const fileTransfer: FileTransferObject = this.transfer.create();
//     // 更多的 Options 可以点进去自己看看，不懂的就谷歌翻译他的注释
//     let options: FileUploadOptions = {
//       fileKey: 'file',
//       fileName: 'name.jpg',  // 文件类型
//       headers: {},
//       params: {}    // 如果要传参数，写这里
//     }
  
//     fileTransfer.upload(this.avatar, 'https://www.icooder.cn/uploadapi/image', options)
//     .then((data) => {
//       this.appService.alert(data);
//       // success
//     }, (err) => {
//       // error
//       this.appService.alert(err.join(','));
//     })
//   }


// }
