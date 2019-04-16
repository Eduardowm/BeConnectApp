import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewMyQrCodePage } from './view-my-qr-code';

@NgModule({
  declarations: [
    ViewMyQrCodePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewMyQrCodePage),
  ],
})
export class ViewMyQrCodePageModule {}
