import {Injectable} from '@angular/core';

// import {Group} from '../../models/groups';
import {Api} from '../api/api';
// import {HttpHeaders} from "@angular/common/http";
import {User} from "../user/user";

@Injectable()
export class Groups {

    constructor(public api: Api, public user: User) {
    }

    get() {
        return new Promise((resolve, reject) => {
            this.api.get('groups/' + this.user.getChurch())
                .subscribe((result: any) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    getInfo(id: any) {
        return new Promise((resolve, reject) => {
            this.api.get('getGroupInfo/' + id)
                .subscribe((result: any) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    people(groupId: number) {
        return new Promise((resolve, reject) => {
            this.api.get('group-people', groupId)
                .subscribe((result: any) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

}
