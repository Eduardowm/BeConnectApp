import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventLeadReportPage } from './event-lead-report';

@NgModule({
  declarations: [
    EventLeadReportPage,
  ],
  imports: [
    IonicPageModule.forChild(EventLeadReportPage),
  ],
})
export class EventLeadReportPageModule {}
