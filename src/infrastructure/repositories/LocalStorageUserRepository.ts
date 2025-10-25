import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';

const USER_STORAGE_KEY = 'currentUser';

export class LocalStorageUserRepository implements UserRepository {
  getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      return null;
    }
  }

  saveUser(user: User): void {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  }

  removeUser(): void {
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error('Error removing user from localStorage:', error);
    }
  }

  async login(email: string, _password: string): Promise<User> {
    // Mock implementation - replace with real API call
    const mockUser: User = {
      id: crypto.randomUUID(),
      email,
      firstName: 'Usuario',
      lastName: 'Demo',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };
    
    this.saveUser(mockUser);
    return Promise.resolve(mockUser);
  }

  async register(userData: Partial<User>): Promise<User> {
    // Mock implementation - replace with real API call
    const newUser: User = {
      id: crypto.randomUUID(),
      email: userData.email || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      company: userData.company,
      phone: userData.phone,
      address: userData.address,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };
    
    this.saveUser(newUser);
    return Promise.resolve(newUser);
  }

  logout(): void {
    this.removeUser();
  }
}
