import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MyEventsPage} from './my-events';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
    declarations: [
        MyEventsPage,
    ],
    imports: [
        IonicPageModule.forChild(MyEventsPage),
        PipesModule
    ],
})
export class MyEventsPageModule {
}
