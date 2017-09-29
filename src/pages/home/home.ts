import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from "@angular/http";
import { PublishPage } from "../publish/publish";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { LoginPage } from "../login/login";
import { MuseumPage } from "../museum/museum";
import { PoeticPage} from "../poetic/poetic";
import { ArticlePage } from "../article/article";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public str="59c77a1a502a8a3bd018af0b";

  slides = [
    {
      title: "Welcome to the Docs!",
      subTitle:" 记忆永不凋零",
      image: "http://ocxi5zst0.bkt.clouddn.com/museum:57fc58f0-a10a-11e7-ac1d-f5489c9aeb51.jpg",
      description: "<b>那些永不凋零的记忆</b>",
      text:"Memories that never fade",
    },
    {
      title: "The love world is big!",
      subTitle:"爱的世界很大也很小",
      image: "assets/img/home-banner2.jpg",
      description: "<b>陪伴才是最长情的告白</b>",
      text:"To the world you may",
    },
    {
      title: "\tIf You Forget Me!",
      subTitle:" 如果你忘了我",
      image: "assets/img/home-banner3.jpg",
      description: "<b>爱是无形燃烧的火焰</b>",
      text:" Love is a fire which burns unseen.",
    }
  ];

  constructor(public navCtrl: NavController, public http:Http, public UserServiceProvider:UserServiceProvider){

  }
  navToArticle(){
    this.navCtrl.push(ArticlePage);
  }

  navToPoetic(){
    this.navCtrl.push(PoeticPage);
  }

  navToMuseum(){
    this.navCtrl.push(MuseumPage,{
      id: this.str
    });
  }

  navToPublish(){

    if(this.UserServiceProvider.checkLogin()){
      this.navCtrl.push(PublishPage);
    }
    else{
      this.navCtrl.push(LoginPage);
    }
  }

}
