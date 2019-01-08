import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductAttrPage } from './product-attr';

@NgModule({
  declarations: [
    ProductAttrPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductAttrPage),
  ],
  entryComponents: [
    ProductAttrPage,
  ]
})
export class ProductAttrPageModule {}
