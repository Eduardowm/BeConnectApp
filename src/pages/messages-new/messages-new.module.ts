import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagesNewPage } from './messages-new';

@NgModule({
  declarations: [
    MessagesNewPage,
  ],
  imports: [
    IonicPageModule.forChild(MessagesNewPage),
  ],
})
export class MessagesNewPageModule {}
