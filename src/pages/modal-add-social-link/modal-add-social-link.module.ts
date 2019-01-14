import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAddSocialLinkPage } from './modal-add-social-link';

@NgModule({
  declarations: [
    ModalAddSocialLinkPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAddSocialLinkPage),
  ],
})
export class ModalAddSocialLinkPageModule {}
