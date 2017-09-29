import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ArticlePage } from "../article/article";

/**
 * Generated class for the ArtListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-art-list',
  templateUrl: 'art-list.html',
})
export class ArtListPage {
  public list:[{}];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.list=navParams.get('list');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArtListPage');
  }

  navToArticle(){
    this.navCtrl.push(ArticlePage);
  }

}
