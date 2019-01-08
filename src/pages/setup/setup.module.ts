import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetupPage } from './setup';

@NgModule({
  declarations: [
    SetupPage,
  ],
  imports: [
    IonicPageModule.forChild(SetupPage),
  ],
  entryComponents: [
    SetupPage,
  ]
})
export class SetupPageModule {}
