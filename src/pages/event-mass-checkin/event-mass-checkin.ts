import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventMassCheckinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-mass-checkin',
  templateUrl: 'event-mass-checkin.html',
})
export class EventMassCheckinPage {
    churchSearch: any;
    churchSearchShouldShowCancel: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventMassCheckinPage');
  }

}
