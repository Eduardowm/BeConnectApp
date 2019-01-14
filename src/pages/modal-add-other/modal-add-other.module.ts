import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAddOtherPage } from './modal-add-other';

@NgModule({
  declarations: [
    ModalAddOtherPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAddOtherPage),
  ],
})
export class ModalAddOtherPageModule {}
