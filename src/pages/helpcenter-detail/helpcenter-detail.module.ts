import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpcenterDetailPage } from './helpcenter-detail';

@NgModule({
  declarations: [
    HelpcenterDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HelpcenterDetailPage),
  ],
})
export class HelpcenterDetailPageModule {}
