import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../domain/services/auth.service';
export interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  disabilityType: string;
  athleteId: string;
  profilePicUrl: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileData: ProfileData = {
    fullName: '',
    email: '',
    phone: '',
    disabilityType: 'Motriz',
    athleteId: '#0000',
    profilePicUrl: ''
  };

  statusMessage: string = '';
  isSuccess: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();

    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.profileData = {
      fullName: user.fullName || '',
      email: user.email || '',
      phone: user.phone || '',
      disabilityType: user.disabilityType || 'Motriz',
      athleteId: user.athleteId || '#0000',
      profilePicUrl:
        user.profilePicUrl ||
        'https://images.unsplash.com/photo-1581343432368-17c864c29e01?q=80&w=300&auto=format&fit=crop'
    };
  }

  async handleSubmit(): Promise<void> {
    if (!this.profileData.fullName || !this.profileData.email) {
      this.statusMessage = 'Completa el nombre y el correo antes de actualizar.';
      this.isSuccess = false;
      return;
    }

    const result = await this.authService.updateProfile(this.profileData);
    
    if (result.success) {
      this.statusMessage = 'Perfil actualizado correctamente.';
      this.isSuccess = true;
    } else {
      this.statusMessage = result.error || 'Ocurrió un error al actualizar.';
      this.isSuccess = false;
    }
  }

  handleLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  handleGoHome(): void {
    this.router.navigate(['/home']);
  }
}