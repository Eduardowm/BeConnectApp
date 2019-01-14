import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAddSchoolPage } from './modal-add-school';

@NgModule({
  declarations: [
    ModalAddSchoolPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAddSchoolPage),
  ],
})
export class ModalAddSchoolPageModule {}
