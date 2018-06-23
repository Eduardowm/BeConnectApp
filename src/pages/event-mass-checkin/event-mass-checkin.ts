import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Events} from "../../providers/providers";

/**
 * Generated class for the EventMassCheckinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-event-mass-checkin',
    templateUrl: 'event-mass-checkin.html',
})
export class EventMassCheckinPage {
    churchSearch: any;
    churchSearchShouldShowCancel: boolean = true;

    event: any;
    items: any;
    subList: any = {
        status: true,
        people: [
            // {id: 0, event_id: 0, person_id: 0, name: "Hayao Miyazaki", check: true},
            // {id: 0, event_id: 0, person_id: 0, name: "Hayao Miyazaki", check: false},
            // {id: 0, event_id: 0, person_id: 0, name: "Hayao Miyazaki", check: true},
            // {id: 0, event_id: 0, person_id: 0, name: "Hayao Miyazaki", check: false},
        ]
    };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController,
                public events: Events) {
        this.event = navParams.get('event');
        console.log(navParams.get('event'));

        this.loadSub();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EventMassCheckinPage');
    }

    loadSub() {
        if (this.event) {
            let loading = this.loadingCtrl.create();
            loading.present();
            this.events.getSubList(this.event.id)
                .then((result: any) => {
                    loading.dismiss();

                    this.subList = result;
                    this.setItems();
                })
                .catch((error: any) => {
                    loading.dismiss();
                    // this.toast.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
                });
        }
    }

    save() {
        if (this.event) {
            let loading = this.loadingCtrl.create();
            loading.present();

            let checkList = [];

            for (let value of this.subList.people) {
                if (value.check) {
                    checkList.push(value.person_id);
                }
            }

            this.events.saveMassCheckin(checkList, this.event.id)
                .then((result: any) => {
                    loading.dismiss();

                    if (result.status) {
                        this.toastCtrl.create({
                            message: 'Check-in em massa salvo com sucesso!',
                            duration: 3000,
                            position: 'top'
                        }).present();
                        this.navCtrl.push('EventsPage');
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
    }

    setItems() {
        this.items = this.subList.people;
    }

    onChurchSearchInput(ev: any) {
        this.setItems();
        let val = ev.target.value;

        if (val && val.trim() !== '') {
            this.items = this.items.filter(function (item) {
                return item.name.toLowerCase().includes(val.toLowerCase());
            });
        }
    }

    onChurchSearchCancel(ev: any) {
        this.setItems();
    }
}
