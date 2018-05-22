import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FirstRunPage} from "../pages";
import {User} from "../../providers/user/user";

@IonicPage()
@Component({
    selector: 'page-forgot-password',
    templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
    email: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public user: User,
        public toastCtrl: ToastController
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ForgotPasswordPage');
    }

    // Attempt to login in through our User service
    doForgotPassword() {
        this.user.forgotPassword(this.email)
            .then((result: any) => {
                this.navCtrl.push(FirstRunPage);
                let toast = this.toastCtrl.create({
                    message: result.mensagem,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            })
            .catch((error: any) => {
                let toast = this.toastCtrl.create({
                    message: error.mensagem,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            });
    }

}
