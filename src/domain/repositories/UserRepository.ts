import { User } from '../entities/User';

export interface UserRepository {
  getCurrentUser(): User | null;
  saveUser(user: User): void;
  removeUser(): void;
  login(email: string, password: string): Promise<User>;
  register(userData: Partial<User>): Promise<User>;
  logout(): void;
}
