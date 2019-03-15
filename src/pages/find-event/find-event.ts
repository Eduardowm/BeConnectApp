import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Events} from "../../providers/events/events";

/**
 * Generated class for the FindEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-find-event',
    templateUrl: 'find-event.html',
})
export class FindEventPage {
    tab: any = 'Coming Soon';
    comingSoonEvents: any = [];
    allUpcomingEvents: any = [];
    pastEvents: any = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public events: Events,
                public loadingCtrl: LoadingController) {
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FindEventPage');
    }

    openEvent(event) {
        this.navCtrl.push('EventTabsPage', {event});
    }

    load() {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.events.nextWeek()
            .then((result: any) => {
                this.comingSoonEvents = result;
            })
            .catch((error: any) => {
                loading.dismiss();
                console.log("Error", error);
            });

        this.events.next()
            .then((result: any) => {
                loading.dismiss();
                this.allUpcomingEvents = result;
            })
            .catch((error: any) => {
                loading.dismiss();
                console.log("Error", error);
            });

        this.events.past()
            .then((result: any) => {
                loading.dismiss();
                this.pastEvents = result;
            })
            .catch((error: any) => {
                loading.dismiss();
                console.log("Error", error);
            });
    }
}
