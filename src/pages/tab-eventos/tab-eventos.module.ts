import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabEventosPage } from './tab-eventos';

@NgModule({
  declarations: [
    TabEventosPage,
  ],
  imports: [
    IonicPageModule.forChild(TabEventosPage),
  ],
})
export class TabEventosPageModule {}
