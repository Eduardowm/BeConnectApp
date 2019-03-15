import {Component} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the SendEmailReminderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-send-email-reminder',
    templateUrl: 'send-email-reminder.html',
})
export class SendEmailReminderPage {
    recipients: any = [
        {id: 1, name: 'Palestrantes', count: 18, checked: false},
        {id: 2, name: 'Membros', count: 1, checked: false},
        {id: 3, name: 'Patrocinadores', count: 7, checked: false},
        {id: 4, name: 'Todos', count: 392, checked: false},
    ];

    message: any = {title: '', content: '', send_option: ''};

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public alertCtrl: AlertController,
                public modalCtrl: ModalController) {
    }

    send() {
        let modal = this.modalCtrl.create('EventAnnouncementReviewPage', {
            data: {
                event_name: 'Lorem Ipsum',
                recipients: this.buildRecipientsString(),
                content: this.message.content,
                title: this.message.title,
                send_option: this.message.send_option
            }
        }, {cssClass: 'my-modal-inner my-stretch'});
        modal.onDidDismiss(data => {
            this.alertCtrl.create({
                title: 'Envio de Anúncio',
                subTitle: 'Sucesso!',
                buttons: ['Ok, retornar']
            }).present();
        });
        modal.present();
    }

    buildRecipientsString() {
        let s = '';

        for (let recipient of this.recipients) {
            if (recipient.checked) {
                if (s != '') {
                    s += ', ';
                }

                s += recipient.name
            }
        }

        return s;
    }
}
