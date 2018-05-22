import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {Slides, ToastController, ModalController} from 'ionic-angular';
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
    name: any;
    email: any;
    phone: any;
    dateBirth: any;
    church: any;
    terms: any;
    type: any;
    churchSearch: any;
    churchSearchShouldShowCancel: boolean = true;

    logo: string = 'assets/img/logo-escuro.png';
    logoWidth: number = 256;
    logoHeight: number = 256;

    constructor(public navCtrl: NavController,
                private nativeStorage: NativeStorage,
                public _churchs: Churchs,
                public toastCtrl: ToastController,
                public modalCtrl: ModalController,
                public user: User,
                public loadingCtrl: LoadingController) {
    }

    ionViewDidLoad() {
        this.slides.lockSwipes(true);
        this.checarSessao();

        this._churchs.get().then((result: any) => {
            this.churchs = result;
        });
    }

    checarSessao() {
        // this.nativeStorage.getItem('sessao').then(
        //     data => this.navCtrl.push('LogarPage'),
        // );
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
        this.slides.lockSwipes(false);
        this.slides.slideTo(3, 500);
        this.slides.lockSwipes(true);
    }

    // member() {
    //     this.slides.lockSwipes(false);
    //     this.slides.slideTo(4, 500);
    //     this.slides.lockSwipes(true);
    // }

    visitor() {
        // send signup as visitor
        let loading = this.loadingCtrl.create();
        this.user.signup({dateBirth: this.dateBirth, name: this.name, cel: this.phone, email: this.email})
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
        this.nativeStorage.setItem('sessao', true);

        // send signup as member (pendent)
        let loading = this.loadingCtrl.create();
        this.user.signup({dateBirth: this.dateBirth, name: this.name, cel: this.phone, email: this.email, church_id: church.id})
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

    onChurchSearchInput(event) {
    }

    onChurchSearchCancel(event) {
    }

    openTerms() {
        this.modalCtrl.create(ModalTermsPage).present();
    }
}
