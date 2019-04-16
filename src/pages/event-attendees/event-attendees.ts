import {Component} from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {Events} from "../../providers/events/events";

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
    event: any = null;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public modalCtrl: ModalController,
                public eventsApi: Events,
                public loadingCtrl: LoadingController,) {
        this.event = this.navParams.get('event');
        this.load();
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

    load() {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.participants = [];
        this.eventsApi.getSubList(this.event.id)
            .then((result: any) => {
                if (result.status) {
                    for (let person of result.people) {
                        if (!person.imgProfile.startsWith('http')) {
                            person.imgProfile = 'https://beconnect.com.br/' + person.imgProfile;
                        }

                        this.participants.push(person);
                    }
                }

                loading.dismiss();
            })
            .catch((error: any) => {
                loading.dismiss();
                console.log("Error", error);
            });
    }
}
