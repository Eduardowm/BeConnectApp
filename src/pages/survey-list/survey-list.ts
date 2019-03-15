import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the SurveyListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-survey-list',
    templateUrl: 'survey-list.html',
})
export class SurveyListPage {
    surveys: any = [
        {
            name: 'Lorem Ipsum', options:
            [
                {
                    name: 'A',
                    value: '0',
                    items:
                        [
                            {name: 'X', id: 'X'},
                            {name: 'Y', id: 'Y'},
                            {name: 'Z', id: 'Z'},
                        ]
                },
                {
                    name: 'A',
                    value: '0',
                    items:
                        [
                            {name: 'X', id: 'X'},
                            {name: 'Y', id: 'Y'},
                            {name: 'Z', id: 'Z'},
                        ]
                },
                {
                    name: 'A',
                    value: '0',
                    items:
                        [
                            {name: 'X', id: 'X'},
                            {name: 'Y', id: 'Y'},
                            {name: 'Z', id: 'Z'},
                        ]
                },
            ]
        }
    ];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SurveyListPage');
    }

    openSurvey(survey) {
        this.navCtrl.push('SurveyDetailPage', {survey});
    }

}
