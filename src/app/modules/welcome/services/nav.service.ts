import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

const DEFAULT_BASE_URL = '/welcome/menu';

@Injectable()
export class NavService {
  private listners = new Subject<any>();
  private menu = 0;
  baseUrl = '';

  constructor(public router: Router) {
  }

  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  filter() {
    this.listners.next();
  }

  private setMenu(value: any) {
    this.menu = value;
  }

  private setBaseUrl(value: string) {
    this.baseUrl = value;
  }

  chooseMenu(value: any) {
    console.log('value:', value);
    this.setMenu(value);
    switch (this.menu) {
      case 1:
        this.router.navigate([DEFAULT_BASE_URL]);
        this.filter();
        break;
      case 2:
        this.router.navigate([DEFAULT_BASE_URL,
          {outlets: {content: ['otros']}}]);
        this.filter();
        break;
      case 3:
        this.router.navigate([DEFAULT_BASE_URL,
          {outlets: {content: ['vacantes']}}]);
        this.filter();
        break;
        case 4:
          this.router.navigate([DEFAULT_BASE_URL,
            {outlets: {content: ['departamentos']}}]);
          this.filter();
          break;
          case 5:
            this.router.navigate([DEFAULT_BASE_URL,
              {outlets: {content: ['grupos']}}]);
            this.filter();
            break;
            case 6:
              this.router.navigate([DEFAULT_BASE_URL,
                {outlets: {content: ['reclutadores']}}]);
              this.filter();
              break;
              case 7:
              this.router.navigate([DEFAULT_BASE_URL,
                {outlets: {content: ['candidatos']}}]);
              this.filter();
              break;
              case 8:
              this.router.navigate([DEFAULT_BASE_URL,
                {outlets: {content: ['procesos']}}]);
              this.filter();
              break;
      default:
        this.router.navigate([this.baseUrl]);
    }
  }
}
