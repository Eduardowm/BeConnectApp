import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContestDetailsPage } from './contest-details';

@NgModule({
  declarations: [
    ContestDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContestDetailsPage),
  ],
})
export class ContestDetailsPageModule {}
