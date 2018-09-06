import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Camera} from '@ionic-native/camera';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicStorageModule, Storage} from '@ionic/storage';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {OneSignal} from '@ionic-native/onesignal';

import {Items} from '../providers/providers';
import {Churchs} from '../providers/providers';
import {Events} from '../providers/providers';
import {Groups} from '../providers/providers';
import {Settings} from '../providers/providers';
import {User} from '../providers/providers';
import {Api} from '../providers/providers';
import {MyApp} from './app.component';
import {NativeStorage} from "@ionic-native/native-storage";
import {AndroidPermissions} from "@ionic-native/android-permissions";
import {ModalTermsPage} from "../pages/modal-terms/modal-terms";
import {SocialSharing} from "@ionic-native/social-sharing";
import {DatePipe} from '@angular/common';
import {BackgroundGeolocation} from '@ionic-native/background-geolocation';
import {Geolocation} from '@ionic-native/geolocation';
import {LOCALE_ID} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import lcoalePt from '@angular/common/locales/pt';
// import {BrMaskerModule} from "brmasker-ionic-3";
import {LocationTrackerProvider} from '../providers/location-tracker/location-tracker';
import { LocalNotifications } from '@ionic-native/local-notifications';
import {DateFormatPipe} from "../pipes/date-format/date-format";

registerLocaleData(lcoalePt);

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
    /**
     * The Settings provider takes a set of default settings for your app.
     *
     * You can add new settings options at any time. Once the settings are saved,
     * these values will not overwrite the saved values (this can be done manually if desired).
     */
    return new Settings(storage, {
        option1: true,
        option2: 'Ionitron J. Framework',
        option3: '3',
        option4: 'Hello'
    });
}

@NgModule({
    declarations: [
        MyApp,
        ModalTermsPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        IonicModule.forRoot(MyApp, {
            monthNames: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
            monthShortNames: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
            dayNames: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
            dayShortNames: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
        }),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ModalTermsPage
    ],
    providers: [
        Api,
        Items,
        Churchs,
        Events,
        Groups,
        User,
        Camera,
        SplashScreen,
        StatusBar,
        OneSignal,
        NativeStorage,
        SocialSharing,
        DatePipe,
        BackgroundGeolocation,
        Geolocation,
        AndroidPermissions,
        LocalNotifications,
        {provide: Settings, useFactory: provideSettings, deps: [Storage]},
        // Keep this to enable Ionic's runtime error handling during development
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        {provide: LOCALE_ID, useValue: "pt"},
        LocationTrackerProvider,
        DateFormatPipe
    ]
})
export class AppModule {
}
