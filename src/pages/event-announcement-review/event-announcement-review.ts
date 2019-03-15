import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-event-announcement-review',
    templateUrl: 'event-announcement-review.html',
})
export class EventAnnouncementReviewPage {
    data: any = {
        event_name: 'Lorem Ipsum',
        recipients: '',
        title: '',
        content: '',
        send_option: '',
    };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtrl: ViewController) {
        this.data = navParams.get('data');
    }

    send() {
        this.viewCtrl.dismiss();
    }
}
