import { DisabilityType } from './disability-type';

export type RequestedRole = 'USUARIO' | 'ENTRENADOR' | 'ORGANIZADOR';

export interface RegisterRequest {
  fullName: string;
  email: string;
  phone: string;
  disabilityType: DisabilityType | '';
  requestedRole: RequestedRole;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}
