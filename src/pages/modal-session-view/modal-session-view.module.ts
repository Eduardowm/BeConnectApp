import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ModalSessionViewPage} from './modal-session-view';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
    declarations: [
        ModalSessionViewPage,
    ],
    imports: [
        IonicPageModule.forChild(ModalSessionViewPage),
        PipesModule
    ],
})
export class ModalSessionViewPageModule {
}
