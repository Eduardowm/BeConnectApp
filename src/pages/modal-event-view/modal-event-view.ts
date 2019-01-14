import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-modal-event-view',
    templateUrl: 'modal-event-view.html',
})
export class ModalEventViewPage {
    event: any = null;

    constructor(public navCtrl: NavController,
                public navParams: NavParams) {
        this.event = this.navParams.get('event');
    }

    join() {
        this.navCtrl.push('ModalJoinEventPage', {event});
    }
}
