import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from "@angular/http";

/**
 * Generated class for the MuseumPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-museum',
  templateUrl: 'museum.html',
})
export class MuseumPage {

  data:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public toastCtrl:ToastController) {
    this.getData(navParams.get('id'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MuseumPage');
  }

  getData(_id){
    let url = '/api/museum/detail';
    this.http.get(url).subscribe((val)=>{
      if(val.json().status){
        this.data=val.json().data;
      }
      else{
        let toast = this.toastCtrl.create({
          message: '没有此博物馆相关资料',
          duration: 2000
        });
        toast.present();
        this.navCtrl.pop();
      }
    });
  }

}
