import { Component } from '@angular/core';
import { SettingPage } from '../setting/setting';
import { ExplorePage } from '../explore/explore';
import { HomePage } from '../home/home';
import { NavController,NavParams } from 'ionic-angular';
import {SlidesPage} from "../slides/slides";
import { Storage } from "@ionic/storage";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { MuseumProvider } from "../../providers/museum/museum";
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabRoots: Object[];

  data:any;
  constructor(public navCtrl: NavController,public navParams: NavParams, public storage: Storage, public UserServiceProvider:UserServiceProvider, public MuseumProvider: MuseumProvider) {
    //console.log(this.navParams.data)//打印的是传过来的所有数据
    //this.data = navParams.get('item1')
    //console.log(this.data);
    this.tabRoots=[
      {
        root: HomePage,
        tabTitle: 'Home',
        tabIcon: 'home'
      },
      {
        root: ExplorePage,
        tabTitle: 'Explore',
        tabIcon: 'notifications'
      },
      {
        root: SettingPage,
        tabTitle: 'Setting',
        tabIcon: 'document'
      }
    ];
    this.MuseumProvider.getNear();
    this.slideJudge();
  }

  slideJudge(){
    this.storage.length().then((val)=>{
      if(!val){
        this.navCtrl.push(SlidesPage);
      }
      else{
        this.statusJudge();
      }
    })
  }

  statusJudge(){
    this.storage.get('status').then((val)=>{
      if(val){
        this.storage.get('user').then((val)=>{
          this.UserServiceProvider._user=val;
        })
      }
    })
  }

  ionViewDidLoad(navParams: NavParams) {
    //console.log('Hello NewPagePage Page');
    //console.log(this.data);
  }
}
