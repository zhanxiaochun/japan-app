import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberNicknamePage } from './member-nickname';

@NgModule({
  declarations: [
    MemberNicknamePage,
  ],
  imports: [
    IonicPageModule.forChild(MemberNicknamePage),
  ],
})
export class MemberNicknamePageModule {}
