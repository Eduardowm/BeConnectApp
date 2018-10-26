import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {
    tab1Root: any = 'HomePage';
    tab2Root: any = 'CalendarPage';
    tab3Root: any = 'EventsPage';

    tab1Title = 'Início';
    tab2Title = 'Calendário';
    tab3Title = 'Eventos';

    constructor(public navCtrl: NavController, public translateService: TranslateService) {
    }
}
