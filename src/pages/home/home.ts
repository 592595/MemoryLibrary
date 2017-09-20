import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from "@angular/http";
import { PublishPage } from "../publish/publish";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  slides = [
    {
      title: "Welcome to the Docs!",
      subTitle:" 记忆永不凋零",
      image: "assets/img/0.jpg",
      description: "<b>那些永不凋零的记忆</b>",
      text:"Memories that never fade",
    },
    {
      title: "What is Ionic?",
      image: "assets/img/0.jpg",
    },
    {
      title: "What is Ionic Cloud?",
      image: "assets/img/0.jpg",
    }
  ];
  slide = [
    {
      image: "assets/img/1.jpg",
      description: "<b>那些永不凋零的记忆</b>",
    },
    {
      image: "assets/img/2.jpg",
      description: "<b>那些永不凋零的记忆</b>",
    },
    {
      image: "assets/img/3.jpg",
      description: "<b>那些永不凋零的记忆</b>",
    },
    {
      image: "assets/img/4.jpg",
      description: "<b>那些永不凋零的记忆</b>",
    }
  ];

  constructor(public navCtrl: NavController, public http:Http){

  }

  navToPublish(){
    this.navCtrl.push(PublishPage);
  }

}
