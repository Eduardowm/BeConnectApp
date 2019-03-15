import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the EventAttendeesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-event-attendees',
    templateUrl: 'event-attendees.html',
})
export class EventAttendeesPage {
    participantsCount: number = 294;
    participants: any = [
        {picture_url: 'assets/img/user1.png', name: 'Ankit Agarwal', description: 'Software Engineering Inter', address: 'San Francisco Bay Area', badge: 'Graduate Students'},
        {picture_url: 'assets/img/user2.png', name: 'Prabhav Agrawal', description: 'Senior Undergraduate', address: 'New Delhi Area, India', badge: 'Graduate Students'},
        {picture_url: 'assets/img/user3.png', name: 'Sheeraz Ahmad', description: 'Summer Intern', address: 'La Jolla, California', badge: 'Faculty & Staff'},
    ];
    searchVisible: boolean = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public modalCtrl: ModalController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EventAttendeesPage');
    }

    toggleSearchbar() {
        this.searchVisible = !this.searchVisible;
    }

    onSearchInput($event) {
    }

    onSearchCancel($event) {
    }

    openParticipant(participant) {
        this.navCtrl.push("ModalParticipantViewPage", {participant});
    }
}
