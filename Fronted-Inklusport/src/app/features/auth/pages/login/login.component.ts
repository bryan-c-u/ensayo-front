import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login-request';
import { AccessibilityService } from '../../../../core/services/accessibility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  showPassword = false;
  errorMessage: string | null = null;
  isSubmitting = false;
  loginSuccess = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private authService: AuthService,
    public accessibilityService: AccessibilityService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  goBack(): void {
    this.location.back();
  }

  fieldInvalid(fieldName: string): boolean {
    const control = this.loginForm.get(fieldName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.loginSuccess = false;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.authService.login(this.loginForm.value as LoginRequest).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.loginSuccess = true;
        localStorage.setItem('auth_token', response.token);
        // TODO: redirigir a la vista de inicio/dashboard cuando exista esa ruta.
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error?.error?.message || 'Credenciales inválidas. Intenta de nuevo.';
      }
    });
  }
}
