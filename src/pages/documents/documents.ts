import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DocumentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html',
})
export class DocumentsPage {
    documentGroups: any = [
        {name: 'Documents', documents: [
            {image_url: 'assets/img/appicon.png', name: 'Lorem Ipsum', size: '1 MB', url: ''},
            {image_url: 'assets/img/appicon.png', name: 'Lorem Ipsum', size: '1 MB', url: ''},
            {image_url: 'assets/img/appicon.png', name: 'Lorem Ipsum', size: '1 MB', url: ''},
        ]}
    ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentsPage');
  }

    reload() {}
    share() {}
}
