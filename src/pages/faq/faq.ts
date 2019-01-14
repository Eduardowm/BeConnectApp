import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the FaqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-faq',
    templateUrl: 'faq.html',
})
export class FaqPage {
    topics: any = [
        {name: 'Perguntas Frequentes', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque cum eaque enim esse iusto magnam modi officia, quisquam sint tempora veniam veritatis! Consequatur doloribus esse molestiae ratione sapiente, tempora.'},
        {name: 'Meu Perfil', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque cum eaque enim esse iusto magnam modi officia, quisquam sint tempora veniam veritatis! Consequatur doloribus esse molestiae ratione sapiente, tempora.'},
        {name: 'Download do Aplicativo', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque cum eaque enim esse iusto magnam modi officia, quisquam sint tempora veniam veritatis! Consequatur doloribus esse molestiae ratione sapiente, tempora.'},
        {name: 'Outros', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque cum eaque enim esse iusto magnam modi officia, quisquam sint tempora veniam veritatis! Consequatur doloribus esse molestiae ratione sapiente, tempora.'},
    ];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    toggleTopic(topic) {
        topic.show = !topic.show;
    }
}
