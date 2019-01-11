import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ComponentsModule } from '../components/components.module';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


// import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
// import { HomePage } from '../pages/home/home';
// import { TabsPage } from '../pages/tabs/tabs';
// import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { AppService } from './app.service';
// import { AppMember } from './app.member';
import { ListPageModule } from '../pages/list/list.module';
import { ProductDetailPageModule } from '../pages/product-detail/product-detail.module';
import { ProductListPageModule } from '../pages/product-list/product-list.module';
import { ProductAttrPageModule } from '../pages/product-attr/product-attr.module';
import { LoginPageModule } from '../pages/login/login.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { SetupPageModule } from '../pages/setup/setup.module';
import { MemberPageModule } from '../pages/member/member.module';
import { MemberNicknamePageModule } from '../pages/member-nickname/member-nickname.module';
import { PasswordLoginPageModule } from '../pages/password-login/password-login.module';
import { PasswordPayPageModule } from '../pages/password-pay/password-pay.module';
import { MemberAddressPageModule } from '../pages/member-address/member-address.module';
import { MemberAddressaddPageModule } from '../pages/member-addressadd/member-addressadd.module';
import { ProductCartPageModule } from '../pages/product-cart/product-cart.module';
import { ProductCart2orderPageModule } from '../pages/product-cart2order/product-cart2order.module';
import { MemberAddresscheckPageModule } from '../pages/member-addresscheck/member-addresscheck.module';
import { PaysuccessPageModule } from '../pages/paysuccess/paysuccess.module';
import { OrderListPageModule } from '../pages/order-list/order-list.module';
import { OrderCommentlistPageModule } from '../pages/order-commentlist/order-commentlist.module';
import { OrderCommentwritePageModule } from '../pages/order-commentwrite/order-commentwrite.module';
import { NationTransportPageModule } from '../pages/nation-transport/nation-transport.module';
import { OrderTranslistPageModule } from '../pages/order-translist/order-translist.module';
import { PurchasePageModule } from '../pages/purchase/purchase.module';
import { OrderPurchasePageModule } from '../pages/order-purchase/order-purchase.module';
import { HelpcenterPageModule } from '../pages/helpcenter/helpcenter.module';
import { HelpcenterDetailPageModule } from '../pages/helpcenter-detail/helpcenter-detail.module';
import { ProductPurchasePageModule } from '../pages/product-purchase/product-purchase.module';
import { ProductPurchase2orderPageModule } from '../pages/product-purchase2order/product-purchase2order.module';
import { ProductSearchPageModule } from '../pages/product-search/product-search.module';
import { RechargePageModule } from '../pages/recharge/recharge.module';
import { WithdrawPageModule } from '../pages/withdraw/withdraw.module';

@NgModule({
  declarations: [
    MyApp,
    // AboutPage,
    // ContactPage,
    // HomePage,
    // TabsPage,
    // ListPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ComponentsModule,
    ListPageModule,
    ProductDetailPageModule,
    ProductListPageModule,
    ProductAttrPageModule,
    LoginPageModule,
    RegisterPageModule,
    SetupPageModule,
    MemberPageModule,
    MemberNicknamePageModule,
    PasswordLoginPageModule,
    PasswordPayPageModule,
    MemberAddressPageModule,
    MemberAddressaddPageModule,
    ProductCartPageModule,
    ProductCart2orderPageModule,
    MemberAddresscheckPageModule,
    PaysuccessPageModule,
    OrderListPageModule,
    OrderCommentlistPageModule,
    OrderCommentwritePageModule,
    NationTransportPageModule,
    OrderTranslistPageModule,
    PurchasePageModule,
    OrderPurchasePageModule,
    HelpcenterPageModule,
    HelpcenterDetailPageModule,
    ProductPurchasePageModule,
    ProductPurchase2orderPageModule,
    ProductSearchPageModule,
    RechargePageModule,
    WithdrawPageModule,
    // IonicModule.forRoot(MyApp), // 隐藏子页面tabs
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true',
      backButtonText: '',
      iconModul: 'ios',
      mode: 'ios',
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // AboutPage,
    // ContactPage,
    // HomePage,
    // TabsPage,
    // ListPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppService,
    Camera,
    ImagePicker,
    FileTransfer,
    File,
    // AppMember,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
