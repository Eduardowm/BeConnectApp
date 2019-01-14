import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAddAffiliationPage } from './modal-add-affiliation';

@NgModule({
  declarations: [
    ModalAddAffiliationPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAddAffiliationPage),
  ],
})
export class ModalAddAffiliationPageModule {}
