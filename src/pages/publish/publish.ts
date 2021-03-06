import { Component } from '@angular/core';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http,Headers } from "@angular/http";
import { MuseumProvider } from "../../providers/museum/museum";

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
  pet: string = "puppies";
  loc:string;

  postimg = [];
  items = [];
  mus:any;

  constructor( public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public actionSheetCtrl: ActionSheetController,
              public MuseumProvider:MuseumProvider ) {

    this.published = true;
    this.ishide = false;
    this.mus = this.MuseumProvider.mList;
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
    if(this.pet=='puppies'){
      if (!(this.des&&this.display&&this.mid)) {
        let toast = this.toastCtrl.create({
          message: "兄弟，信息不完全哟~~~仔细检查一下",
          duration: 2000
        });
        toast.present();
        return;
      }
      this.http.post(url,{
        type: '物件',
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
      });
    }
    else{
      this.http.post(url,{
        type: '回忆',
        published: this.published,
        photo: JSON.stringify(this.postimg),
        des: this.des,
        time: new Date(),
        loc: this.loc
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
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublishPage');
  }

}
