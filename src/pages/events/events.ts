import {Component} from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams, ActionSheetController, Platform, ToastController} from 'ionic-angular';
import {Events} from "../../providers/events/events";
import {SocialSharing} from "@ionic-native/social-sharing";
import {User} from "../../providers/user/user";
import {Groups} from "../../providers/groups/groups";

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-events',
    templateUrl: 'events.html',
})
export class EventsPage {

    nextEvents: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public modalCtrl: ModalController,
                public events: Events,
                public groups: Groups,
                public user: User,
                public loadingCtrl: LoadingController,
                public actionsheetCtrl: ActionSheetController,
                public platform: Platform,
                private socialSharing: SocialSharing,
                public toastCtrl: ToastController) {
        this.loadEvents();
    }

    loadEvents() {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.events.next()
            .then((result: any) => {
                loading.dismiss();

                for (let event of result) {
                    event.has_group = false;

                    this.events.isCheck(event.id)
                        .then((result: any) => {
                            event.check = result["check-in"];
                        });
                    if (event.group_id) {
                        this.groups.getInfo(event.group_id)
                            .then((result: any) => {
                                if (result.status) {
                                    event.has_group = true;
                                    event.group = result.group;
                                }
                            });
                    }
                }

                this.nextEvents = result;
            })
            .catch((error: any) => {
                loading.dismiss();
                // this.toast.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
            });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EventsPage');
    }

    newEvent() {
        let addModal = this.modalCtrl.create('EventNewPage');
        // addModal.onDidDismiss(item => {
        //     if (item) {
        //         this.items.add(item);
        //     }
        // })
        addModal.present();
    }

    openEvent(item) {
        this.navCtrl.push('EventViewPage', {event: item});
    }

    openMenu(event) {
        if (event.check) {
            this.actionsheetCtrl.create({
                title: 'Ações',
                cssClass: 'action-sheets-basic-page',
                buttons: [
                    {
                        text: 'Compartilhar',
                        icon: !this.platform.is('ios') ? 'share' : null,
                        handler: () => {
                            this.openShareMenu(event);
                        }
                    },
                    {
                        text: 'Checkin em Massa',
                        icon: !this.platform.is('ios') ? 'checkmark-circle' : null,
                        handler: () => {
                            this.navCtrl.push('EventMassCheckinPage', {event});
                        }
                    },
                    {
                        text: 'Cancelar Checkin',
                        icon: !this.platform.is('ios') ? 'close-circle' : null,
                        handler: () => {
                            this.cancelCheckin(event);
                        }
                    },
                    {
                        text: 'Cancelar',
                        role: 'cancel', // will always sort to be on the bottom
                        icon: !this.platform.is('ios') ? 'close' : null,
                    }
                ]
            }).present();
        } else {
            this.actionsheetCtrl.create({
                title: 'Ações',
                cssClass: 'action-sheets-basic-page',
                buttons: [
                    {
                        text: 'Compartilhar',
                        icon: !this.platform.is('ios') ? 'share' : null,
                        handler: () => {
                            this.openShareMenu(event);
                        }
                    },
                    {
                        text: 'Checkin em Massa',
                        icon: !this.platform.is('ios') ? 'checkmark-circle' : null,
                        handler: () => {
                            this.navCtrl.push('EventMassCheckinPage', {event});
                        }
                    },
                    {
                        text: 'Checkin',
                        icon: !this.platform.is('ios') ? 'checkmark-circle-outline' : null,
                        handler: () => {
                            this.checkin(event);
                        }
                    },
                    {
                        text: 'Cancelar',
                        role: 'cancel', // will always sort to be on the bottom
                        icon: !this.platform.is('ios') ? 'close' : null,
                    }
                ]
            }).present();
        }
    }

    openShareMenu(event) {
        let title = ('BeConnect - Convite para o evento ' + event.name);
        let message = (event.name + '\n' + event.event_date + '\n' + event.description);
        let image = 'https://beconnect.com.br/store/images/logo-branco.png';

        let actionSheet = this.actionsheetCtrl.create({
            title: 'Compartilhar',
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Instagram',
                    icon: !this.platform.is('ios') ? 'logo-instagram' : 'instagram',
                    handler: () => {
                        this.socialSharing.shareViaInstagram(message, image).then(() => {
                            // Success!
                        }).catch(() => {
                            // Error!
                        });
                    }
                },
                {
                    text: 'Whatsapp',
                    icon: !this.platform.is('ios') ? 'logo-whatsapp' : 'whatsapp',
                    handler: () => {
                        this.socialSharing.shareViaWhatsApp(message, image).then(() => {
                            // Success!
                        }).catch(() => {
                            // Error!
                        });
                    }
                },
                {
                    text: 'Facebook',
                    icon: !this.platform.is('ios') ? 'logo-facebook' : 'facebook',
                    handler: () => {
                        this.socialSharing.shareViaFacebook(message, image).then(() => {
                            // Success!
                        }).catch(() => {
                            // Error!
                        });
                    }
                },
                {
                    text: 'E-mail',
                    icon: 'mail',
                    handler: () => {
                        this.socialSharing.shareViaEmail(message, title, []).then(() => {
                            // Success!
                        }).catch(() => {
                            // Error!
                        });
                    }
                },
                {
                    text: 'SMS',
                    icon: 'send',
                    handler: () => {
                        this.socialSharing.shareViaSMS(message, '').then(() => {
                            // Success!
                        }).catch(() => {
                            // Error!
                        });
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel', // will always sort to be on the bottom
                    icon: !this.platform.is('ios') ? 'close' : null,
                }
            ]
        });
        actionSheet.present();
    }

    checkin(event) {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.user.checkin(event.id)
            .then((result: any) => {
                loading.dismiss();

                if (result.status) {
                    this.toastCtrl.create({
                        message: 'Checkin realizado com sucesso!',
                        duration: 3000,
                        position: 'top'
                    }).present();
                    this.loadEvents();
                } else {
                    this.toastCtrl.create({
                        message: result.msg,
                        duration: 3000,
                        position: 'top'
                    }).present();
                }
            })
            .catch((error: any) => {
                loading.dismiss();
                // this.toast.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
            });
    }

    cancelCheckin(event) {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.user.cancelCheckin(event.id)
            .then((result: any) => {
                loading.dismiss();

                if (result.status) {
                    this.toastCtrl.create({
                        message: 'Checkin cancelado com sucesso!',
                        duration: 3000,
                        position: 'top'
                    }).present();
                    this.loadEvents();
                } else {
                    this.toastCtrl.create({
                        message: 'Não foi possível cancelar o checkin.',
                        duration: 3000,
                        position: 'top'
                    }).present();
                }
            })
            .catch((error: any) => {
                loading.dismiss();
                // this.toast.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
            });
    }
}
