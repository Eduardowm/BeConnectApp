import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UseForMyEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-use-for-my-event',
  templateUrl: 'use-for-my-event.html',
})
export class UseForMyEventPage {
  data: any = {
      name: '',
      interest: '',
      participants: '',
      held: '',
      phone: '',
      message: '',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UseForMyEventPage');
  }

}
