import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventMessageCreatePage } from './event-message-create';

@NgModule({
  declarations: [
    EventMessageCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(EventMessageCreatePage),
  ],
})
export class EventMessageCreatePageModule {}
