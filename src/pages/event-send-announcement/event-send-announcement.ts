import {Component} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NativeStorage} from "@ionic-native/native-storage";

@IonicPage()
@Component({
    selector: 'page-event-send-announcement',
    templateUrl: 'event-send-announcement.html',
})
export class EventSendAnnouncementPage {
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
                public modalCtrl: ModalController,
                public toastCtrl: ToastController,
                private nativeStorage: NativeStorage) {
        this.nativeStorage.getItem('message.title').then(data => this.message.title = data);
        this.nativeStorage.getItem('message.content').then(data => this.message.content = data);
        this.nativeStorage.getItem('message.send_option').then(data => this.message.send_option = data);
    }

    save() {
        this.nativeStorage.setItem('message.title', this.message.title);
        this.nativeStorage.setItem('message.content', this.message.content);
        this.nativeStorage.setItem('message.send_option', this.message.send_option);

        this.toastCtrl.create({
            message: "O anúncio foi salvo.",
            duration: 8000,
            position: 'top'
        }).present();

        this.navCtrl.pop();
    }

    send() {
        if (this.message.content == '') {
            this.toastCtrl.create({
                message: "Por favor, preencha o campo Conteúdo.",
                duration: 8000,
                position: 'top'
            }).present();
            return false;
        }

        if (this.message.title == '') {
            this.toastCtrl.create({
                message: "Por favor, preencha o campo Título.",
                duration: 8000,
                position: 'top'
            }).present();
            return false;
        }

        if (this.message.send_option == '') {
            this.toastCtrl.create({
                message: "Por favor, preencha o campo Opções de Envio.",
                duration: 8000,
                position: 'top'
            }).present();
            return false;
        }

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
