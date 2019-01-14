import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-event-send-announcement',
    templateUrl: 'event-send-announcement.html',
})
export class EventSendAnnouncementPage {
    recipients: any = [
        {id: 1, name: 'Palestrantes', count: 18, checked: false},
        {id: 2, name: 'Membros', count: 1, checked: false},
        {id: 3, name: 'Patrocinadores', count: 7, checked: false},
        {id: 4, name: 'Todos', count: 392, checked: false},
    ];

    message: any = {title: '', content: ''};

    constructor(public navCtrl: NavController,
                public navParams: NavParams) {
    }
}
