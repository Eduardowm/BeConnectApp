import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {FindEventPage} from './find-event';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
    declarations: [
        FindEventPage,
    ],
    imports: [
        IonicPageModule.forChild(FindEventPage),
        PipesModule
    ],
})
export class FindEventPageModule {
}
