import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NationTransportPage } from './nation-transport';

@NgModule({
  declarations: [
    NationTransportPage,
  ],
  imports: [
    IonicPageModule.forChild(NationTransportPage),
  ],
})
export class NationTransportPageModule {}
