import {Injectable} from '@angular/core';

import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs-compat/add/operator/map';
import 'rxjs-compat/add/operator/do';
import {AngularFireAuth} from '@angular/fire/auth';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {
  }

  canActivate(): Observable<any> {
    return Observable.from(this.auth.authState)
      .map(state => !!state)
      .do(authenticated => {
        if (!authenticated) {
          setTimeout(() => this.router.navigate(['/welcome']));
        }
      });
  }
}
