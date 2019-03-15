import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the ExhibitorViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-exhibitor-view',
    templateUrl: 'exhibitor-view.html',
})
export class ExhibitorViewPage {
    exhibitor: any = null;
    message: any = {content: ''};

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.exhibitor = this.navParams.get('exhibitor');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ExhibitorViewPage');
    }

}
