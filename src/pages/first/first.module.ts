import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { FirstPage } from './first';

@NgModule({
    declarations: [
        FirstPage,
    ],
    imports: [
        IonicPageModule.forChild(FirstPage),
        TranslateModule.forChild()
    ],
    exports: [
        FirstPage
    ]
})
export class FirstPageModule { }
