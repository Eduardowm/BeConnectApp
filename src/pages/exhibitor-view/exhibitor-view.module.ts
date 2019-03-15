import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExhibitorViewPage } from './exhibitor-view';

@NgModule({
  declarations: [
    ExhibitorViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ExhibitorViewPage),
  ],
})
export class ExhibitorViewPageModule {}
