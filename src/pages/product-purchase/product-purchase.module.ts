import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductPurchasePage } from './product-purchase';

@NgModule({
  declarations: [
    ProductPurchasePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductPurchasePage),
  ],
})
export class ProductPurchasePageModule {}
