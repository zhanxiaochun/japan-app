import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderCommentlistPage } from './order-commentlist';

@NgModule({
  declarations: [
    OrderCommentlistPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderCommentlistPage),
  ],
})
export class OrderCommentlistPageModule {}
