import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, LoadingController, NavController, ToastController} from 'ionic-angular';

import {User} from '../../providers/providers';
import {MainPage} from '../pages';
import {NativeStorage} from "@ionic-native/native-storage";
import {Churchs} from "../../providers/churchs/churchs";

@IonicPage()
@Component({
    selector: 'page-logar',
    templateUrl: 'logar.html'
})
export class LogarPage {
    churchs: any;

    account: { email: string, password: string, church: any } = {
        email: '',
        password: '',
        church: 0
    };

    // Our translated text strings
    private loginErrorString: string;

    constructor(public navCtrl: NavController,
                public user: User,
                public toastCtrl: ToastController,
                public translateService: TranslateService,
                public loadingCtrl: LoadingController,
                private nativeStorage: NativeStorage,
                public _churchs: Churchs) {

        this.translateService.get('LOGIN_ERROR').subscribe((value) => {
            this.loginErrorString = value;
        });

        this.nativeStorage.getItem('login').then(
            data => this.account.email = data,
            error => console.error(error)
        );

        this.nativeStorage.getItem('church').then(
            data => this.account.church = data,
            error => console.error(error)
        );

        let loading = this.loadingCtrl.create();
        loading.present();

        _churchs.get()
            .then((result: any) => {
                loading.dismiss();
                this.churchs = result;

                this.nativeStorage.getItem('church').then(
                    data => this.account.church = data,
                    error => console.error(error)
                );
            })
            .catch((error: any) => {
                loading.dismiss();
                // this.toast.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
            });
    }

    // Attempt to login in through our User service
    doLogin() {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.user.login(this.account)
            .then((resp: any) => {
                loading.dismiss();

                if (resp.status) {
                    this.nativeStorage.setItem('sessao', true);
                    this.nativeStorage.setItem('login', this.account.email)
                        .then(
                            () => console.log('Stored item!'),
                            error => console.error('Error storing item', error)
                        );
                    this.nativeStorage.setItem('church', this.account.church);

                    this.navCtrl.setRoot(MainPage);
                    this.navCtrl.popToRoot();
                } else {
                    this.toastCtrl.create({
                        message: 'Não foi possível acessar utilizando os dados informados.',
                        duration: 3000,
                        position: 'top'
                    }).present();
                }
            })
            .catch((error: any) => {
                loading.dismiss();

                this.navCtrl.setRoot(MainPage);
                this.navCtrl.popToRoot();
                // this.navCtrl.push(MainPage);
                // Unable to log in
                let toast = this.toastCtrl.create({
                    message: this.loginErrorString,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            });

        // this.user.login(this.account).subscribe((resp: any) => {
        //     loading.dismiss();
        //
        //     if (resp.sucesso) {
        //         this.nativeStorage.setItem('login', this.account.email);
        //         this.navCtrl.push(MainPage);
        //     } else {
        //         let toast = this.toastCtrl.create({
        //             message: resp.mensagem,
        //             duration: 3000,
        //             position: 'top'
        //         });
        //         toast.present();
        //     }
        // }, (err) => {
        //     loading.dismiss();
        //
        //     this.navCtrl.push(MainPage);
        //     // Unable to log in
        //     let toast = this.toastCtrl.create({
        //         message: this.loginErrorString,
        //         duration: 3000,
        //         position: 'top'
        //     });
        //     toast.present();
        // });
    }

    forgotPassword() {
        this.navCtrl.push('ForgotPasswordPage');
    }
}
