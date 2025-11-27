import React, { useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { LocalStorageUserRepository } from '../../infrastructure/repositories/LocalStorageUserRepository';
import { AuthContext } from '../hooks/useAuth';

// Instancia singleton del repositorio por defecto
const defaultRepository = new LocalStorageUserRepository();

interface AuthProviderProps {
  children: ReactNode;
  repository?: UserRepository;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ 
  children, 
  repository = defaultRepository 
}) => {
  const [user, setUser] = useState<User | null>(() => repository.getCurrentUser());

  const login = useCallback(async (email: string, password: string) => {
    const loggedUser = await repository.login(email, password);
    setUser(loggedUser);
  }, [repository]);

  const register = useCallback(async (userData: Partial<User>) => {
    const newUser = await repository.register(userData);
    setUser(newUser);
  }, [repository]);

  const logout = useCallback(() => {
    repository.logout();
    setUser(null);
  }, [repository]);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  }), [user, login, register, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
