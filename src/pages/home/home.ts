import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from "@angular/http";
import { PublishPage } from "../publish/publish";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { LoginPage } from "../login/login";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  slides = [
    {
      title: "Welcome to the Docs!",
      subTitle:" 记忆永不凋零",
      image: "assets/img/home-banner1.jpg",
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

  navToPublish(){

    if(this.UserServiceProvider.checkLogin()){
      this.navCtrl.push(PublishPage);
    }
    else{
      this.navCtrl.push(LoginPage);
    }
  }

}
