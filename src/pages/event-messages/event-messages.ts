import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-event-messages',
    templateUrl: 'event-messages.html',
})
export class EventMessagesPage {
  chats: any = [
      {user_img_url: 'assets/img/user4.png', unread_messages_count: 1, user_name: 'Victoria', last_message_date: Date.now(), last_message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, illo similique. Accusantium ad assumenda, blanditiis, culpa cum cumque doloremque esse ex hic maxime, omnis recusandae suscipit vel. Aliquam, delectus, voluptatem.'},
      {user_img_url: 'assets/img/user2.png', unread_messages_count: 3, user_name: 'Pammela', last_message_date: Date.now(), last_message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur delectus doloribus expedita, incidunt inventore iusto repellendus tempora temporibus? Assumenda at debitis earum minima nam necessitatibus numquam ratione repellat sed voluptate?'},
  ];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    createMessage() {
        this.navCtrl.push('EventMessageCreatePage');
    }

    openChat(chat) {
        this.navCtrl.push('EventMessageViewPage', {chat});
    }
}
