import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ModalEventViewPage} from './modal-event-view';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
    declarations: [
        ModalEventViewPage,
    ],
    imports: [
        IonicPageModule.forChild(ModalEventViewPage),
        PipesModule
    ],
})
export class ModalEventViewPageModule {
}
