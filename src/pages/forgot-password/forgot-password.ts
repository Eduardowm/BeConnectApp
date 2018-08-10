import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
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
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ForgotPasswordPage');
    }

    // Attempt to login in through our User service
    doForgotPassword() {
        this.user.forgotPassword(this.email)
            .then((result: any) => {
                this.navCtrl.push('LogarPage');
                let toast = this.toastCtrl.create({
                    message: "Foi enviado um e-mail com instruções para recuperação da sua conta para o endereço informado.",
                    duration: 10000,
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

    recoveryCode() {
        let confirm = this.alertCtrl.create({
            title: 'RECUPERAR SENHA',
            buttons: [
                {
                    text: 'Cancelar',
                    cssClass: 'alert-btn-cancel',
                },
                {
                    text: 'Confirmar',
                    cssClass: 'alert-btn-confirm',
                    handler: (data) => {
                        this.sendCode(data);
                    }
                }
            ]
        });

        confirm.addInput({
            type: 'text',
            placeholder: 'Código de Recuperação',
            name: 'code'
        });

        confirm.addInput({
            type: 'password',
            placeholder: 'Nova Senha',
            name: 'password'
        });

        confirm.present();
    }

    sendCode(data) {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.user.getCode(data.code)
            .then((result: any) => {
                loading.dismiss();

                if (result.status) {
                    this.changePassword(result.person_id, data.password);
                } else {
                    this.toastCtrl.create({
                        message: result.msg,
                        duration: 3000,
                        position: 'top'
                    }).present();
                }
            })
            .catch((error: any) => {
                console.log(error);
                loading.dismiss();
            });
    }

    changePassword(person_id, password) {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.user.changePassword(person_id, password)
            .then((result: any) => {
                loading.dismiss();

                if (result.status) {
                    this.toastCtrl.create({
                        message: "Senha alterada com sucesso!",
                        duration: 3000,
                        position: 'top'
                    }).present();
                } else {
                    this.toastCtrl.create({
                        message: result.msg,
                        duration: 3000,
                        position: 'top'
                    }).present();
                }
            })
            .catch((error: any) => {
                console.log(error);
                loading.dismiss();
            });
    }
}
