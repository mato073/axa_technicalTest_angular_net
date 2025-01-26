import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuhtService} from './auht-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuhtService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      // If not logged in, redirect to login
      this.router.navigate(['/']);
      return false;
    }
  }
}
