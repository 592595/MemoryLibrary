import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingPage } from './setting';
import {UserServiceProvider} from "../../providers/user-service/user-service";

@NgModule({
  declarations: [
    SettingPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingPage),
  ],
  providers:[
    UserServiceProvider
  ]
})
export class SettingPageModule {}
