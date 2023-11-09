import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessionLiveTime = 1000 * 60 * 60 * 6; // 6 hours

  public createSession(userName: string) {
    localStorage.setItem('auth', JSON.stringify({ userName, isLoggedin: true, exp: Date.now() + this.sessionLiveTime }));
  }
  
  public deleteSession() {
    localStorage.removeItem('auth');
  }

  public isActiveSession() {
    const authStr = localStorage.getItem('auth');
    if (!_.isNil(authStr) && _.size(authStr) > 0) {
      try {
        const auth = JSON.parse(authStr);
        return auth.exp > Date.now();
      } catch (e: any) {
        throw new Error(e && e.message || 'Invalid session');
      }
    }

    return false;
  }
}
