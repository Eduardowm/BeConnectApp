import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-event-session-check-in',
    templateUrl: 'event-session-check-in.html',
})
export class EventSessionCheckInPage {
    tracks: any;
    searchVisible: boolean = false;
    days: any = [
        {weekDay: 'Sex', monthDay: 6},
        {weekDay: 'Sáb', monthDay: 7},
        {weekDay: 'Dom', monthDay: 8},
        {weekDay: 'Seg', monthDay: 9},
        {weekDay: 'Ter', monthDay: 10},
        {weekDay: 'Qua', monthDay: 11},
        {weekDay: 'Qui', monthDay: 12},
    ];
    selectedDay: any = null;
    sessions: any = [
        {
            id: 68,
            start_date: Date.now(),
            end_date: Date.now(),
            name: 'Breakfast',
            location: 'Coral Lounge',
            people_confirmed_count: 107,
            likes_count: 25,
            comments_count: 17,
            track_class: 'blue-circle',
            description: 'Esta é uma seção de lanche!'
        },
        {
            id: 68,
            start_date: Date.now(),
            end_date: Date.now(),
            name: 'Welcome by general and program chairs',
            location: 'South Pacific Ballroom',
            people_confirmed_count: 111,
            likes_count: 25,
            comments_count: 17,
            track_class: 'blue-circle',
            description: 'Esta é uma seção de lanche!'
        },
        {
            id: 68,
            start_date: Date.now(),
            end_date: Date.now(),
            name: 'Keynote',
            location: null,
            people_confirmed_count: 55,
            likes_count: 17,
            comments_count: 9,
            track_class: 'purple-circle',
            description: 'Esta é uma seção de lanche!'
        },
    ];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public modalCtrl: ModalController) {
        this.selectedDay = this.days[0];
    }

    toggleSearchbar() {
        this.searchVisible = !this.searchVisible;
    }

    onSearchInput($event) {
    }

    onSearchCancel($event) {
    }

    openSessionMassCheckin(session) {
        this.navCtrl.push('EventMassCheckinPage', {session});
    }
}
