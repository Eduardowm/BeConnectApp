import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalJoinEventPage } from './modal-join-event';

@NgModule({
  declarations: [
    ModalJoinEventPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalJoinEventPage),
  ],
})
export class ModalJoinEventPageModule {}
