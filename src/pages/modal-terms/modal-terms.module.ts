import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ModalTermsPage} from './modal-terms';

@NgModule({
    declarations: [
        ModalTermsPage,
    ],
    imports: [
        IonicPageModule.forChild(ModalTermsPage),
    ],
    exports: [
        ModalTermsPage,
    ]
})
export class ModalTermsPageModule {
}
