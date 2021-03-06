import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-notes',
    templateUrl: 'notes.html',
})
export class NotesPage {
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
