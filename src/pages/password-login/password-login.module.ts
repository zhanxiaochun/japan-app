import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordLoginPage } from './password-login';

@NgModule({
  declarations: [
    PasswordLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordLoginPage),
  ],
})
export class PasswordLoginPageModule {}
