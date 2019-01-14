import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventTopicViewPage } from './event-topic-view';

@NgModule({
  declarations: [
    EventTopicViewPage,
  ],
  imports: [
    IonicPageModule.forChild(EventTopicViewPage),
  ],
})
export class EventTopicViewPageModule {}
