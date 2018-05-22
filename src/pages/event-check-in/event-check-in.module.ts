import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventCheckInPage } from './event-check-in';

@NgModule({
  declarations: [
    EventCheckInPage,
  ],
  imports: [
    IonicPageModule.forChild(EventCheckInPage),
  ],
})
export class EventCheckInPageModule {}
