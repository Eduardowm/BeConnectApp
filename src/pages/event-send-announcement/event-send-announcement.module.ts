import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventSendAnnouncementPage } from './event-send-announcement';

@NgModule({
  declarations: [
    EventSendAnnouncementPage,
  ],
  imports: [
    IonicPageModule.forChild(EventSendAnnouncementPage),
  ],
})
export class EventSendAnnouncementPageModule {}
