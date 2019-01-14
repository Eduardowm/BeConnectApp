import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-feedback',
    templateUrl: 'feedback.html',
})
export class FeedbackPage {
    data: any = {
        feedback: ''
    };

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }
}
