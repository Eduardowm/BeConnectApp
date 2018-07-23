import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {User} from "../../providers/user/user";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {
    user: any = {
        imgProfile: 'assets/img/church-member.jpg',
        name: 'User',
        email: 'mail@example.com',
        tel: '+55 01 2345-67889',
        cel: '+55 01 2345-67889',
        role: 'Member'
    };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public userApi: User,
                public alertCtrl: AlertController,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController) {
        this.user = userApi.getUserInfo();
        this.user.imgProfile = 'https://beconnect.com.br/' + this.user.imgProfile;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProfilePage');
    }

    changePassword() {
        let confirm = this.alertCtrl.create({
            title: 'ALTERAR SENHA',
            buttons: [
                {
                    text: 'Cancelar',
                    cssClass: 'alert-btn-cancel',
                },
                {
                    text: 'Confirmar',
                    cssClass: 'alert-btn-confirm',
                    handler: (data) => {
                        this.salvarSenha(data);
                    }
                }
            ]
        });

        confirm.addInput({
            type: 'password',
            placeholder: 'Senha Atual',
            name: 'senha_atual'
        });

        confirm.addInput({
            type: 'password',
            placeholder: 'Nova Senha',
            name: 'nova_senha'
        });

        confirm.present();
    }

    salvarSenha(data) {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.userApi.changePassword(data)
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
