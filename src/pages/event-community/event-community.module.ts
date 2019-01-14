import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EventCommunityPage} from './event-community';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
    declarations: [
        EventCommunityPage,
    ],
    imports: [
        IonicPageModule.forChild(EventCommunityPage),
        PipesModule
    ],
})
export class EventCommunityPageModule {
}
