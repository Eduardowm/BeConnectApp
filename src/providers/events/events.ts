import {Injectable} from '@angular/core';

import {Event} from '../../models/event';
import {Api} from '../api/api';
import {HttpHeaders} from "@angular/common/http";
import {User} from "../../providers/user/user";

@Injectable()
export class Events {

    constructor(public api: Api, public user: User) {
    }

    get(params?: any) {
        return new Promise((resolve, reject) => {
            this.api.get('church-list', params)
                .subscribe((result: any) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    next(quantity: any = 100) {
        return new Promise((resolve, reject) => {
            let churchId = this.user.getChurch();
            this.api.get('next-events/' + quantity + '/' + churchId)
                .subscribe((result: any) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    nextWeek() {
        return new Promise((resolve, reject) => {
            let churchId = this.user.getChurch();
            this.api.get('events-next-week/' + churchId)
                .subscribe((result: any) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    today() {
        return new Promise((resolve, reject) => {
            let churchId = this.user.getChurch();
            this.api.get('today-events/' + this.user.getUser())
                .subscribe((result: any) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    isCheck(eventId: any) {
        return new Promise((resolve, reject) => {
            let churchId = this.user.getChurch();
            this.api.get('is-check/' + eventId + '/' + this.user.getUser())
                .subscribe((result: any) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    new(data: any) {
        return new Promise((resolve, reject) => {
            let churchId = this.user.getChurch();
            this.api.post('store-event/' + this.user.getUser(), data)
                .subscribe((result: any) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    saveMassCheckin(checkList: any, eventId: any) {
        return new Promise((resolve, reject) => {
            let churchId = this.user.getChurch();
            this.api.post('checkin-all', {people: checkList, id: eventId})
                .subscribe((result: any) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    getSubList(eventId: any) {
        return new Promise((resolve, reject) => {
            let churchId = this.user.getChurch();
            this.api.get('event-list-sub/' + eventId, {}
                // ,{
                // headers: new HttpHeaders()
                //     .set('Access-Control-Allow-Origin', '*')
                //     .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
                //     .set('Accept', 'application/json')
                //     .set('content-type', 'application/json'),
                // withCredentials: true
                // }
            )
                .subscribe((result: any) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }
}
