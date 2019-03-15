import {Injectable} from '@angular/core';
import {Api} from '../api/api';

/*
  Generated class for the SessionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Sessions {

    constructor(public api: Api) {
    }

    getSubList(sessionId: any) {
        return new Promise((resolve, reject) => {
            this.api.get('session-list-sub/' + sessionId, {}
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
