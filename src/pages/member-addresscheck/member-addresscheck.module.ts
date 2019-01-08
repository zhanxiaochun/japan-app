import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberAddresscheckPage } from './member-addresscheck';

@NgModule({
  declarations: [
    MemberAddresscheckPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberAddresscheckPage),
  ],
})
export class MemberAddresscheckPageModule {}
