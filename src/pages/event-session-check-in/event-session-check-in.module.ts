import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventSessionCheckInPage } from './event-session-check-in';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    EventSessionCheckInPage,
  ],
  imports: [
    IonicPageModule.forChild(EventSessionCheckInPage),
      PipesModule
  ],
})
export class EventSessionCheckInPageModule {}
