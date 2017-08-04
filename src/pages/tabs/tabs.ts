import { Component } from '@angular/core';

import { SettingPage } from '../setting/setting';
import { ExplorePage } from '../explore/explore';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabRoots: Object[];

  constructor() {
    this.tabRoots=[
      {
        root: HomePage,
        tabTitle: 'Home',
        tabIcon: 'home'
      },
      {
        root: ExplorePage,
        tabTitle: 'Explore',
        tabIcon: 'notifications'
      },
      {
        root: SettingPage,
        tabTitle: 'Setting',
        tabIcon: 'document'
      }
    ];
  }
}
