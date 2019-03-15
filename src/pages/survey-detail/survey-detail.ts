import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SurveyDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-survey-detail',
  templateUrl: 'survey-detail.html',
})
export class SurveyDetailPage {
  survey: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.survey = this.navParams.get('survey');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyDetailPage');
  }

}
