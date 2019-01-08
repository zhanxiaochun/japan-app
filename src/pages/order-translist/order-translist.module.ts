import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderTranslistPage } from './order-translist';

@NgModule({
  declarations: [
    OrderTranslistPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderTranslistPage),
  ],
})
export class OrderTranslistPageModule {}
