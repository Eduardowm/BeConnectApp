import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the AppAccessRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-app-access-requests',
    templateUrl: 'app-access-requests.html',
})
export class AppAccessRequestsPage {
    pendingRequests: any = [
        {date: Date.now(), picture_url: 'assets/img/user1.png', name: 'Ankit Agarwal', email: 'ankit@inter.com', occupation: 'Software Engineering Inter', location: 'San Francisco Bay Area'},
        {date: Date.now(), picture_url: 'assets/img/user1.png', name: 'Ankit Agarwal', email: 'ankit@inter.com', occupation: 'Software Engineering Inter', location: 'San Francisco Bay Area'},
        {date: Date.now(), picture_url: 'assets/img/user1.png', name: 'Ankit Agarwal', email: 'ankit@inter.com', occupation: 'Software Engineering Inter', location: 'San Francisco Bay Area'},
    ];

    resolvedRequests: any = [
        {
            date: Date.now(),
            picture_url: 'assets/img/user1.png',
            name: 'Ankit Agarwal',
            email: 'ankit@inter.com',
            occupation: 'Software Engineering Inter',
            location: 'San Francisco Bay Area',
            approved: true
        },
        {
            date: Date.now(),
            picture_url: 'assets/img/user1.png',
            name: 'Ankit Agarwal',
            email: 'ankit@inter.com',
            occupation: 'Software Engineering Inter',
            location: 'San Francisco Bay Area',
            approved: false
        },
        {
            date: Date.now(),
            picture_url: 'assets/img/user1.png',
            name: 'Ankit Agarwal',
            email: 'ankit@inter.com',
            occupation: 'Software Engineering Inter',
            location: 'San Francisco Bay Area',
            approved: false
        },
    ];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AppAccessRequestsPage');
    }

    approve(request) {
        this.alertCtrl.create({
            title: '',
            message: 'Você realmente quer aprovar ' + request.name + " (" + request.email + ")",
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => {
                    }
                },
                {
                    text: 'Aprovar',
                    handler: () => {
                    }
                }
            ]
        }).present();
    }

    ignore(request) {
        this.alertCtrl.create({
            title: '',
            message: 'Você realmente quer ignorar ' + request.name + " (" + request.email + ")",
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => {
                    }
                },
                {
                    text: 'Ignorar',
                    handler: () => {
                    }
                }
            ]
        }).present();
    }

    change(request) {
        request.approved = null;

        this.resolvedRequests = this.resolvedRequests.filter(function (obj) {
            return obj != request;
        });

        this.pendingRequests.push(request);
    }
}
