import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NativeStorage} from "@ionic-native/native-storage";

import * as firebase from 'firebase';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
    settings: any = {
        notification: {
            event_update: true,
            event_activity: false,
        },
        profile_visibility: {
            others_attendees_can_see_me: false
        }
    };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private nativeStorage: NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

    exitApp() {
        firebase.auth().signOut();
        this.nativeStorage.remove('login');
        this.nativeStorage.remove('church');
        this.nativeStorage.remove('password');
        //this.platform.exitApp();
        this.navCtrl.setRoot("LogarPage");
        this.navCtrl.popToRoot();
    }
}
