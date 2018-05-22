import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabMensagensPage } from './tab-mensagens';

@NgModule({
  declarations: [
    TabMensagensPage,
  ],
  imports: [
    IonicPageModule.forChild(TabMensagensPage),
  ],
})
export class TabMensagensPageModule {}
