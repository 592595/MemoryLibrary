import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Headers, Http } from "@angular/http";
import {visitValue} from "@angular/compiler/src/util";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userEmail:'';
  userPwd:'';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController) {

  }

  loginAlert(mTitle,mSubTitle){
    let alert = this.alertCtrl.create({
      title: mTitle,
      subTitle: mSubTitle,
      buttons: ['确认']
    });
    alert.present();
  }
  login(){
    if(!this.userEmail || !this.userPwd){
      let mTitle="信息不完整";
      let mSubTitle="兄弟，你是认真的吗？";
      this.loginAlert(mTitle,mSubTitle);
    }
    else{
      let url = '';
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-unlocked');
      this.http.post(url, "username=" + this.userEmail + "&password=" + this.userPwd, {
        headers:headers
      }).subscribe((res)=>{
        if(res.json().status==true){
          this.navCtrl.pop();
        }
        else{
          let mTitle=res.json().msg;
          let mSubTitle="再输入一次试试~~~";
          this.loginAlert(mTitle,mSubTitle);
        }
      });
    }
  }

  getVcode(){
    let url = '';
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-unlocked');
    this.http.post(url, "mailTo="+ this.userEmail, {
      headers:headers
    }).subscribe((res)=>{
      res.json();
    });
  }

}
