import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the EventCommunityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-event-community',
    templateUrl: 'event-community.html',
})
export class EventCommunityPage {
    searchVisible: boolean = false;
    topics: any = [
        {
            icon: 'megaphone', title: 'Organizer Announcement', date: '2018-22-06 00:00:00', sub_title: 'Please submit the survey', description: 'Please take one minute to submit your survey when you have time after lunch. You can find the icon on the app.', messages_count: 5
        },
        {
            icon: 'mic', title: 'Lorem Ipsum', date: Date.now(), sub_title: '', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam aliquid architecto debitis dignissimos eos, id in iure laboriosam laborum magni maiores maxime odio odit ratione sapiente sed sunt voluptatem.', messages_count: 22
        },
        {
            icon: 'navigate', title: 'Lorem Ipsum', date: Date.now(), sub_title: '', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error impedit, nihil? At corporis dicta et id, iste, molestias pariatur porro quibusdam quo, recusandae tempore totam voluptate. Fugiat laudantium necessitatibus nesciunt!', messages_count: 7
        },
        {
            icon: 'nutrition', title: 'Lorem Ipsum', date: Date.now(), sub_title: '', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet blanditiis commodi doloremque, iusto rerum veritatis. Architecto atque cupiditate dolor earum facere impedit laudantium, natus nesciunt quae, quia sunt unde.', messages_count: 0
        },
        {
            icon: 'paw', title: 'Lorem Ipsum', date: Date.now(), sub_title: '', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt est expedita necessitatibus nemo qui quia sunt veniam veritatis, voluptas voluptate? Doloremque enim libero modi quasi unde! Animi odit quaerat voluptates.', messages_count: 15
        }
    ];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EventCommunityPage');
    }

    toggleSearchbar() {
        this.searchVisible = !this.searchVisible;
    }

    onSearchInput($event) {
    }

    onSearchCancel($event) {
    }

    openTopic(topic) {
        this.navCtrl.push('EventTopicViewPage', {topic});
    }
}
