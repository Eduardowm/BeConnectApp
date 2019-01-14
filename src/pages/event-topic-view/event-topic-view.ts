import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-event-topic-view',
    templateUrl: 'event-topic-view.html',
})
export class EventTopicViewPage {
    topic: any = {
        icon: 'megaphone',
        title: 'Organizer Announcement',
        date: '2018-22-06 00:00:00',
        sub_title: 'Please submit the survey',
        description: 'Please take one minute to submit your survey when you have time after lunch. You can find the icon on the app.',
        messages_count: 5
    };

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.topic = this.navParams.get('topic');
    }

}
