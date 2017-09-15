import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingfilePage } from './settingfile';

@NgModule({
  declarations: [
    SettingfilePage,
  ],
  imports: [
    IonicPageModule.forChild(SettingfilePage),
  ],
})
export class SettingfilePageModule {}
