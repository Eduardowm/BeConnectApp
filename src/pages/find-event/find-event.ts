import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the FindEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-find-event',
    templateUrl: 'find-event.html',
})
export class FindEventPage {
    searchVisible: boolean = false;
    tab: string = 'Agora';

    now_events: any = [
        {
            name: 'Hoje',
            events: [
                {
                    picture_url: 'assets/img/church1.png',
                    name: 'Frontier Culture Museum 2018',
                    start_date: Date.now(),
                    end_date: Date.now(),
                    city: 'Staunton',
                    state: 'VA',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias animi culpa dicta distinctio eaque esse harum illo inventore ipsam iusto laudantium maxime minus molestias possimus, praesentium quae totam unde.'
                },
                {
                    picture_url: 'assets/img/church2.png',
                    name: '2019 National IMP Sales Meeting',
                    start_date: Date.now(),
                    end_date: Date.now(),
                    city: 'Orlando',
                    state: 'FL',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias animi culpa dicta distinctio eaque esse harum illo inventore ipsam iusto laudantium maxime minus molestias possimus, praesentium quae totam unde.'
                },
                {
                    picture_url: 'assets/img/church3.png',
                    name: 'Real Estate Ignite 2018',
                    start_date: Date.now(),
                    end_date: Date.now(),
                    city: 'Las Vegas',
                    state: 'NV',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias animi culpa dicta distinctio eaque esse harum illo inventore ipsam iusto laudantium maxime minus molestias possimus, praesentium quae totam unde.'
                },
            ]
        },
        {
            name: 'Essa Semana',
            events: [
                {
                    picture_url: 'assets/img/church1.png',
                    name: 'Frontier Culture Museum 2018',
                    start_date: Date.now(),
                    end_date: Date.now(),
                    city: 'Staunton',
                    state: 'VA',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias animi culpa dicta distinctio eaque esse harum illo inventore ipsam iusto laudantium maxime minus molestias possimus, praesentium quae totam unde.'
                },
                {
                    picture_url: 'assets/img/church2.png',
                    name: '2019 National IMP Sales Meeting',
                    start_date: Date.now(),
                    end_date: Date.now(),
                    city: 'Orlando',
                    state: 'FL',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias animi culpa dicta distinctio eaque esse harum illo inventore ipsam iusto laudantium maxime minus molestias possimus, praesentium quae totam unde.'
                },
                {
                    picture_url: 'assets/img/church3.png',
                    name: 'Real Estate Ignite 2018',
                    start_date: Date.now(),
                    end_date: Date.now(),
                    city: 'Las Vegas',
                    state: 'NV',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias animi culpa dicta distinctio eaque esse harum illo inventore ipsam iusto laudantium maxime minus molestias possimus, praesentium quae totam unde.'
                },
            ]
        }
    ];

    soon_events: any = [];
    past_events: any = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public modalCtrl: ModalController) {
    }

    toggleSearchbar() {
        this.searchVisible = !this.searchVisible;
    }

    onSearchInput($event) {
    }

    onSearchCancel($event) {
    }

    openEvent(event) {
        this.modalCtrl.create("ModalEventViewPage", {event}).present();
    }
}
