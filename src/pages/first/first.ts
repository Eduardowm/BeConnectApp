import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {Slides, ToastController, ModalController, Platform} from 'ionic-angular';
import {NativeStorage} from "@ionic-native/native-storage";
import {Churchs} from "../../providers/churchs/churchs";
import {MainPage} from '../pages';
import {ModalTermsPage} from '../modal-terms/modal-terms';
import {User} from "../../providers/user/user";

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
    name: any = '';
    email: any = '';
    phone: any = '';
    dateBirth: any;
    church: any;
    terms: any = false;
    type: any = '';
    churchSearch: any;
    churchSearchShouldShowCancel: boolean = true;
    items: any;

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
        if (this.name == '') {
            return this.toastCtrl.create({
                message: "O campo Nome precisa ser preenchido.",
                duration: 3000,
                position: 'top'
            }).present();
        }

        if (this.email == '') {
            return this.toastCtrl.create({
                message: "O campo E-mail precisa ser preenchido.",
                duration: 3000,
                position: 'top'
            }).present();
        }

        if (this.phone == '') {
            return this.toastCtrl.create({
                message: "O campo Telefone precisa ser preenchido.",
                duration: 3000,
                position: 'top'
            }).present();
        }

        if (this.type == '') {
            return this.toastCtrl.create({
                message: "O campo Membro/Visitante precisa ser preenchido.",
                duration: 3000,
                position: 'top'
            }).present();
        }

        if (!this.terms) {
            return this.toastCtrl.create({
                message: "O campo Termos precisa ser marcado.",
                duration: 3000,
                position: 'top'
            }).present();
        }

        this.slides.lockSwipes(false);
        this.slides.slideTo(3, 500);
        this.slides.lockSwipes(true);
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

        this.user.signup({dateBirth: this.dateBirth, name: this.name, cel: this.phone, email: this.email, role: "Visitante"})
            .then((resp: any) => {
                loading.dismiss();

                if (resp.status) {
                    this.nativeStorage.setItem('sessao', true);
                    this.nativeStorage.setItem('login', this.email);

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
                }
            })
            .catch((error: any) => {
                loading.dismiss();
            });
    }

    continueMember(church) {
        this.user.setChurch(church.id);

        if (this.type == 'Visitante') {
            return this.continueVisitor();
        }

        this.nativeStorage.setItem('sessao', true);

        // send signup as member (pendent)
        let loading = this.loadingCtrl.create();
        loading.present();

        this.user.signup({dateBirth: this.dateBirth, name: this.name, cel: this.phone, email: this.email, church_id: church.id, role: "Membro"})
            .then((resp: any) => {
                loading.dismiss();

                if (resp.status) {
                    this.nativeStorage.setItem('sessao', true);
                    this.nativeStorage.setItem('login', this.email);

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
                }
            })
            .catch((error: any) => {
                loading.dismiss();
            });
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
}
