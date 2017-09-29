import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from "@angular/http";
import { ArtListPage } from "../art-list/art-list";


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

  data={
    _id:'',
    name:'',
    desc:'',
    startTime:'',
    image:'',
    '__v':'',
    admin:{
      email:''
    },
    location:{
      city:'',
      province:''
    },
    memories:[]
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public toastCtrl:ToastController) {
    this.getData(navParams.get('id'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MuseumPage');
  }
  pushMore(){
    this.navCtrl.push(ArtListPage,{
      list:this.data.memories
    })
  }

  getData(_id){
    let url = '/api/museum/detail?id='+_id;
    this.http.get(url).subscribe((res)=>{
      if(res.json().status){
        console.log(res.json());
        this.data = res.json().data;
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
