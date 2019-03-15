import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the AddLeadManuallyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-add-lead-manually',
    templateUrl: 'add-lead-manually.html',
})
export class AddLeadManuallyPage {
    data: any = {
        name: '',
        email: '',
        phone: '',
        company: '',
        title: '',
        note: '',
    };

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddLeadManuallyPage');
    }

}
