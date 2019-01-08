import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordPayPage } from './password-pay';

@NgModule({
  declarations: [
    PasswordPayPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordPayPage),
  ],
})
export class PasswordPayPageModule {}
