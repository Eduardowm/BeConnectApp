import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventAnnouncementReviewPage } from './event-announcement-review';

@NgModule({
  declarations: [
    EventAnnouncementReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(EventAnnouncementReviewPage),
  ],
})
export class EventAnnouncementReviewPageModule {}
