import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);

  currentUser: User;
  isDropdownOpen = false;

  ngOnInit() {
    this.authService.currentUser$.subscribe((value) => {
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
