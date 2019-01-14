import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-event-message-view',
  templateUrl: 'event-message-view.html',
})
export class EventMessageViewPage {
  chat: any = {user_img_url: 'assets/img/user4.png', unread_messages_count: 1, user_name: 'Victoria', last_message_date: Date.now(), last_message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, illo similique. Accusantium ad assumenda, blanditiis, culpa cum cumque doloremque esse ex hic maxime, omnis recusandae suscipit vel. Aliquam, delectus, voluptatem.'};
  messages: any = [
      {user_img_url: 'assets/img/user4.png', user_name: 'Victoria', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, illo similique. Accusantium ad assumenda, blanditiis, culpa cum cumque doloremque esse ex hic maxime, omnis recusandae suscipit vel. Aliquam, delectus, voluptatem.', date: Date.now()}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
