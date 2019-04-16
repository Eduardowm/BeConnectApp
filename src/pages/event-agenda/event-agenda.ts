import {Component} from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {Events} from "../../providers/events/events";
import {DatePipe} from '@angular/common';

/**
 * Generated class for the EventAgendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-event-agenda',
    templateUrl: 'event-agenda.html',
})
export class EventAgendaPage {

    tab: string = 'Full Agenda';
    tracks: any;
    searchVisible: boolean = false;
    days: any = [];
    selectedDay: any = null;
    sessions: any = [
        // {
        //     start_date: Date.now(),
        //     end_date: Date.now(),
        //     name: 'Breakfast',
        //     location: 'Coral Lounge',
        //     people_confirmed_count: 107,
        //     likes_count: 25,
        //     comments_count: 17,
        //     track_class: 'blue-circle',
        //     description: 'Esta é uma seção de lanche!'
        // },
        // {
        //     start_date: Date.now(),
        //     end_date: Date.now(),
        //     name: 'Welcome by general and program chairs',
        //     location: 'South Pacific Ballroom',
        //     people_confirmed_count: 111,
        //     likes_count: 25,
        //     comments_count: 17,
        //     track_class: 'blue-circle',
        //     description: 'Esta é uma seção de lanche!'
        // },
        // {
        //     start_date: Date.now(),
        //     end_date: Date.now(),
        //     name: 'Keynote',
        //     location: null,
        //     people_confirmed_count: 55,
        //     likes_count: 17,
        //     comments_count: 9,
        //     track_class: 'purple-circle',
        //     description: 'Esta é uma seção de lanche!'
        // },
    ];
    event: any = null;
    selectedDaySessions: any = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public modalCtrl: ModalController,
                public loadingCtrl: LoadingController,
                public events: Events,
                private datePipe: DatePipe) {
        this.generateDays();
        this.event = this.navParams.get('event');
        this.load();
    }

    generateDays() {
        this.selectedDay = this.days[0];
        this.days = [
            {weekDay: 'Sex', monthDay: 6},
            {weekDay: 'Sáb', monthDay: 7},
            {weekDay: 'Dom', monthDay: 8},
            {weekDay: 'Seg', monthDay: 9},
            {weekDay: 'Ter', monthDay: 10},
            {weekDay: 'Qua', monthDay: 11},
            {weekDay: 'Qui', monthDay: 12},
        ];
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EventAgendaPage');
    }

    toggleSearchbar() {
        this.searchVisible = !this.searchVisible;
    }

    onSearchInput($event) {
    }

    onSearchCancel($event) {
    }

    openSession(session) {
        this.navCtrl.push("ModalSessionViewPage", {session});
    }

    load() {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.events.sessions(this.event.id)
            .then((result: any) => {
                loading.dismiss();
                if (result.status) {
                    this.sessions = result.sessions;
                }
            })
            .catch((error: any) => {
                loading.dismiss();
                // this.toast.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
            });
    }

    // organizeNextWeekEvents() {
    //     let tmp: any = [
    //         // {
    //         //     week_day: 'Segunda-Feira',
    //         //     date: '01/01/1980',
    //         //     events: [
    //         //         'Evento 1', 'Evento 2'
    //         //     ],
    //         //     events_counter: 2
    //         // }
    //     ];
    //
    //     /*
    //     {"name":"Encontro das XYZ",
    //                                     "id":35,"createdBy_id":"Luiz Admin","event_date":"2018-04-16 10:00:00","group_id":3,"description":"",
    //                                     "imgEvent":null,"endTime":"","street":"Rua Pastor Maur\u00edcio Ara\u00fajo de Lima","number":"123",
    //                                     "city":"Votorantim","frequency":"Di\u00e1rio","deleted_at":null,
    //                                     "img_user":"https:\/\/graph.facebook.com\/v2.8\/1091593140969198\/picture?type=normal","eventDate":"16-04-2018","sub":2}
    //      */
    //
    //     for (let item of this.nextWeekEvents) {
    //         let weekDay = this.toTitleCase(this.datePipe.transform(item.event_date, 'dddd'));//'EEEE'));
    //         let object = null;
    //
    //         for (let entry of tmp) {
    //             if (entry.week_day == weekDay) {
    //                 object = entry;
    //                 break;
    //             }
    //         }
    //
    //         if (!object) {
    //             object = {
    //                 week_day: weekDay,
    //                 date: this.datePipe.transform(item.event_date, 'DD/MM/YYYY'),//'dd/MM/yy'),
    //                 events: [],
    //                 events_counter: 0
    //             };
    //             tmp.push(object);
    //         }
    //
    //         object.events.push(item);
    //         object.events_counter++;
    //     }
    //
    //     this.nextWeekCalendarEvents = tmp;
    // }

    selectDay(day) {
        this.selectedDay = day;
        this.filterSelectedDaySessions();
    }

    filterSelectedDaySessions() {
        // Rodar a lista de eventos e procurar os do mês atual
        let tmp: any = [];
        this.selectedDaySessions = [];

        for (let item of this.sessions) {
            let itemDate = this.toTitleCase(this.datePipe.transform(item.event_date, 'DD-MM-YYYY'));
            if (this.selectedDay.date == itemDate) {
                tmp.selectedDaySessions(item);
            }
        }
    }

    toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}
