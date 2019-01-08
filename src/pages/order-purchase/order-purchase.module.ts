import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderPurchasePage } from './order-purchase';

@NgModule({
  declarations: [
    OrderPurchasePage,
  ],
  imports: [
    IonicPageModule.forChild(OrderPurchasePage),
  ],
})
export class OrderPurchasePageModule {}
