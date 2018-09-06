import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {Slides, ToastController, ModalController, Platform} from 'ionic-angular';
import {NativeStorage} from "@ionic-native/native-storage";
import {Churchs} from "../../providers/churchs/churchs";
import {MainPage} from '../pages';
import {ModalTermsPage} from '../modal-terms/modal-terms';
import {User} from "../../providers/user/user";

import * as firebase from 'firebase';

/**
 * The First Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the First page.
 */
@IonicPage()
@Component({
    selector: 'page-first',
    templateUrl: 'first.html'
})
export class FirstPage {
    @ViewChild(Slides) slides: Slides;

    churchs: any;

    data: any = {
        name: '',
        password: '',
        email: '',
        cel: '',
        dateBirth: null,
        church: null,
        terms: false,
        type: '',
        token: null,
        role: 'Visitante',
    };

    churchSearch: any;
    churchSearchShouldShowCancel: boolean = true;
    items: any;
    waitingSignupSocial: boolean = false;

    logo: string = 'assets/img/logo-escuro.png';
    logoWidth: number = 256;
    logoHeight: number = 256;

    constructor(public navCtrl: NavController,
                private nativeStorage: NativeStorage,
                public _churchs: Churchs,
                public toastCtrl: ToastController,
                public modalCtrl: ModalController,
                public user: User,
                public loadingCtrl: LoadingController,
                public platform: Platform) {
    }

    ionViewDidLoad() {
        this.slides.lockSwipes(true);

        this._churchs.get().then((result: any) => {
            this.churchs = result;
            this.setItems();
        });

        this.platform.ready().then((readySource) => {
            this.checarSessao();

            this.nativeStorage.getItem('waiting-signup-social').then(data => {
                this.waitingSignupSocial = true;
                this.firebaseInit();
            });
        });
    }

    checarSessao() {
        this.nativeStorage.getItem('sessao').then(
            data => this.navCtrl.setRoot('LogarPage'),
        );
    }

    hasRegister(register) {
        if (register) {
            this.navCtrl.push('LogarPage')
        } else {
            this.logo = 'assets/img/logo-horizontal.png';
            this.logoHeight /= 2;
            this.slides.lockSwipes(false);
            this.slides.slideTo(2, 500);
            this.slides.lockSwipes(true);
        }
    }

    signup() {
        if (this.data.name == '') {
            return this.toastCtrl.create({
                message: "O campo Nome precisa ser preenchido.",
                duration: 3000,
                position: 'top'
            }).present();
        }

        if (this.data.email == '') {
            return this.toastCtrl.create({
                message: "O campo E-mail precisa ser preenchido.",
                duration: 3000,
                position: 'top'
            }).present();
        }

        if (this.data.password == '') {
            return this.toastCtrl.create({
                message: "O campo Senha precisa ser preenchido.",
                duration: 3000,
                position: 'top'
            }).present();
        }

        if (this.data.cel == '') {
            return this.toastCtrl.create({
                message: "O campo Telefone precisa ser preenchido.",
                duration: 3000,
                position: 'top'
            }).present();
        }

        if (this.validarObrigatorios()) {
            this.slides.lockSwipes(false);
            this.slides.slideTo(3, 500);
            this.slides.lockSwipes(true);
        }
    }

    validarObrigatorios() {
        if (this.data.type == '') {
            this.toastCtrl.create({
                message: "O campo Membro/Visitante precisa ser preenchido.",
                duration: 3000,
                position: 'top'
            }).present();
            return false;
        }

        if (!this.data.terms) {
            this.toastCtrl.create({
                message: "O campo Termos precisa ser marcado.",
                duration: 3000,
                position: 'top'
            }).present();
            return false;
        }

        return true;
    }

    // member() {
    //     this.slides.lockSwipes(false);
    //     this.slides.slideTo(4, 500);
    //     this.slides.lockSwipes(true);
    // }

    continueVisitor() {
        // send signup as visitor
        let loading = this.loadingCtrl.create();
        loading.present();

        if (this.data.token) {
            this.data.role = "Visitante";

            this.user.signup(this.data)
                .then((resp: any) => {
                    loading.dismiss();

                    if (resp.status) {
                        this.nativeStorage.setItem('sessao', true);
                        this.nativeStorage.setItem('login', this.data.email);

                        this.toastCtrl.create({
                            message: "Cadastro realizadao com sucesso!",
                            duration: 3000,
                            position: 'top'
                        }).present();

                        this.navCtrl.setRoot(MainPage);
                        this.navCtrl.popToRoot();
                    } else {
                        let toast = this.toastCtrl.create({
                            message: resp.msg,
                            duration: 3000,
                            position: 'top'
                        });
                        toast.present();
                        this.slides.lockSwipes(false);
                        this.slides.slideTo(2, 500);
                        this.slides.lockSwipes(true);
                    }
                })
                .catch((error: any) => {
                    loading.dismiss();
                });
        } else {
            // this.user.signup({dateBirth: this.dateBirth, name: this.name, cel: this.cel, email: this.email, role: "Visitante", password: this.senha})
            this.user.signup(this.data)
                .then((resp: any) => {
                    loading.dismiss();

                    if (resp.status) {
                        this.nativeStorage.setItem('sessao', true);
                        this.nativeStorage.setItem('login', this.data.email);

                        this.toastCtrl.create({
                            message: "Cadastro realizadao com sucesso!",
                            duration: 3000,
                            position: 'top'
                        }).present();

                        this.navCtrl.setRoot(MainPage);
                        this.navCtrl.popToRoot();
                    } else {
                        let toast = this.toastCtrl.create({
                            message: resp.msg,
                            duration: 3000,
                            position: 'top'
                        });
                        toast.present();
                        this.slides.lockSwipes(false);
                        this.slides.slideTo(2, 500);
                        this.slides.lockSwipes(true);
                    }
                })
                .catch((error: any) => {
                    loading.dismiss();
                });
        }
    }

