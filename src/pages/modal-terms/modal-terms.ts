import {Component} from '@angular/core';
import {IonicPage, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
    templateUrl: 'modal-terms.html',
})
export class ModalTermsPage {

    constructor(public viewCtrl: ViewController) {
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }
}
