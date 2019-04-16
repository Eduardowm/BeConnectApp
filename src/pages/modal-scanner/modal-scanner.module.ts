import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalScannerPage } from './modal-scanner';

@NgModule({
  declarations: [
    ModalScannerPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalScannerPage),
  ],
})
export class ModalScannerPageModule {}
