import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../providers/user/user";

/**
 * Generated class for the ContactInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-info',
  templateUrl: 'contact-info.html',
})
export class ContactInfoPage {
  data: any = {
      phone: '',
      email: '',
      address: '',
      whatsapp: '',
      skype: ''
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public user: User) {
      this.buildAddress();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactInfoPage');
  }

    buildAddress() {
      this.data.address = this.user.getUserInfo().neighborhood + ", " + this.user.getUserInfo().number + " - " + this.user.getUserInfo().city + " / " + this.user.getUserInfo().state
    }
}
