import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the HomeTabPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-tab',
  templateUrl: 'home-tab.html'
})
export class HomeTabPage {

  tabEventosRoot = 'TabEventosPage'
  tabGruposRoot = 'TabGruposPage'
  tabCalendarioRoot = 'TabCalendarioPage'
  tabFeedNoticiasRoot = 'TabFeedNoticiasPage'
  tabMensagensRoot = 'TabMensagensPage'
  tabAtividadesRecentesRoot = 'TabAtividadesRecentesPage'


  constructor(public navCtrl: NavController) {}

}
