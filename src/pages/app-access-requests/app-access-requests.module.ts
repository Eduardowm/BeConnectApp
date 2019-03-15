import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AppAccessRequestsPage} from './app-access-requests';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
    declarations: [
        AppAccessRequestsPage,
    ],
    imports: [
        IonicPageModule.forChild(AppAccessRequestsPage),
        PipesModule
    ],
})
export class AppAccessRequestsPageModule {
}
