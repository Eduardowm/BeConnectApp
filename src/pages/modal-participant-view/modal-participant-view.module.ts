import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalParticipantViewPage } from './modal-participant-view';

@NgModule({
  declarations: [
    ModalParticipantViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalParticipantViewPage),
  ],
})
export class ModalParticipantViewPageModule {}
