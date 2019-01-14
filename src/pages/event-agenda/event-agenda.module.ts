import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EventAgendaPage} from './event-agenda';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
    declarations: [
        EventAgendaPage,
    ],
    imports: [
        IonicPageModule.forChild(EventAgendaPage),
        PipesModule
    ],
})
export class EventAgendaPageModule {
}
