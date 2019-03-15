import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

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
    event: any;
    event_location: string = '';

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.event = navParams.get('event');
        if (this.event) {
            this.event_location = encodeURI(this.event.street + "," + this.event.number + "," + this.event.city);
        }
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
}
