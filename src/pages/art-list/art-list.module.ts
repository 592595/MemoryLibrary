import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArtListPage } from './art-list';

@NgModule({
  declarations: [
    ArtListPage,
  ],
  imports: [
    IonicPageModule.forChild(ArtListPage),
  ],
})
export class ArtListPageModule {}
