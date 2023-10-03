import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);

  currentUser: string;
  isDropdownOpen = false;

  ngOnInit() {
    this.authService.currentUser$.subscribe((value) => {
      console.log('Event fired');
      console.log(`Event Value: ${value}`);
      this.currentUser = value;
    });
  }

  onToggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onLogout() {
    this.authService.logoutUser();
  }
}
