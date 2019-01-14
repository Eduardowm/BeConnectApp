import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EventMessageViewPage} from './event-message-view';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
    declarations: [
        EventMessageViewPage,
    ],
    imports: [
        IonicPageModule.forChild(EventMessageViewPage),
        PipesModule
    ],
})
export class EventMessageViewPageModule {
}
