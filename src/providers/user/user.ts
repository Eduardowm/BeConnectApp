import 'rxjs/add/operator/toPromise';

import {Injectable} from '@angular/core';

import {Api} from '../api/api';
import {HttpClient} from "@angular/common/http";
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';

@Injectable()
export class User {
    _user: any = 1;
    _church: any = 1;
    _role: any;
    _userInfo: any;
    private fileTransfer: FileTransferObject;

    constructor(public api: Api,
                public http: HttpClient,
                private file: File,
                private transfer: FileTransfer) {
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

    checkin(eventId: any, visitor: boolean = false, person_id: any = null) {
        return new Promise((resolve, reject) => {
            this.api.get('check-in/' + eventId + '/' + (person_id ? person_id : this.getUser()) + '/' + (visitor ? 1 : 0), {})
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

    getSocialToken(token) {
        return new Promise((resolve, reject) => {
            this.api.get('get-social-token/' + token)
                .subscribe((result: any) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    getPersonQRCode(person_id) {
        return new Promise((resolve, reject) => {
            this.api.get('qrcode/' + person_id)
                .subscribe((result: any) => {
                        resolve(result);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    downloadPersonQRCode(person_id) {
        // return new Promise((resolve, reject) => {
        //     this.http.get('http://beconnect.com.br/qrcodes/' + person_id + '.png', {responseType: 'blob'}).subscribe((result: any) => {
        //             resolve(result);
        //         },
        //         (error) => {
        //             reject(error);
        //         });
        // });

        return new Promise((resolve, reject) => {
            this.fileTransfer = this.transfer.create();
            this.fileTransfer.download('https://beconnect.com.br/qrcodes/' + person_id + '.png', this.file.dataDirectory + 'qrcode.png').then((entry) => {
                resolve(entry);
            }, (error) => {
                reject(error);
            });
        });
    }

    feedback(person_id, feedback) {
        return new Promise((resolve, reject) => {
            this.api.post('feedback-store', {person_id, feedback})
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

    isAdmin() {
        return this.getRole() == "Líder" || this.getRole() == "Administrador";
    }

    // 1 Líder
    // 2 Membro
    // 3 Visitante
    // 5 Administrador
}
