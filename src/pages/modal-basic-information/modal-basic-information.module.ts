import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalBasicInformationPage } from './modal-basic-information';

@NgModule({
  declarations: [
    ModalBasicInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalBasicInformationPage),
  ],
})
export class ModalBasicInformationPageModule {}
