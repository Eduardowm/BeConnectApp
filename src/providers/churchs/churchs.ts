import {Injectable} from '@angular/core';

import {Church} from '../../models/church';
import {Api} from '../api/api';
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class Churchs {

    constructor(public api: Api) {
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

}
