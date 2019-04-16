import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {User} from "../../providers/user/user";

@IonicPage()
@Component({
    selector: 'page-feedback',
    templateUrl: 'feedback.html',
})
export class FeedbackPage {
    data: any = {
        feedback: ''
    };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public user: User,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController) {
    }

    sendFeedback() {
        if (this.data.feedback == '') {
            return this.toastCtrl.create({
                message: "O campo Feedback precisa ser preenchido.",
                duration: 3000,
                position: 'top'
            }).present();
        }

        let loading = this.loadingCtrl.create();
        loading.present();

        this.user.feedback(this.user.getUser(), this.data.feedback)
            .then((resp: any) => {
                loading.dismiss();

                if (resp.status) {
                    this.toastCtrl.create({
                        message: "Feedback enviado com sucesso!",
                        duration: 3000,
                        position: 'top'
                    }).present();
                    this.data.feedback = '';
                } else {
                    this.toastCtrl.create({
                        message: resp.msg,
                        duration: 8000,
                        position: 'top'
                    }).present();
                }
            })
            .catch((error: any) => {
                loading.dismiss();
            });
    }
}
