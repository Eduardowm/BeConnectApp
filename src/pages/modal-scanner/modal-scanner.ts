import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {User} from "../../providers/user/user";
import {Events} from "../../providers/events/events";

/**
 * Generated class for the ModalScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-modal-scanner',
    templateUrl: 'modal-scanner.html',
})
export class ModalScannerPage {

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public loadingCtrl: LoadingController,
                private barcodeScanner: BarcodeScanner,
                public toastCtrl: ToastController,
                public user: User,
                public viewCtrl: ViewController,
                public eventsApi: Events) {
        let event = this.navParams.get('event');
        this.barcodeScanner.scan().then(barcodeData => {
            console.log('Barcode data', barcodeData);
            if (!barcodeData.cancelled && barcodeData.format == "QR_CODE" && barcodeData.text) {
                let code = barcodeData.text;

                let loading = this.loadingCtrl.create();
                loading.present();

                this.eventsApi.isSubscribed(event.id, code)
                    .then((result: any) => {
                        loading.dismiss();

                        this.toastCtrl.create({message: result.msg, position: 'top', duration: 4000}).present();
                        this.viewCtrl.dismiss();
                    })
                    .catch((error: any) => {
                        console.log(error);
                        loading.dismiss();
                        this.viewCtrl.dismiss();
                    });
            }

        }).catch(err => {
            alert(err);
            console.log('Error', err);
            this.viewCtrl.dismiss();
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ModalScannerPage');
    }

}
