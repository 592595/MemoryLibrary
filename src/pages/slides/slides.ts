import { Component } from '@angular/core';
import { TabsPage } from "../tabs/tabs";
import { NavController} from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { UserServiceProvider } from "../../providers/user-service/user-service";

@Component({
  templateUrl: 'slides.html'
})
export class SlidesPage {
  slides = [
    {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/img/ica-slidebox-img-3.png",
    }
  ];
  constructor(public navCtrl: NavController,public storage: Storage, public UserServiceProvider:UserServiceProvider) {

  }
  testNewPage(){
    console.log('点我了');
    this.storage.set('opened',true);
    this.navCtrl.push(TabsPage,{
      item1:'ios-newPage'
    });
  }
}
