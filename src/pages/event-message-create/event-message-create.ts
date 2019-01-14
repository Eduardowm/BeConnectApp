import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-event-message-create',
  templateUrl: 'event-message-create.html',
})
export class EventMessageCreatePage {
  to: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
