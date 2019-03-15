import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PollDetailPage } from './poll-detail';

@NgModule({
  declarations: [
    PollDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PollDetailPage),
  ],
})
export class PollDetailPageModule {}
