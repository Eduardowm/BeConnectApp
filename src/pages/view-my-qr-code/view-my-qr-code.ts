import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../providers/user/user";
import {NativeStorage} from "@ionic-native/native-storage";
import {DomSanitizer} from '@angular/platform-browser';
import {File} from '@ionic-native/file';

/**
 * Generated class for the ViewMyQrCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-view-my-qr-code',
    templateUrl: 'view-my-qr-code.html',
})
export class ViewMyQrCodePage {
    qrCodeImage: any = 'assets/img/logo-marca-escuro.png';

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public user: User,
                private nativeStorage: NativeStorage,
                private sanitizer: DomSanitizer,
                private file: File) {
        if (this.navParams.get('cache')) {
            this.nativeStorage.getItem('qrcode--').then(
                data => {
                    // console.log(data);
                    // this.qrCodeImage = data;
                    this.file.readAsDataURL(this.file.dataDirectory, 'qrcode.png').then(res => {
                        this.qrCodeImage = res;
                    });
                }
            );
        } else {
            if (user.getUserInfo().qrCode) {
                this.qrCodeImage = 'http://beconnect.com.br/' + user.getUserInfo().qrCode;
            } else {
                this.user.getPersonQRCode(user.getUser())
                    .then((result: any) => {
                        if (result.status) {
                            this.qrCodeImage = 'http://beconnect.com.br/qrcodes/' + user.getUser() + '.png';
                        }
                    })
                    .catch((error: any) => {
                        console.log("Error", error);
                    });
            }
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ViewMyQrCodePage');
    }

    createImageFromBlob(image: Blob) {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            let data = reader.result;
            let unsafeImageUrl = URL.createObjectURL(data);
            let imageUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);

            console.log(data, unsafeImageUrl, imageUrl);
            this.qrCodeImage = imageUrl.toString();
        }, false);

        if (image) {
            reader.readAsDataURL(image);
        }
    }
}
