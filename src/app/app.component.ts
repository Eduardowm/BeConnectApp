import {Component, ViewChild} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {TranslateService} from '@ngx-translate/core';
import {Config, Nav, Platform, AlertController, LoadingController, MenuController} from 'ionic-angular';

import {FirstRunPage, MainPage} from '../pages/pages';
import {Settings} from '../providers/providers';
import {AndroidPermissions} from "@ionic-native/android-permissions";
import {OneSignal} from "@ionic-native/onesignal";
import {Churchs} from "../providers/churchs/churchs";
import {User} from "../providers/user/user";
import {NativeStorage} from "@ionic-native/native-storage";

import firebaseConfig from '../app/firebase-config';
import * as firebase from 'firebase';

@Component({
    template: `
        <ion-menu [content]="content">
            <ion-header>
                <ion-toolbar>
                    <ion-title>BeConnect</ion-title>
                    <ion-buttons end>
                        <button ion-button icon-only (click)="changeChurch()">
                            <ion-icon name="swap"></ion-icon>
                        </button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>

            <ion-content>
                <ion-grid class="avatar-box" *ngIf="user.getUserInfo()">
                    <ion-row>
                        <ion-col col-3 class="flex-center">
                            <img [src]="user.getUserInfo().imgProfile" class="avatar-img" *ngIf="user.getUserInfo().imgProfile"/>
                            <img src="../assets/img/default-avatar.png" class="avatar-img" *ngIf="!user.getUserInfo().imgProfile"/>
                        </ion-col>
                        <ion-col col-9>
                            <p class="avatar-title">{{user.getUserInfo().name}}</p>
                            <p class="avatar-email" (click)="openPage({component: 'ProfilePage'})">
                                <ion-icon name="create"></ion-icon>
                                Editar Perfil
                            </p>
                        </ion-col>
                    </ion-row>
                </ion-grid>

                <ion-list>
                    <button menuClose ion-item *ngFor="let p of pages" menuItem (click)="openPage(p)">
                        <ion-icon name="{{p.icon}}"></ion-icon>
                        {{p.title}}
                    </button>
                    <!--<button menuClose ion-item menuItem (click)="exitApp()">-->
                        <!--<ion-icon name="exit"></ion-icon>-->
                        <!--Sair-->
                    <!--</button>-->
                </ion-list>
            </ion-content>

        </ion-menu>
        <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
    rootPage = FirstRunPage;

    @ViewChild(Nav) nav: Nav;

    pages: any[] = [
        // {title: 'Meu Contato & QR Code', component: 'ContactInfoPage', icon: 'contact'},
        {title: 'QR Code', component: 'ViewMyQrCodePage', icon: 'qr-scanner'},
        // {title: 'Meus Contatos', component: 'ContactsPage', icon: 'book'},
        // {title: 'Minhas Anotações', component: 'NotesPage', icon: 'create'},
        {title: 'Configurações', component: 'SettingsPage', icon: 'cog'},
        {title: 'Ver Meus Eventos', component: 'MyEventsPage', icon: 'list-box'},
        // {title: 'Utilizar Para o Meu Evento', component: 'UseForMyEventPage', icon: 'phone-portrait'},
        // {title: 'Guia de Uso BeConnect', component: 'FaqPage', icon: 'help-buoy'},
        {title: 'Enviar Feedback', component: 'FeedbackPage', icon: 'chatbubbles'}

        // {title: 'Início', component: 'HomePage', icon: 'home'},
        // {title: 'Minha Conta', component: 'ProfilePage', icon: 'contact'},
        // {title: 'Eventos', component: 'EventsPage', icon: 'ice-cream'},
        // // {title: 'Grupos', component: 'GroupsPage'},
        // {title: 'Calendário', component: 'CalendarPage', icon: 'calendar'},
        // // {title: 'Feed de Notícias', component: 'FeedPage'},
        // // {title: 'Mensagens', component: 'MessagesPage'},
        // // {title: 'Atividades Recentes', component: 'ActivitiesPage'},
        // // {title: 'Sair', component: 'LogoutPage'},
    ];

    constructor(private translate: TranslateService,
                public platform: Platform,
                settings: Settings,
                private config: Config,
                private statusBar: StatusBar,
                private splashScreen: SplashScreen,
                private androidPermissions: AndroidPermissions,
                private oneSignal: OneSignal,
                public alertCtrl: AlertController,
                public _churchs: Churchs,
                public loadingCtrl: LoadingController,
                public user: User,
                private nativeStorage: NativeStorage,
                private menuController: MenuController) {
        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION, this.androidPermissions.PERMISSION.ACCESS_NOTIFICATION_POLICY]);

        // private oneSignal: OneSignal) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            this.oneSignal.startInit('454e77f7-d525-4ade-af8d-6dc5e064e35d', '144808574070');
            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
            this.oneSignal.handleNotificationReceived().subscribe(() => {
                // do something when notification is received
            });
            // this.oneSignal.handleNotificationOpened().subscribe((data) => {
            // do something when a notification is opened
            // this.nav.push('ValidarLeadPage', {
            //     lead_id: data.notification.payload.additionalData.lead_id
            // });
            // });
            this.oneSignal.endInit();

            // this.oneSignal.addSubscriptionObserver().subscribe((state) => {
            //     this.user.setPlayerId(state.to.userId);
            // });

            // this.oneSignal.startInit('e0bbe73b-82e0-4566-a70f-cfbe584a3de4', '921803056883');
            // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
            // this.oneSignal.handleNotificationReceived().subscribe(() => {
            // do something when notification is received
            // });
            // this.oneSignal.handleNotificationOpened().subscribe((data) => {
            // do something when a notification is opened
            // Mostrar tela de validaçao de Lead, preenchendo o parâmetro
            // console.log(data);
            // this.nav.push('ValidarLeadPage', {
            //     lead_id: data.notification.payload.additionalData.lead_id
            // });
            // });
            // this.oneSignal.endInit();
        });
        this.initTranslate();

        firebase.initializeApp(firebaseConfig);
    }

    initTranslate() {
        // Set the default language for translation strings, and the current language.
        this.translate.setDefaultLang('pt-br');
        this.translate.use('pt-br');
        /*const browserLang = this.translate.getBrowserLang();

        if (browserLang) {
            if (browserLang === 'zh') {
                const browserCultureLang = this.translate.getBrowserCultureLang();

                if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
                    this.translate.use('zh-cmn-Hans');
                } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
                    this.translate.use('zh-cmn-Hant');
                }
            } else {
                this.translate.use(this.translate.getBrowserLang());
            }
        } else {
            this.translate.use('pt-BR'); // Set your language here
        }*/

        this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
            this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
        this.menuController.close();
    }

    exitApp() {
        firebase.auth().signOut();
        this.nativeStorage.remove('login');
        this.nativeStorage.remove('church');
        this.nativeStorage.remove('password');
        //this.platform.exitApp();
        this.nav.setRoot("LogarPage");
        this.nav.popToRoot();
    }

    changeChurch() {
        let loading = this.loadingCtrl.create();
        loading.present();

        this._churchs.get()
            .then((result: any) => {
                loading.dismiss();

                let alert = this.alertCtrl.create();
                alert.setTitle('Qual organização você deseja acessar?');

                console.log(result);

                for (let church of result) {
                    alert.addInput({
                        type: 'radio',
                        label: church.name,
                        value: church.id,
                        checked: (church.id == this.user.getChurch())
                    });
                }

                alert.addButton('Cancelar');
                alert.addButton({
                    text: 'OK',
                    handler: data => {
                        if (data != this.user.getChurch()) {
                            this.user.setChurch(data);
                            this.nav.setRoot(MainPage);
                            this.nav.popToRoot();
                        }
                    }
                });
                alert.present();
            })
            .catch((error: any) => {
                loading.dismiss();
                // this.toast.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
            });
    }
}
