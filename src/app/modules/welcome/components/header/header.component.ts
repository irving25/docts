import {Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,} from '@angular/core';

import {NavService} from '../../services/nav.service';
import {AuthService} from '../../../../shared/services/authentication/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() showBranding = false;

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleSidenavNotice = new EventEmitter<void>();


  constructor(private navService: NavService) {
  }

  ngOnInit() {

  }

  clickFilter(): void {
   this.navService.filter();
   }


}
