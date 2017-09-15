import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublishMuseumPage } from './publish-museum';

@NgModule({
  declarations: [
    PublishMuseumPage,
  ],
  imports: [
    IonicPageModule.forChild(PublishMuseumPage),
  ],
})
export class PublishMuseumPageModule {}
