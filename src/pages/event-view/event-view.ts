import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {User} from "../../providers/user/user";
import {LaunchNavigator} from "@ionic-native/launch-navigator";
import {Events} from "../../providers/events/events";

/**
 * Generated class for the EventViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-event-view',
    templateUrl: 'event-view.html',
})
export class EventViewPage {
    event: any = null;
    event_location: string = '';

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public user: User,
                private launchNavigator: LaunchNavigator,
                public events: Events,
                public loadingCtrl: LoadingController) {
        let ev = navParams.get('event');
        this.loadEvent(ev.id);
    }

    loadEvent(id) {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.events.getInfo(id)
            .then((result: any) => {
                loading.dismiss();
                this.event_location = encodeURI(result.event.street + "," + result.event.number + "," + result.event.city);
                result.event.imgEvent_bg = encodeURI('http://www.beconnect.com.br/' + result.event.imgEvent_bg);

                this.event = result.event;
            })
            .catch((error: any) => {
                loading.dismiss();
                console.log("Error", error);
            });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EventViewPage');
    }

    sendAnnouncement() {
        this.navCtrl.push('EventSendAnnouncementPage', {event: this.event});
    }

    checkinAttendees() {
        this.navCtrl.push('EventCheckInPage', {event: this.event});
    }

    checkinSessions() {
        this.navCtrl.push('EventSessionCheckInPage', {event: this.event});
    }

    appAccessRequests() {
        this.navCtrl.push('AppAccessRequestsPage', {event: this.event});
    }

    appDownloadStats() {
        this.navCtrl.push('AppDownloadStatsPage', {event: this.event});
    }

    leadsReport() {
        this.navCtrl.push('EventLeadReportPage', {event: this.event});
    }

    documents() {
        this.navCtrl.push('DocumentsPage', {event: this.event});
    }

    exhibitors() {
        this.navCtrl.push('ExhibitorsPage', {event: this.event});
    }

    polls() {
        this.navCtrl.push('PollListPage', {event: this.event});
    }

    sponsors() {
        this.navCtrl.push('SponsorsPage', {event: this.event});
    }

    surveys() {
        this.navCtrl.push('SurveyListPage', {event: this.event});
    }

    addLeadManually() {
        this.navCtrl.push('AddLeadManuallyPage', {event: this.event});
    }

    logistics() {
        this.navCtrl.push('LogisticsPage', {event: this.event});
    }

    photos() {
        this.navCtrl.push('PhotosPage', {event: this.event});
    }

    twitter() {
        // todo
    }

    changeEvent() {
        this.navCtrl.push('MyEventsPage');
    }

    openNavigator() {
        this.launchNavigator.navigate([this.event.lat, this.event.lng]);
    }
}
