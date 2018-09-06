import {Injectable} from '@angular/core';

import {Api} from '../api/api';

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
