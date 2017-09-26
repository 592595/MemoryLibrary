import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoeticPage } from './poetic';

@NgModule({
  declarations: [
    PoeticPage,
  ],
  imports: [
    IonicPageModule.forChild(PoeticPage),
  ],
})
export class PoeticPageModule {}
