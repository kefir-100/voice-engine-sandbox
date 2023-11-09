import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';;
import { SessionService } from '../service/session.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
	constructor(private router: Router, private sessionService: SessionService) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (!this.sessionService.isActiveSession()) {
			return this.router.createUrlTree(['/login']);
		}

		return true;
	}
}
