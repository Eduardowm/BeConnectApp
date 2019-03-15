import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the SponsorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-sponsors',
    templateUrl: 'sponsors.html',
})
export class SponsorsPage {
    sponsors: any = [
        {name: 'Lorem Ipsum', image_url: 'assets/img/church1.png'},
        {name: 'Lorem Ipsum', image_url: 'assets/img/church1.png'},
        {name: 'Lorem Ipsum', image_url: 'assets/img/church1.png'}
    ];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SponsorsPage');
    }

    openSponsor(sponsor) {
    }
}
