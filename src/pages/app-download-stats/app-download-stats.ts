import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SocialSharing} from "@ionic-native/social-sharing";

/**
 * Generated class for the AppDownloadStatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-app-download-stats',
    templateUrl: 'app-download-stats.html',
})
export class AppDownloadStatsPage {
    data: any = {
        download_count: 292,
        download_percent: 92,
        download_average_percent: 0,
        categories: [
            {name: 'All Attendees', download_count: '292', count: '322', download_percent: '91'},
            {name: 'All Attendees', download_count: '292', count: '322', download_percent: '91'},
            {name: 'All Attendees', download_count: '292', count: '322', download_percent: '91'},
            {name: 'All Attendees', download_count: '292', count: '322', download_percent: '91'}
        ]
    };
    event: any = null;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private socialSharing: SocialSharing) {
        this.event = navParams.get('event');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AppDownloadStatsPage');
    }

    sendEmailReminder() {
        this.navCtrl.push('SendEmailReminderPage', {event: this.event});
    }

    shareOnSocialMedia() {
        this.socialSharing.shareWithOptions({
            message: "Olá, esta é uma mensagem para lhe lembrar de baixar o BeConnect, o aplicativo oficial do evento XYZ. Você pode acessar a agenda, se comunicar com os participantes e muito mais.",
            subject: "BeConnect"
        });
    }
}
