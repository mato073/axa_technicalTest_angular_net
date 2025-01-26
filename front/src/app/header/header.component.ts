import { Component, Input } from '@angular/core';
import { User } from '../types/user.model';
import { AuhtService } from '../services/auht-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
    @Input() user!: User;

    constructor(
      private auhtService: AuhtService,
      private router: Router
    ) {}

    logout() {
      console.log("active")
      this.auhtService.logout();
      this.router.navigate(['/']);
    }
}
