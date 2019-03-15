import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddLeadManuallyPage } from './add-lead-manually';

@NgModule({
  declarations: [
    AddLeadManuallyPage,
  ],
  imports: [
    IonicPageModule.forChild(AddLeadManuallyPage),
  ],
})
export class AddLeadManuallyPageModule {}
