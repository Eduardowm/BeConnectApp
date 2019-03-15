import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the PollDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-poll-detail',
    templateUrl: 'poll-detail.html',
})
export class PollDetailPage {
    poll: any = null;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.poll = this.navParams.get('poll');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PollDetailPage');
    }

}
