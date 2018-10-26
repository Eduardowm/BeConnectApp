import 'rxjs/add/operator/toPromise';

import {Injectable} from '@angular/core';

import {Api} from '../api/api';

@Injectable()
export class User {
    _user: any = 1;
    _church: any = 1;
    _role: any;
    _userInfo: any;

    constructor(public api: Api) {
    }

    login(accountInfo: any) {
        return new Promise((resolve, reject) => {
            this.api.post('login', accountInfo)
                .subscribe((result: any) => {
                        if (result.status) {
                            this._loggedIn(result, accountInfo);

                            result.imgProfile = 'https://beconnect.com.br/' + result.imgProfile;
                            this._userInfo = result;
                        }

                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    signup(data: any) {
        return new Promise((resolve, reject) => {
            // let personId = this._user;
            this.api.post('store-person', data)
                .subscribe((result: any) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    getGroups() {
        return new Promise((resolve, reject) => {
            let personId = this._user;
            this.api.get('my-groups/' + personId)
                .subscribe((result: any) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    forgotPassword(email: any) {
        return new Promise((resolve, reject) => {
            this.api.get('recover-password/' + email, {})
                .subscribe((result: any) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    getCode(code: any) {
        return new Promise((resolve, reject) => {
            this.api.get('get-code/' + code, {})
                .subscribe((result: any) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    checkin(eventId: any, visitor: boolean = false) {
        return new Promise((resolve, reject) => {
            this.api.get('check-in/' + eventId + '/' + this.getUser() + '/' + (visitor ? 1 : 0), {})
                .subscribe((result: any) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    cancelCheckin(eventId: any, visitor: boolean = false) {
        return new Promise((resolve, reject) => {
            this.api.get('checkout/' + eventId + '/' + this.getUser(), {})
                .subscribe((result: any) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    changePassword(person_id, password) {
        return new Promise((resolve, reject) => {
            this.api.post('change-password', {person_id, password})
                .subscribe((result: any) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    /**
     * Log the user out, which forgets the session
     */
    logout() {
        this._user = null;
    }

    /**
     * Process a login/signup response to store user data
     */
    _loggedIn(resp, accountInfo) {
        this._user = resp.person_id;
        this._church = accountInfo.church;
        this._role = resp.role;
        // this.oneSignal.sendTag('empresa_id', resp.usuario.empresa_id);
    }

    getUser() {
        return this._user;
    }

    getChurch() {
        return this._church;
    }

    setChurch(v: any) {
        this._church = v;
    }

    getRole() {
        return this._role;
    }

    getUserInfo() {
        return this._userInfo;
    }
}
