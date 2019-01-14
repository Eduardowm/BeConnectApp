import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAddPersonalPage } from './modal-add-personal';

@NgModule({
  declarations: [
    ModalAddPersonalPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAddPersonalPage),
  ],
})
export class ModalAddPersonalPageModule {}
