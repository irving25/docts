import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material';
import {NavService} from '../../services/nav.service';
import {AuthService} from '../../../../shared/services/authentication/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild('trial', {static: false}) trigger: MatMenuTrigger;


  constructor(private navVarService: NavService, private  authService: AuthService) {

  }

  ngOnInit() {
  }

  setMenu(value: any) {
    this.navVarService.chooseMenu(value);
  }

  closeSession() {
    this.authService.signOut();
  }

}
