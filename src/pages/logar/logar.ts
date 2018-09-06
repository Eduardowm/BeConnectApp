import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, LoadingController, NavController, Platform, ToastController} from 'ionic-angular';

import {User} from '../../providers/providers';
import {MainPage} from '../pages';
import {NativeStorage} from "@ionic-native/native-storage";
import {Churchs} from "../../providers/churchs/churchs";

import * as firebase from 'firebase';

@IonicPage()
@Component({
    selector: 'page-logar',
    templateUrl: 'logar.html'
})
export class LogarPage {
    churchs: any;

    account: { email: string, password: string, church: any, token: any } = {
        // email: 'admin@admin.com',
        // password: 'secret',
        // church: 1
        email: '',
        password: '',
        church: 1,
        token: null
    };

    waitingLoginSocial: boolean = false;

    // Our translated text strings
    private loginErrorString: string;

    constructor(public navCtrl: NavController,
                public user: User,
                public toastCtrl: ToastController,
                public translateService: TranslateService,
                public loadingCtrl: LoadingController,
                private nativeStorage: NativeStorage,
                public _churchs: Churchs,
                public platform: Platform) {

        this.translateService.get('LOGIN_ERROR').subscribe((value) => {
            this.loginErrorString = value;
        });

        if (!this.platform.is('cordova')) {
            this.account.email = 'admin@admin.com';
            this.account.password = 'secret';
            this.account.church = 1;
            // this.doLogin();
        }

        this.nativeStorage.getItem('login').then(
            data => this.account.email = data,
            error => console.error(error)
        );

        this.nativeStorage.getItem('church').then(
            data => this.account.church = data,
            error => console.error(error)
        );

        this.nativeStorage.getItem('password').then(
            data => {
                this.account.password = data;
                this.doLogin();
            },
            error => console.error(error)
        );

        this.nativeStorage.getItem('waiting-login-social').then(data => {
            this.waitingLoginSocial = true;
        });

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

    ionViewDidLoad() {
        this.firebaseInit();
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
                    this.nativeStorage.setItem('password', this.account.password);

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
    }

    forgotPassword() {
        this.navCtrl.push('ForgotPasswordPage');
    }

    loginFacebook() {
        let that = this;

        firebase.auth().signOut()
            .then(() => {
                this.nativeStorage.setItem('waiting-login-social', true);

                const provider = new firebase.auth.FacebookAuthProvider();
                provider.addScope('public_profile');

                firebase.auth().signInWithRedirect(provider).then(function () {
                    return firebase.auth().getRedirectResult();
                }).then(function (result) {
                    console.log("loginFacebook: ", result);
                    that.loginSocial(result.user);

                }).catch(function (error) {
                    // Handle Errors here.
                    // var errorCode = error.code;
                    // var errorMessage = error.message;
                });
            });
    }

    loginGoogle() {
        let that = this;

        firebase.auth().signOut()
            .then(() => {
                this.nativeStorage.setItem('waiting-login-social', true);

                const provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('profile');
                provider.addScope('email');

                // firebase.auth().signInWithRedirect(provider)
                //     .then(() => {
                // });

                firebase.auth().signInWithRedirect(provider).then(function () {
                    return firebase.auth().getRedirectResult();
                }).then(function (result) {
                    console.log("loginGoogle: ", result);
                    that.loginSocial(result.user);

                    // This gives you a Google Access Token.
                    // You can use it to access the Google API.
                    // var token = result.credential.accessToken;
                    // The signed-in user info.
                    // var user = result.user;
                    // ...
                }).catch(function (error) {
                    // Handle Errors here.
                    // var errorCode = error.code;
                    // var errorMessage = error.message;
                });
            });
    }

    logout() {
        firebase.auth().signOut()
            .then(() => {
            });
    }

    firebaseLoginResult() {
        let that = this;

        if (this.waitingLoginSocial) {
            let loading = this.loadingCtrl.create();
            loading.present();

            firebase.auth().onAuthStateChanged((user) => {
                console.log("firebaseLoginResult", user);
                // displayName, email, emailVerified, phoneNumber, photoURL, uid

                if (user) {
                    that.loginSocial(user);
                    loading.dismiss();
                } else {
                    loading.dismiss();
                    this.toastCtrl.create({
                        message: 'Não foi possível autenticar seu usuário.',
                        duration: 3000,
                        position: 'top'
                    }).present();
                }
            })
        }
    }

    firebaseInit() {
        this.firebaseLoginResult();
    }

    loginSocial(user) {
        this.nativeStorage.remove('waiting-login-social');

        // this.user.loginSocial({name: user.displayName, email: user.email, phone: user.phoneNumber, picture_url: user.photoURL, token: user.uid})
        this.account.token = user.uid;
        this.user.login(this.account)
            .then((resp: any) => {
                if (resp.status) {
                    this.nativeStorage.setItem('sessao', true);
                    this.nativeStorage.setItem('login', this.account.email)
                        .then(
                            () => console.log('Stored item!'),
                            error => console.error('Error storing item', error)
                        );
                    this.nativeStorage.setItem('church', this.account.church);
                    this.nativeStorage.setItem('password', this.account.password);

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

        // this.auth.user.name = user.displayName;
        // this.auth.user.photo = user.photoURL;
        // this.navCtrl.setRoot(HomePage);
    }

}
