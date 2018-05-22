import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Groups} from "../../providers/groups/groups";

/**
 * Generated class for the GroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-groups',
    templateUrl: 'groups.html',
})
export class GroupsPage {
    groups: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public _groups: Groups,
                public loadingCtrl: LoadingController) {
        let loading = this.loadingCtrl.create();
        loading.present();

        _groups.get()
            .then((result: any) => {
                loading.dismiss();
                this.groups = result;
            })
            .catch((error: any) => {
                loading.dismiss();
                // this.toast.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
            });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GroupsPage');
    }

    openGroup(item) {
        this.navCtrl.push('GroupViewPage', {group: item});
    }
}
