import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-contacts',
    templateUrl: 'contacts.html',
})
export class ContactsPage {
    searchVisible: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    toggleSearchbar() {
        this.searchVisible = !this.searchVisible;
    }

    onSearchInput($event) {
    }

    onSearchCancel($event) {
    }

}
