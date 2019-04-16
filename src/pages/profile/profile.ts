import {Component} from '@angular/core';
import {ActionSheetController, AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {User} from "../../providers/user/user";
import {Camera, CameraOptions} from '@ionic-native/camera';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {
    user: any = {
        imgProfile: 'assets/img/church-member.jpg',
        name: 'User',
        email: 'mail@example.com',
        tel: '+55 01 2345-67889',
        cel: '+55 01 2345-67889',
        role: 'Member'
    };

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public userApi: User,
                public alertCtrl: AlertController,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController,
                public actionSheetCtrl: ActionSheetController,
                public camera: Camera) {
        this.user = userApi.getUserInfo();
        // this.user.imgProfile = 'https://beconnect.com.br/' + this.user.imgProfile;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProfilePage');
    }

    changePassword() {
        let confirm = this.alertCtrl.create({
            title: 'ALTERAR SENHA',
            buttons: [
                {
                    text: 'Cancelar',
                    cssClass: 'alert-btn-cancel',
                },
                {
                    text: 'Confirmar',
                    cssClass: 'alert-btn-confirm',
                    handler: (data) => {
                        this.salvarSenha(data);
                    }
                }
            ]
        });

        confirm.addInput({
            type: 'password',
            placeholder: 'Senha Atual',
            name: 'senha_atual'
        });

        confirm.addInput({
            type: 'password',
            placeholder: 'Nova Senha',
            name: 'nova_senha'
        });

        confirm.present();
    }

    salvarSenha(data) {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.userApi.changePassword(this.userApi.getUser(), data.nova_senha)
            .then((result: any) => {
                loading.dismiss();

                if (result.status) {
                    this.toastCtrl.create({
                        message: "Senha alterada com sucesso!",
                        duration: 3000,
                        position: 'top'
                    }).present();
                    this.navCtrl.popToRoot();
                } else {
                    this.toastCtrl.create({
                        message: result.msg,
                        duration: 3000,
                        position: 'top'
                    }).present();
                }
            })
            .catch((error: any) => {
                console.log(error);
                loading.dismiss();
            });
    }

    mostrarMenuFotos() {
        // this.actionSheetCtrl.create({
        //     title: 'O que você deseja fazer?',
        //     buttons: [
        //         {
        //             text: 'Alterar foto',
        //             handler: () => {
        //                 this.pegarFoto();
        //             }
        //         }, {
        //             text: 'Alterar imagem de fundo',
        //             handler: () => {
        //                 this.pegarImagemMenu();
        //             }
        //         }, {
        //             text: 'Cancelar',
        //             role: 'cancel'
        //         }
        //     ]
        // }).present();
    }

    pegarFoto() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((data) => {
            this.salvarCampo('imagem_arquivo', data);
        }, (err) => {
            console.log("Camera::GetPicture - Error", err);
        });
    }

    pegarImagemMenu() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((data) => {
            this.salvarCampo('menu_imagem_arquivo', data);
        }, (err) => {
            console.log("Camera::GetPicture - Error", err);
        });
    }

    salvarCampo(campo, data) {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.user.salvarCampo(campo, data)
            .then((result: any) => {
                loading.dismiss();

                if (result.sucesso) {
                    this.user.setInfo(result.usuario);
                    this.toastCtrl.create({
                        message: "Campo alterado com sucesso!",
                        duration: 3000,
                        position: 'top'
                    }).present();
                    // this.navCtrl.popToRoot();
                } else {
                    this.toastCtrl.create({
                        message: result.mensagem,
                        duration: 3000,
                        position: 'top'
                    }).present();
                }
            })
            .catch((error: any) => {
                console.log(error);
                loading.dismiss();
            });
    }

    alterarCampo(campo) {
        // let confirm = this.alertCtrl.create({
        //     title: 'ALTERAR',
        //     buttons: [
        //         {
        //             text: 'Cancelar',
        //             cssClass: 'alert-btn-cancel',
        //         },
        //         {
        //             text: 'Confirmar',
        //             cssClass: 'alert-btn-confirm',
        //             handler: (data) => {
        //                 this.salvarCampo(campo, data);
        //             }
        //         }
        //     ]
        // });
        //
        // switch (campo) {
        //     case 'nome' : {
        //         confirm.addInput({
        //             type: 'text',
        //             placeholder: 'Nome',
        //             name: 'nome',
        //             value: this.user.getInfo().nome
        //         });
        //         break;
        //     }
        //
        //     case 'email' : {
        //         confirm.addInput({
        //             type: 'text',
        //             placeholder: 'E-mail',
        //             name: 'email',
        //             value: this.user.getInfo().email
        //         });
        //         break;
        //     }
        //
        //     case 'telefone' : {
        //         confirm.addInput({
        //             type: 'text',
        //             placeholder: 'Telefone',
        //             name: 'telefone',
        //             value: this.user.getInfo().telefone
        //         });
        //         break;
        //     }
        //
        //     default : {
        //         break;
        //     }
        // }
        //
        // confirm.present();
    }
}
