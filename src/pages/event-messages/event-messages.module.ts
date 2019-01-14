import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EventMessagesPage} from './event-messages';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
    declarations: [
        EventMessagesPage,
    ],
    imports: [
        IonicPageModule.forChild(EventMessagesPage),
        PipesModule
    ],
})
export class EventMessagesPageModule {
}
