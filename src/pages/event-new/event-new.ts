import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {Events} from "../../providers/events/events";
import {Groups} from "../../providers/groups/groups";
import {User} from "../../providers/user/user";

/**
 * Generated class for the EventNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-event-new',
    templateUrl: 'event-new.html',
})
export class EventNewPage {
    data: any = {
        name: '',
        createdBy_id: '',
        group_id: '',
        description: '',
        endEventDate: '',
        startTime: '',
        endTime: '',
        frequency: '',
        day: '',
        allDay: false,
        day_2: '',
        street: '',
        neighborhood: '',
        city: '',
        zipCode: '',
        state: '',
        number: ''
    };
    groups: any = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtrl: ViewController,
                public events: Events,
                public _groups: Groups,
                public user: User,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EventNewPage');

        let loading = this.loadingCtrl.create();
        loading.present();
        this._groups.get()
            .then((result: any) => {
                loading.dismiss();
                this.groups = result;
            })
            .catch((error: any) => {
                loading.dismiss();
                // this.toast.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
            });
    }

    createEvent() {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.data.createdBy_id = this.user.getUser();
        this.data.church_id = this.user.getChurch();

        this.events.new(this.data)
            .then((result: any) => {
                loading.dismiss();

                if (result.status) {
                    this.toastCtrl.create({
                        message: 'Evento cadastrado com sucesso!',
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
