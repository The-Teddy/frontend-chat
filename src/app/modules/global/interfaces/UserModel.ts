export interface UserModel {
  name: string;
  email: string;
  role: string;
  emailVerified: Date | null;
  photo: string | null;
  status: string | null;
  bio: string | null;
  lastLogin: Date | null;
  isActive: boolean;
  contacts: string[];
  blockeds: string[];
  cretedAt: Date;
  updatedAt: Date;
}
export interface LoginInterface {
  email: string;
  password: string;
}
export interface RegisterInterface {
  name: string;
  username: string;
  email: string;
  password: string;
}
export interface RecoveryPasswordInterface {
  email: string;
  password: string;
  codeEmail: string | null;
}
export interface updateDataUserInterface {
  name: string;
  birthDate: Date | string | null;
}
export interface UpdateEmaiUserInterface {
  email: string;
  codeEmail: string | null;
  password: string;
}
export interface UpdatePasswordUserInterface {
  password: string;
  newPassword: string;
}
