import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the ModalSessionViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-modal-session-view',
    templateUrl: 'modal-session-view.html',
})
export class ModalSessionViewPage {
    session: any = {};

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.session = this.navParams.get('session');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ModalSessionViewPage');
    }

}
