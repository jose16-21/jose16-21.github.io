import React, { useState, useEffect, ReactNode } from 'react';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { LocalStorageUserRepository } from '../../infrastructure/repositories/LocalStorageUserRepository';
import { AuthContext } from '../hooks/useAuth';

interface AuthProviderProps {
  children: ReactNode;
  repository?: UserRepository;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ 
  children, 
  repository = new LocalStorageUserRepository() 
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = repository.getCurrentUser();
    setUser(currentUser);
  }, [repository]);

  const login = async (email: string, password: string) => {
    const loggedUser = await repository.login(email, password);
    setUser(loggedUser);
  };

  const register = async (userData: Partial<User>) => {
    const newUser = await repository.register(userData);
    setUser(newUser);
  };

  const logout = () => {
    repository.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
