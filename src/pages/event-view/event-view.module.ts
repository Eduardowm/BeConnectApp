import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EventViewPage} from './event-view';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
    declarations: [
        EventViewPage,
    ],
    imports: [
        IonicPageModule.forChild(EventViewPage),
        PipesModule
    ],
})
export class EventViewPageModule {
}
