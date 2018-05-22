import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabFeedNoticiasPage } from './tab-feed-noticias';

@NgModule({
  declarations: [
    TabFeedNoticiasPage,
  ],
  imports: [
    IonicPageModule.forChild(TabFeedNoticiasPage),
  ],
})
export class TabFeedNoticiasPageModule {}
