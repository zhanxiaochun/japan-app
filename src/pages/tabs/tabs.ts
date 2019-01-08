import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'ListPage';
  tab3Root = 'AboutPage';
  tab4Root = 'ContactPage';

  constructor() {

  }
}
