import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the ExhibitorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-exhibitors',
    templateUrl: 'exhibitors.html',
})
export class ExhibitorsPage {
    message: any = {content: ''};

    exhibitors: any = [
        {
            name: 'Todos', count: 3, exhibitors:
            [
                {
                    name: 'A', exhibitors:
                    [
                        {
                            image_url: 'assets/img/advance-card-jp.jpg',
                            name: 'Amd',
                            coupon: 'Lorem Ipsum',
                            location: 'Booth 105',
                            photo_count: 1,
                            photos: [{url: 'assets/img/church3.png'}],
                            like_count: 20,
                            comment_count: 8,
                            description: 'Lorem Ipsum',
                            website: 'https://www.beconnect.com.br',
                            email: 'mail@owner.com',
                            phone: '+55 902 98229',
                            owner: 'Garred Smith',
                            about: 'Lorem Ipsum',
                            likes: [{
                                image_url: 'assets/img/marty-avatar.png',
                                name: 'Marty',
                                ocupation: 'Engineer',
                                company: 'Future'
                            },
                            ],
                            comments: [
                                {
                                    image_url: 'assets/img/sarah-avatar.png.jpeg',
                                    name: 'Sarah',
                                    date: Date.now(),
                                    content: 'Lorem Ipsum'
                                }
                            ]
                        },
                        {image_url: 'assets/img/advance-card-jp.jpg', name: 'Amd', coupon: 'Lorem Ipsum', location: 'Booth 105'},
                    ]
                }
            ]
        },
        {
            name: 'Marketing', count: 2, exhibitors:
            [
                {
                    name: 'A', exhibitors:
                    [
                        {image_url: 'assets/img/advance-card-jp.jpg', name: 'Amd', coupon: 'Lorem Ipsum', location: 'Booth 105'},
                        {image_url: 'assets/img/advance-card-jp.jpg', name: 'Amd', coupon: 'Lorem Ipsum', location: 'Booth 105'},
                    ]
                }
            ]
        },
        {name: 'Alimentos', count: 1},
    ];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ExhibitorsPage');
    }

    openExhibitorsGroup(exhibitorsGroup) {
        this.navCtrl.push('ExhibitorsGroupPage', {exhibitorsGroup});
    }
}
