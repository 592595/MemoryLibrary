import { Component } from '@angular/core';
import { SettingPage } from '../setting/setting';
import { ExplorePage } from '../explore/explore';
import { HomePage } from '../home/home';
import { NavController,NavParams } from 'ionic-angular';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabRoots: Object[];

  data:any;
  constructor(public navCtrl: NavController,public navParams: NavParams) {
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
  }

  ionViewDidLoad(navParams: NavParams) {
    //console.log('Hello NewPagePage Page');
    //console.log(this.data);
  }
}
