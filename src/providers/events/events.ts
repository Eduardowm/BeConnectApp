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

    next() {
        return new Promise((resolve, reject) => {
            let churchId = this.user.getChurch();
            this.api.get('next-events/5/' + churchId)
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

}
