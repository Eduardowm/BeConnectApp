import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabCalendarioPage } from './tab-calendario';

@NgModule({
  declarations: [
    TabCalendarioPage,
  ],
  imports: [
    IonicPageModule.forChild(TabCalendarioPage),
  ],
})
export class TabCalendarioPageModule {}
