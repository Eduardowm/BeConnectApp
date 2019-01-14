import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the ModalParticipantViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-modal-participant-view',
    templateUrl: 'modal-participant-view.html',
})
export class ModalParticipantViewPage {
    participant: any = null;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.participant = this.navParams.get('participant');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ModalParticipantViewPage');
    }

}
