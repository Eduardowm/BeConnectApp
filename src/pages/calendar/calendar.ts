import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

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
    currentMonth: any;
    currentYear: any;
    currentDate: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.date = new Date();
        this.monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
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
    }

    goToLastMonth() {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
        this.getDaysOfMonth();
    }

    goToNextMonth() {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
        this.getDaysOfMonth();
    }

    abrirEvento() {
        this.navCtrl.push('EventViewPage', {});
    }
}
