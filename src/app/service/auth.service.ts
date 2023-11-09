import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userName = 'voiceengine';
  private password = 'test1234';

  constructor( private sessionService: SessionService) {}

  public authUser(userName: string, password: string): boolean {
    if (this.isValidUser(userName, password)) {
      this.sessionService.createSession(userName);
      return true;
    }
    return false;
  }

  private isValidUser(userName: string, password: string) {
    return userName === this.userName && password === this.password;
  }
}
