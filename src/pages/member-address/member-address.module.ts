import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberAddressPage } from './member-address';

@NgModule({
  declarations: [
    MemberAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberAddressPage),
  ],
})
export class MemberAddressPageModule {}
