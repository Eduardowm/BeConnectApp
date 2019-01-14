import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAddBiographyPage } from './modal-add-biography';

@NgModule({
  declarations: [
    ModalAddBiographyPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAddBiographyPage),
  ],
})
export class ModalAddBiographyPageModule {}
