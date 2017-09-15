import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublishPage } from './publish';
import { Camera } from "@ionic-native/camera";
import { FileTransfer,FileTransferObject } from "@ionic-native/file-transfer";

@NgModule({
  declarations: [
    PublishPage,
  ],
  imports: [
    IonicPageModule.forChild(PublishPage),
  ],
  providers:[
    Camera,
    FileTransferObject,
    FileTransfer
  ]
})
export class PublishPageModule {}
