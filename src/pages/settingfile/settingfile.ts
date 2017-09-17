import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController, Loading, Platform, ActionSheetController } from 'ionic-angular';
import { Http } from "@angular/http";
import { UserServiceProvider } from "../../providers/user-service/user-service";

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-settingfile',
  templateUrl: 'settingfile.html',
})

export class SettingfilePage {
  lastImage: string = null;
  loading: Loading;
  userInfo:any={};

  constructor(public UserServiceProvider:UserServiceProvider,public navCtrl: NavController, public http: Http, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
    this.updateInfo();
  }
  public updateInfo(){
    this.userInfo=this.UserServiceProvider._user;
  }
  genderOpt(){
    let actionSheet = this.actionSheetCtrl.create({
      title: '性别选择',
      buttons: [
        {
          text: '男',
          handler:()=>{
            this.userInfo.sex = '男';
          }
        },
        {
          text: '女',
          handler:()=>{
            this.userInfo.sex = '男';
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
        ]
    });
    actionSheet.present();
  }
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '替换头像',
      buttons: [
        {
          text: '从相册中选取',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: '拍照',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      allowEdit: true,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName =  n + ".jpg";
    return newFileName;
  }

// Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.uploadImage();
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'buttom'
    });
    toast.present();
  }

// Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage() {
    // Destination URL
    var url = "/api/users/resetAvatar";

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;

    var options = {
      fileKey: "avatar",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename}
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: '上传中',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.getData();
      this.lastImage = null;
      this.loading.dismissAll();
      this.presentToast('修改成功！');
    }, err => {
      this.loading.dismissAll();
      this.presentToast('上传失败！');
    });
  }

  getData(){
    let url = '/api/users/getProfile';
    this.http.get(url).subscribe((res)=>{
      if(res.json().status){
        this.UserServiceProvider.setUser(res.json().data);
        this.UserServiceProvider.status = true;
        this.updateInfo();
      }
    })
  }

  saveProfile(){
    let url = '/api/users/resetProfile';
    this.http.post(url,{
      nickname:this.userInfo.nickname,
      desc: this.userInfo.desc,
      sex: this.userInfo.sex,
      location: {
        city: '呼和浩特',
        province: '内蒙古'
      }
    }).subscribe((res)=>{
      let toast = this.toastCtrl.create({
        message: res.json().msg,
        duration: 2000
      });
      toast.present();
      if(res.json().status){
        this.getData();
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingfilePage');
  }

}
