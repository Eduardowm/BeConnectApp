import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Events} from "../../providers/events/events";
import {DatePipe} from '@angular/common';

@IonicPage()
@Component({
    selector: 'page-calendar',
    templateUrl: 'calendar.html',
})
export class CalendarPage {
    date: any;
    daysInThisMonth: any;
    daysInLastMonth: any;
    daysInNextMonth: any;
    monthNames: string[];
    usMonthNames: string[];
    currentMonth: any;
    currentYear: any;
    currentDate: any;

    nextEvents: any = [];
    nextCalendarEvents: any = [
        {
            date: '27 de Junho de 2018',
            events: [
                {name: 'Evento 1', time: '12:00'},
                {name: 'Evento 2', time: '12:00'},
            ]
        },
        {
            date: '30 de Setembro de 2018',
            events: [
                {name: 'Evento 1', time: '12:00'},
                {name: 'Evento 2', time: '12:00'},
            ]
        },
    ];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public _events: Events,
                public loadingCtrl: LoadingController,
                private datePipe: DatePipe) {
        this.date = new Date();
        this.monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        this.usMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.getDaysOfMonth();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CalendarPage');
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

        let loading = this.loadingCtrl.create();
        loading.present();

        this._events.next(300)
            .then((result: any) => {
                loading.dismiss();
                this.nextEvents = result;
                this.organizeEvents();
            })
            .catch((error: any) => {
                loading.dismiss();
                // this.toast.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
            });
    }

    goToLastMonth() {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
        this.getDaysOfMonth();
    }

    goToNextMonth() {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
        this.getDaysOfMonth();
    }

    abrirEvento(event) {
        this.navCtrl.push('EventViewPage', {event: event});
    }

    getKeyByValue(mArray, mValue) {
        let ret: any = null;

        Object.keys(mArray).forEach(key => {
            // console.log("Comparing ", mArray[key], mValue);
            if (mArray[key] == mValue) {
                ret = key;
            }
        });

        return ret;
    }

    organizeEvents() {
        /*
{
  +"name": "Evento da API"
  +"id": 31
  +"createdBy_id": 1
  +"event_date": "2018-04-04 10:00:00"
  +"group_id": "3"
  +"description":"Descrição"
  +"imgEvent":"uploads\/event\/33-Evento de Teste.jpg"
  +"endTime": ""
  +"street": "Rua Luzerne Proença Arruda"
  +"number": "137"
  +"city": "Sorocaba"
  +"frequency": "Semanal"
  +"deleted_at": null
}
         */

        // Rodar a lista de eventos e procurar os do mês atual
        let tmp: any = [];
        this.nextCalendarEvents = [];

        for (let item of this.nextEvents) {
            let eventMonth = this.toTitleCase(this.datePipe.transform(item.event_date, 'MMMM'));
            if (this.currentMonth == eventMonth) { //this.monthNames[this.getKeyByValue(this.usMonthNames, eventMonth)]) {
                tmp.push(item);
            }
        }

        // Separar eles e inserir na lista da view
        for (let item of tmp) {
            let date = this.datePipe.transform(item.event_date, 'longDate');

            let object = null;
            for (let entry of this.nextCalendarEvents) {
                if (entry.date == date) {
                    object = entry;
                    break;
                }
            }

            if (!object) {
                object = {
                    date: date,
                    events: []
                };
                this.nextCalendarEvents.push(object);
            }

            object.events.push({id: item.id, name: item.name, time: this.datePipe.transform(item.event_date, 'HH:mm')});
        }
    }

    toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}
