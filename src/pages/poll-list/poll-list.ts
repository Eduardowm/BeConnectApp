import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the PollListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-poll-list',
    templateUrl: 'poll-list.html',
})
export class PollListPage {
    openPolls: any = [
        {
            name: 'Lorem Ipsum', closed: false, vote_count: 50, options: [
            {name: 'A', vote_count: 20, vote_percent: 50, id: 1},
            {name: 'A', vote_count: 20, vote_percent: 50, id: 1},
            {name: 'A', vote_count: 20, vote_percent: 50, id: 1},
        ]
        },
        {
            name: 'Lorem Ipsum', closed: false, vote_count: 50, options: [
            {name: 'A', vote_count: 20, vote_percent: 50, id: 1},
            {name: 'A', vote_count: 20, vote_percent: 50, id: 1},
            {name: 'A', vote_count: 20, vote_percent: 50, id: 1},
        ]
        },
        {
            name: 'Lorem Ipsum', closed: false, vote_count: 50, options: [
            {name: 'A', vote_count: 20, vote_percent: 50, id: 1},
            {name: 'A', vote_count: 20, vote_percent: 50, id: 1},
            {name: 'A', vote_count: 20, vote_percent: 50, id: 1},
        ]
        },
    ];

    closedPolls: any = [
        {
            name: 'Lorem Ipsum', closed: true, vote_count: 50, options: [
            {name: 'A', vote_count: 20, vote_percent: 50, id: 1},
            {name: 'A', vote_count: 20, vote_percent: 50, id: 1},
            {name: 'A', vote_count: 20, vote_percent: 50, id: 1},
        ]
        },
        {
            name: 'Lorem Ipsum', closed: true, vote_count: 50, options: [
            {name: 'A', vote_count: 20, vote_percent: 50, id: 1},
            {name: 'A', vote_count: 20, vote_percent: 50, id: 1},
            {name: 'A', vote_count: 20, vote_percent: 50, id: 1},
        ]
        },
        {
            name: 'Lorem Ipsum', closed: true, vote_count: 50, options: [
            {name: 'A', vote_count: 20, vote_percent: 50, id: 1},
            {name: 'A', vote_count: 20, vote_percent: 50, id: 1},
            {name: 'A', vote_count: 20, vote_percent: 50, id: 1},
        ]
        },
    ];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PollListPage');
    }

    openPoll(poll) {
        this.navCtrl.push('PollDetailPage', {poll});
    }

}
