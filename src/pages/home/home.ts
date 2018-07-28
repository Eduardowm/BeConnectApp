import {Component} from '@angular/core';
import {ActionSheetController, AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Events} from "../../providers/events/events";
import {User} from "../../providers/providers";
import {DatePipe} from '@angular/common';
import {BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse} from '@ionic-native/background-geolocation';
import {LocationTrackerProvider} from "../../providers/location-tracker/location-tracker";

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {
    pet: string = "inicio";
    feed: string = "geral";
    activities: string = "usuarios";

    nextEvents: any;
    nextEvent: any = {
        "name": "Evento 1",
        "event_date": "2019-06-25 00:00:00"
    };

    todayEvents: any;

    userGroups: any;

    date: any;
    daysInThisMonth: any;
    daysInLastMonth: any;
    daysInNextMonth: any;
    monthNames: string[];
    currentMonth: any;
    currentYear: any;
    currentDate: any;

    feeds: any = [
        /*{
            icon: 'flame',
            color: 'secondary',
            title: 'Pedido de Oração',
            description: 'Ore por minha família nessa semana',
            elapsed_time: '20min'
        },
        {
            icon: 'flash',
            color: 'danger',
            title: 'Almoço comunitário',
            description: 'Teremos almoço comunitário nesse domingo. Não deixe de levar seu prato e aproveitar o tempo com os irmãos.',
            elapsed_time: '24 min'
        },
        {
            icon: 'megaphone',
            color: 'primary',
            title: 'Pedido de Oração',
            description: 'Ore pelo Brasil!',
            elapsed_time: '30 min'
        },
        {
            icon: 'megaphone',
            color: 'secondary',
            title: 'Novo usuário registrado',
            description: 'João da Silva',
            elapsed_time: '40 min'
        },
        {
            icon: 'add',
            color: 'warning',
            title: 'Novo usuário registrado',
            description: 'João da Silva',
            elapsed_time: '40 min'
        },*/
    ];

    nextWeekEvents: any;
    nextWeekCalendarEvents: any = [
        {
            week_day: 'Segunda-Feira',
            date: '01/01/1980',
            events: [
                'Evento 1', 'Evento 2'
            ],
            events_counter: 2
        },
        {
            week_day: 'Terça-Feira',
            date: '01/01/1980',
            events: [
                'Evento 1', 'Evento 2'
            ],
            events_counter: 2
        },
        {
            week_day: 'Quarta-Feira',
            date: '01/01/1980',
            events: [],
            events_counter: 0
        },
        {
            week_day: 'Quinta-Feira',
            date: '01/01/1980',
            events: [
                'Evento 1', 'Evento 2'
            ],
            events_counter: 2
        },
        {
            week_day: 'Sexta-Feira',
            date: '01/01/1980',
            events: [],
            events_counter: 0
        },
        {
            week_day: 'Sábado',
            date: '01/01/1980',
            events: [
                'Evento 1', 'Evento 2'
            ],
            events_counter: 2
        },
        {
            week_day: 'Domingo',
            date: '01/01/1980',
            events: [
                'Evento 1', 'Evento 2'
            ],
            events_counter: 2
        },
    ];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public loadingCtrl: LoadingController,
                public _events: Events,
                public user: User,
                public actionSheetCtrl: ActionSheetController,
                public alertCtrl: AlertController,
                public toastCtrl: ToastController,
                private datePipe: DatePipe,
                private backgroundGeolocation: BackgroundGeolocation,
                public locationTracker: LocationTrackerProvider) {
        this.date = new Date();
        this.monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        this.getDaysOfMonth();
        // this.loadEventThisMonth();

        let loading = this.loadingCtrl.create();
        loading.present();

        _events.next()
            .then((result: any) => {
                loading.dismiss();
                this.nextEvents = result;
                this.nextEvent = this.nextEvents[0];
            })
            .catch((error: any) => {
                loading.dismiss();
                // this.toast.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
            });

        _events.nextWeek()
            .then((result: any) => {
                this.nextWeekEvents = result;
                this.organizeNextWeekEvents();
            })
            .catch((error: any) => {
                // this.toast.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
            });

        _events.today()
            .then((result: any) => {
                if (result.status) {
                    this.todayEvents = result;
                    this.locationTracker.startTracking(result);
                    // this.startBackgroundGeolocation();
                }
            })
            .catch((error: any) => {
                // this.toast.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
            });

        user.getGroups()
            .then((result: any) => {
                // loading.dismiss();
                if (result.status) {
                    this.userGroups = result.groups;
                }
            })
            .catch((error: any) => {
                // loading.dismiss();
                // this.toast.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
            });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }

    getDaysOfMonth() {
        this.daysInThisMonth = new Array();
        this.daysInLastMonth = new Array();
        this.daysInNextMonth = new Array();
        this.currentMonth = this.monthNames[this.date.getMonth()];
        this.currentYear = this.date.getFullYear();
        if (this.date.getMonth() === new Date().getMonth()) {
            this.currentDate = new Date().getDate();
        } else {
            this.currentDate = 999;
        }

        var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
        for (var i1 = prevNumOfDays - (firstDayThisMonth - 1); i1 <= prevNumOfDays; i1++) {
            this.daysInLastMonth.push(i1);
        }

        var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
        for (var i2 = 0; i2 < thisNumOfDays; i2++) {
            this.daysInThisMonth.push(i2 + 1);
        }

        var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
        // var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0).getDate();
        for (var i3 = 0; i3 < (6 - lastDayThisMonth); i3++) {
            this.daysInNextMonth.push(i3 + 1);
        }
        var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
        if (totalDays < 36) {
            for (var i4 = (7 - lastDayThisMonth); i4 < ((7 - lastDayThisMonth) + 7); i4++) {
                this.daysInNextMonth.push(i4);
            }
        }
    }

    goToLastMonth() {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
        this.getDaysOfMonth();
    }

    goToNextMonth() {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
        this.getDaysOfMonth();
    }

    abrirProximosEventos() {
        this.navCtrl.push('EventsPage');
    }

    abrirProximoEvento() {
        let nextEvent = this.nextEvent;
        this.navCtrl.push('EventViewPage', {event: nextEvent});
    }

    openNewFeedModal() {
        let confirm = this.alertCtrl.create({
            title: 'Criar Feed',
            buttons: [
                {
                    text: 'Cancelar',
                    cssClass: 'alert-btn-cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'Confirmar',
                    cssClass: 'alert-btn-confirm',
                    handler: () => {
                        // todo
                    }
                }
            ]
        });

        confirm.addInput({
            type: 'text',
            placeholder: 'Título',
            name: 'title'
        });

        confirm.addInput({
            type: 'textarea',
            placeholder: 'Mensagem',
            name: 'message'
        });

        confirm.present();
    }

    openMenu() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Ações',
            buttons: [
                {
                    text: 'Criar Feed',
                    icon: 'add',
                    handler: () => {
                        this.openNewFeedModal();
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }

    boostFeed() {
        this.toastCtrl.create({
            message: 'Feed impulsionado com sucesso!',
            duration: 3000,
            position: 'top'
        }).present();
    }

    organizeNextWeekEvents() {
        let tmp: any = [
            // {
            //     week_day: 'Segunda-Feira',
            //     date: '01/01/1980',
            //     events: [
            //         'Evento 1', 'Evento 2'
            //     ],
            //     events_counter: 2
            // }
        ];

        /*
        {"name":"Encontro das XYZ",
                                        "id":35,"createdBy_id":"Luiz Admin","event_date":"2018-04-16 10:00:00","group_id":3,"description":"",
                                        "imgEvent":null,"endTime":"","street":"Rua Pastor Maur\u00edcio Ara\u00fajo de Lima","number":"123",
                                        "city":"Votorantim","frequency":"Di\u00e1rio","deleted_at":null,
                                        "img_user":"https:\/\/graph.facebook.com\/v2.8\/1091593140969198\/picture?type=normal","eventDate":"16-04-2018","sub":2}
         */

        for (let item of this.nextWeekEvents) {
            let weekDay = this.toTitleCase(this.datePipe.transform(item.event_date, 'EEEE'));
            let object = null;

            for (let entry of tmp) {
                if (entry.week_day == weekDay) {
                    object = entry;
                    break;
                }
            }

            if (!object) {
                object = {
                    week_day: weekDay,
                    date: this.datePipe.transform(item.event_date, 'dd/MM/yy'),
                    events: [],
                    events_counter: 0
                };
                tmp.push(object);
            }

            object.events.push(item);
            object.events_counter++;
        }

        this.nextWeekCalendarEvents = tmp;
    }

    toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    private getLocations(latitude, longitude) {
        alert(latitude + " - " + longitude);
        let i = 0;

        while (i < this.todayEvents.coords.length) {
            //Se a latitude do usuário for igual a latitude do evento,
            // e se a longitude for igual a longitude do evento
            if (latitude == this.todayEvents.coords[i].lat && longitude == this.todayEvents.coords[i].lng) {
                let start = this.todayEvents.coords[i].startTime; //Horário de inicio do evento
                let start_hour = start.charAt(0) + start.charAt(1); //Hora de inicio do evento
                let start_minutes = start.charAt(3) + start.charAt(4); //Minuto de inicio do evento
                let end = this.todayEvents.coords[i].endTime; //Hora de término do evento (Pode estar em branco)
                let date = new Date(); //object date
                let hour = date.getHours(); //Hora Atual
                let minutes = date.getMinutes(); //Minuto Atual

                // Se a hora atual for igual ao começo do evento, e alguns minutos após o início do evento
                if (hour == start_hour && minutes >= start_minutes) {
                    this.checkin(this.todayEvents.coords[i].event_id);
                }

                // Se a hora atual for maior que a hora de início do evento
                else if (hour > start_hour) {
                    // Se não houver término previsto
                    if (end == "") {
                        this.checkin(this.todayEvents.coords[i].event_id);
                    } else {
                        // Separa a hora final
                        let end_hour = end.charAt(0) + end.charAt(1);

                        // Separa o minuto final
                        let end_minutes = end.charAt(3) + end.charAt(4);

                        // Se a hora atual for menor que a hora de término
                        if (hour < end_hour) {
                            this.checkin(this.todayEvents.coords[i].event_id);
                        }

                        // Na hora final alguns minutos antes
                        else if (hour == end_hour && minutes <= end_minutes) {
                            this.checkin(this.todayEvents.coords[i].event_id);
                        }

                        // Na hora final do evento, porem alguns minutos depois do término
                        // ou
                        // algumas horas depois do fim,

                        // Pode retirar este 'else if', foi só para teste e deixar o código mais claro
                        // else if (hour == end_hour && minutes > end_minutes || hour > end_hour) {
                        //     console.log('check-in negado');
                        // }
                    }
                }

                // Antes da hora correta

                // Pode retirar este 'else', foi só para teste e deixar o código mais claro
                // else {
                //     console.log('check-in negado');
                // }

            }

            i++;
        }
    }

    private startBackgroundGeolocation() {
        const config: BackgroundGeolocationConfig = {
            desiredAccuracy: 0,
            stationaryRadius: 20,
            distanceFilter: 10,
            interval: 2000, //5 minutos
            notificationTitle: 'Beconnect',
            notificationText: 'Monitorando localização',
            debug: false, //  enable this hear sounds for background-geolocation life-cycle.
            stopOnTerminate: false, // enable this to clear background location settings when the app terminates
        };

        this.backgroundGeolocation.configure(config)
            .subscribe((location: BackgroundGeolocationResponse) => {
                this.getLocations(location.latitude, location.longitude);
                // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
                // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
                // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
                //this.backgroundGeolocation.finish(); // FOR IOS ONLY
            });

        // start recording location
        this.backgroundGeolocation.start();

        // If you wish to turn OFF background-tracking, call the #stop method.
        //this.backgroundGeolocation.stop();
    }

    checkin(eventId) {
        this.user.checkin(eventId)
            .then((result: any) => {
                if (result.status) {
                    this.toastCtrl.create({
                        message: 'Checkin realizado com sucesso!',
                        duration: 3000,
                        position: 'top'
                    }).present();
                } else {
                    this.toastCtrl.create({
                        message: (result.msg ? result.msg : 'Não foi possível realizar o checkin.'),
                        duration: 3000,
                        position: 'top'
                    }).present();
                }
            })
            .catch((error: any) => {
                // this.toast.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
            });
    }

    openEvent(item) {
        this.navCtrl.push('EventViewPage', {event: item});
    }
}
