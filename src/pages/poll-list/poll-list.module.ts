import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PollListPage } from './poll-list';

@NgModule({
  declarations: [
    PollListPage,
  ],
  imports: [
    IonicPageModule.forChild(PollListPage),
  ],
})
export class PollListPageModule {}
