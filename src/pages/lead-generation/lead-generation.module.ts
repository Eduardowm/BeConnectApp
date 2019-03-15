import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeadGenerationPage } from './lead-generation';

@NgModule({
  declarations: [
    LeadGenerationPage,
  ],
  imports: [
    IonicPageModule.forChild(LeadGenerationPage),
  ],
})
export class LeadGenerationPageModule {}
