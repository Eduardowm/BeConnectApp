import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Events} from "../../providers/events/events";

/**
 * Generated class for the MyEventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-my-events',
    templateUrl: 'my-events.html',
})
export class MyEventsPage {
    events: any = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public eventsApi: Events,
                public loadingCtrl: LoadingController) {
        this.load();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyEventsPage');
    }

    findEvent() {
        this.navCtrl.push('FindEventPage');
    }

    load() {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.events = [];

        this.eventsApi.personSubs()
            .then((result: any) => {
                //    {"status":true,"events":[{"event_id":1,"church_id":1},{"event_id":2,"church_id":1}]}

                if (result.status) {
                    this.events = result.events;

                    // for (let item of result.events) {
                    //     this.eventsApi.getInfo(item.event_id)
                    //         .then((result: any) => {
                    //             this.events.push(result);
                    //         });
                    // }
                }

                loading.dismiss();
            })
            .catch((error: any) => {
                loading.dismiss();
                console.log("Error", error);
            });
    }

    openEvent(event) {
        this.navCtrl.push('EventTabsPage', {event});
    }
}
