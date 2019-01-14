import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-event-check-in',
    templateUrl: 'event-check-in.html',
})
export class EventCheckInPage {
    event: any = null;

    constructor(public navCtrl: NavController,
                public navParams: NavParams) {
        this.event = navParams.get('event');
    }

    start() {
        this.navCtrl.push('EventMassCheckinPage', {event: this.event})
    }
}
