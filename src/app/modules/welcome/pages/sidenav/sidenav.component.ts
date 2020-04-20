import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {Observable, Subscription} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {NavService} from '../../services/nav.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  showFiller = true;
  @ViewChild('sidenav', {static: false}) public myNav: MatSidenav;
  isOpenMenu: boolean;
  subscription: Subscription;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private navSevice: NavService, private router: Router,
              private breakpointObserver: BreakpointObserver) {
    // subscribe to home component messages
    this.subscription = this.navSevice.listen().subscribe(() => {
      this.navControl(this.myNav);
    });

  }

  ngOnInit() {
  }

  navControl(sidenav) {
    if (!this.isOpenMenu) {
      sidenav.open();
      this.isOpenMenu = true;
      return;
    }
    sidenav.close();
    this.isOpenMenu = false;
  }

  onCloseNav() {
    console.log('cerrando');
  }


}
