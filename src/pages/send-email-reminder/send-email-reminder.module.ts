import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendEmailReminderPage } from './send-email-reminder';

@NgModule({
  declarations: [
    SendEmailReminderPage,
  ],
  imports: [
    IonicPageModule.forChild(SendEmailReminderPage),
  ],
})
export class SendEmailReminderPageModule {}
