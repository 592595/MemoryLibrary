import { Component } from '@angular/core';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http,Headers } from "@angular/http";
import { PublishServiceProvider } from "../../providers/publish-service/publish-service";
import { Camera } from "@ionic-native/camera";
import { Transfer, TransferObject } from "@ionic-native/transfer";

/**
 * Generated class for the PublishPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publish',
  templateUrl: 'publish.html',
})
export class PublishPage {

  published:boolean;
  des:'';
  display:'';
  mid:'';
  ishide:boolean;
  fileTransfer: TransferObject;
  postimg = [];
  items = [];

  constructor( public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              private camera: Camera,
              public transfer: Transfer,
              public actionSheetCtrl: ActionSheetController,
              public PublishServiceProvider:PublishServiceProvider ) {
    this.fileTransfer = this.transfer.create();
    this.published = true;
    this.ishide = false;
  }

  presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择照片',
      buttons: [
        {
          text: '相册',
          icon: 'images',
          handler: ()=>{
            this.selectImgType(0);
          }
        },
        {
          text: '相机',
          icon: 'camera',
          handler: ()=>{
            this.selectImgType(1);
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: ()=>{
            console.log('cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  up(path) {
    this.fileTransfer.upload(path, "http://www.devonhello.com/chihu2/upload", {})
      .then((data) => {
        // success
        //alert(JSON.stringify(data));
        var idata = JSON.parse(data["response"]);
        this.postimg.push(idata);
        this.items.push(idata['src']);
      }, (err) => {
        // error
        alert('err');
      })
  }


  //长按删除事件
  pressEvent(idx) {
    //alert(idx);
    this.showConfirm(idx);
  }
  //删除提示
  showConfirm(idx) {
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '是否删除此照片?',
      buttons: [
        {
          text: '在想想',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.items.splice(idx, 1);
            this.postimg.splice(idx, 1);
            if (this.items.length < 4) {
              this.ishide = false;
            }
          }
        }
      ]
    });
    confirm.present();
  }

  //成品照片
  selectImgType(type){
    var _that = this;
    this.camera.getPicture({
      quality: 100,
      allowEdit: true,
      sourceType: type,
      correctOrientation: true
    }).then((imageData)=>{
      _that.up(imageData);
    })
  }
  setPrivate(){
    this.published = !this.published;
  }
  setPublic(){
    this.published = !this.published;
  }
  pub(){
    let url = 'api/users/publish';
    var headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');
    if(!this.postimg.length){
      let toast = this.toastCtrl.create({
        message: "还没有添加照片",
        duration: 2000
      });
      toast.present();
      return;
    }
    if (!(this.des&&this.display&&this.mid)) {
      let toast = this.toastCtrl.create({
        message: "兄弟，信息不完全哟~~~仔细检查一下",
        duration: 2000
      });
      toast.present();
      return;
    }
    this.http.post(url,{
      published: this.published,
      photo: JSON.stringify(this.postimg),
      des: this.des,
      time: new Date(),
      display: this.display,
      mid: this.mid
    },{
      headers: headers
    }).subscribe((res)=>{
      let toast = this.toastCtrl.create({
        message: res.json().msg,
        duration: 2000
      });
      toast.present();
      if (res.json().status) {
        this.navCtrl.pop();
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublishPage');
  }

}
