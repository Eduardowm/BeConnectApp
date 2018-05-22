import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GroupViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-view',
  templateUrl: 'group-view.html',
})
export class GroupViewPage {
  group: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.group = navParams.get('group');
      console.log(this.group);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupViewPage');
  }

}
