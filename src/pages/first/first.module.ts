import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import {BrMaskerModule} from "brmasker-ionic-3";

import { FirstPage } from './first';

@NgModule({
    declarations: [
        FirstPage,
    ],
    imports: [
        IonicPageModule.forChild(FirstPage),
        TranslateModule.forChild(),
        BrMaskerModule
    ],
    exports: [
        FirstPage
    ]
})
export class FirstPageModule { }
