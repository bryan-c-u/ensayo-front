import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

export interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  disabilityType: string;
  athleteId: string;
  profilePicUrl: string;
}

const DEFAULT_PROFILE_PIC =
  'https://images.unsplash.com/photo-1581343432368-17c864c29e01?q=80&w=300&auto=format&fit=crop';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.scss']
})
export class ProfileManagementComponent implements OnInit {
  profileData: ProfileData = {
    fullName: '',
    email: '',
    phone: '',
    disabilityType: 'Motriz',
    athleteId: '#0000',
    profilePicUrl: DEFAULT_PROFILE_PIC
  };

  statusMessage: string = '';
  isSuccess: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.authService.getMyProfile().subscribe({
      next: (user) => {
        this.profileData = {
          fullName: user.fullName || '',
          email: user.email || '',
          phone: user.phone || '',
          disabilityType: user.disability || 'Motriz',
          athleteId: user.id ? `#${user.id.slice(-4)}` : '#0000',
          profilePicUrl: user.profilePicture || DEFAULT_PROFILE_PIC
        };
      },
      error: () => {
        this.statusMessage = 'No se pudo cargar tu perfil. Intenta de nuevo más tarde.';
        this.isSuccess = false;
      }
    });
  }

  handleSubmit(): void {
    if (!this.profileData.fullName || !this.profileData.email) {
      this.statusMessage = 'Completa el nombre y el correo antes de actualizar.';
      this.isSuccess = false;
      return;
    }

    this.authService.updateMyProfile({
      fullName: this.profileData.fullName,
      phone: this.profileData.phone,
      profilePicture: this.profileData.profilePicUrl,
      bio: '',
      disability: this.profileData.disabilityType
    }).subscribe({
      next: () => {
        this.statusMessage = 'Perfil actualizado correctamente.';
        this.isSuccess = true;
      },
      error: (error) => {
        this.statusMessage = error?.error?.message || 'Ocurrió un error al actualizar.';
        this.isSuccess = false;
      }
    });
  }

}
