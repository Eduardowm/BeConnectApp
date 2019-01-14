import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventSessionCheckInModalPage } from './event-session-check-in-modal';

@NgModule({
  declarations: [
    EventSessionCheckInModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EventSessionCheckInModalPage),
  ],
})
export class EventSessionCheckInModalPageModule {}
