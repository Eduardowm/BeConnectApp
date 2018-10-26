import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-event-tabs',
    templateUrl: 'event-tabs.html'
})
export class EventTabsPage {
    tab1Root: any = 'EventViewPage';
    tab2Root: any = 'EventCalendarPage';
    tab3Root: any = 'EventsPage';
    tab4Root: any = 'EventsPage';
    tab5Root: any = 'EventsPage';

    tab1Title = 'Início';
    tab2Title = 'Agenda';
    tab3Title = 'Membros';
    tab4Title = 'Comunidade';
    tab5Title = 'Mensagens';

    event: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.event = this.navParams.get('event');
    }
}