    continueMember(church) {
        this.user.setChurch(church.id);

        if (this.data.type == 'Visitante') {
            return this.continueVisitor();
        }

        this.nativeStorage.setItem('sessao', true);

        // send signup as member (pendent)
        let loading = this.loadingCtrl.create();
        loading.present();

        if (this.data.token) {
            this.data.church_id = church.id;
            this.data.role = "Membro";

            this.user.signup(this.data)
                .then((resp: any) => {
                    loading.dismiss();

                    if (resp.status) {
                        this.nativeStorage.setItem('sessao', true);
                        this.nativeStorage.setItem('login', this.data.email);

                        this.toastCtrl.create({
                            message: "Cadastro realizadao com sucesso!",
                            duration: 3000,
                            position: 'top'
                        }).present();

                        this.navCtrl.setRoot(MainPage);
                        this.navCtrl.popToRoot();
                    } else {
                        let toast = this.toastCtrl.create({
                            message: resp.msg,
                            duration: 3000,
                            position: 'top'
                        });
                        toast.present();
                        this.slides.lockSwipes(false);
                        this.slides.slideTo(2, 500);
                        this.slides.lockSwipes(true);
                    }
                })
                .catch((error: any) => {
                    loading.dismiss();
                });
        } else {
            // this.user.signup({dateBirth: this.dateBirth, name: this.name, cel: this.cel, email: this.email, church_id: church.id, role: "Membro", password: this.senha})
            this.user.signup(this.data)
                .then((resp: any) => {
                    loading.dismiss();

                    if (resp.status) {
                        this.nativeStorage.setItem('sessao', true);
                        this.nativeStorage.setItem('login', this.data.email);

                        this.toastCtrl.create({
                            message: "Cadastro realizadao com sucesso!",
                            duration: 3000,
                            position: 'top'
                        }).present();

                        this.navCtrl.setRoot(MainPage);
                        this.navCtrl.popToRoot();
                    } else {
                        let toast = this.toastCtrl.create({
                            message: resp.msg,
                            duration: 3000,
                            position: 'top'
                        });
                        toast.present();
                        this.slides.lockSwipes(false);
                        this.slides.slideTo(2, 500);
                        this.slides.lockSwipes(true);
                    }
                })
                .catch((error: any) => {
                    loading.dismiss();
                });
        }
    }

    nextSlide() {
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
    }

    openTerms() {
        this.modalCtrl.create(ModalTermsPage).present();
    }

    setItems() {
        this.items = this.churchs;
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

    loginFacebook() {
        if (!this.validarObrigatorios()) {
            return;
        }

        let that = this;

        this.firebaseInit();
        firebase.auth().signOut()
            .then(() => {
                this.nativeStorage.setItem('waiting-signup-social', true);

                const provider = new firebase.auth.FacebookAuthProvider();
                provider.addScope('public_profile');

                // firebase
                //     .auth()
                //     .signInWithRedirect(provider)
                //     .then(() => {
                //
                //     })

                firebase.auth().signInWithRedirect(provider).then(function () {
                    return firebase.auth().getRedirectResult();
                }).then(function (result) {
                    console.log("loginFacebook: ", result);
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

    loginGoogle() {
        if (!this.validarObrigatorios()) {
            return;
        }

        let that = this;

        this.firebaseInit();
        firebase.auth().signOut()
            .then(() => {
                this.nativeStorage.setItem('waiting-signup-social', true);

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

    firebaseLoginResult() {
        let that = this;

        if (this.waitingSignupSocial) {
            let loading = this.loadingCtrl.create();
            loading.present();

            firebase.auth().onAuthStateChanged((user) => {
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

    loginSocial(user) {
        this.nativeStorage.remove('waiting-signup-social');
        this.data.name = user.displayName;
        this.data.email = user.email;
        // this.data.cel = user.celNumber;
        if (!this.data.cel) {
            this.data.cel = user.phoneNumber;
        }
        this.data.picture_url = user.photoURL;
        this.data.token = user.uid;

        this.slides.lockSwipes(false);
        this.slides.slideTo(3, 500);
        this.slides.lockSwipes(true);
    }

    firebaseInit() {
        this.firebaseLoginResult();
    }
}
