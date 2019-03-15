import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

/**
 * Generated class for the EventLeadReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-event-lead-report',
    templateUrl: 'event-lead-report.html',
})
export class EventLeadReportPage {

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public toastCtrl: ToastController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EventLeadReportPage');
    }

    sendReminder() {
        this.toastCtrl.create({
            message: 'O seu lembrete foi enviado. Os expositores/patrocinadores vão receber uma notificação através do e-mail e da notificação do App.',
            duration: 8000,
            position: 'top'
        }).present();
        this.navCtrl.pop();
    }
}
