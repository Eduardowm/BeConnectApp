import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventMassCheckinPage } from './event-mass-checkin';

@NgModule({
  declarations: [
    EventMassCheckinPage,
  ],
  imports: [
    IonicPageModule.forChild(EventMassCheckinPage),
  ],
})
export class EventMassCheckinPageModule {}
