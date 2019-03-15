import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the ExhibitorsGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-exhibitors-group',
    templateUrl: 'exhibitors-group.html',
})
export class ExhibitorsGroupPage {
    exhibitorsGroup: any = null;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.exhibitorsGroup = navParams.get('exhibitorsGroup');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ExhibitorsGroupPage');
    }

    onSearchInput($event) {
    }

    onSearchCancel($event) {
    }

    openExhibitor(exhibitor) {
        console.log(exhibitor);
        this.navCtrl.push('ExhibitorViewPage', {exhibitor});
    }
}
