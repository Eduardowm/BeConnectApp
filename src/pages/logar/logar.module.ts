import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { LogarPage } from './logar';

@NgModule({
    declarations: [
        LogarPage,
    ],
    imports: [
        IonicPageModule.forChild(LogarPage),
        TranslateModule.forChild()
    ],
    exports: [
        LogarPage
    ]
})
export class LogarPageModule { }
