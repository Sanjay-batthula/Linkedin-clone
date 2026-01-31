import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Session, 
  User, 
  getSession, 
  saveSession, 
  clearSession, 
  findUserByEmail, 
  saveUser, 
  generateId 
} from '@/lib/localStorage';

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string, headline?: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const existingSession = getSession();
    if (existingSession) {
      setSession(existingSession);
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const user = findUserByEmail(email);
    
    if (!user) {
      return { success: false, error: 'No account found with this email' };
    }
    
    if (user.password !== password) {
      return { success: false, error: 'Incorrect password' };
    }

    const newSession: Session = {
      userId: user.id,
      email: user.email,
      name: user.name,
      headline: user.headline,
      connections: user.connections,
      loggedInAt: new Date().toISOString(),
    };

    saveSession(newSession);
    setSession(newSession);
    return { success: true };
  };

  const signup = (
    name: string, 
    email: string, 
    password: string, 
    headline: string = 'LinkedIn Member'
  ): { success: boolean; error?: string } => {
    const existingUser = findUserByEmail(email);
    
    if (existingUser) {
      return { success: false, error: 'An account with this email already exists' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    const newUser: User = {
      id: generateId(),
      email: email.toLowerCase(),
      password,
      name,
      headline,
      connections: Math.floor(Math.random() * 500) + 10,
      createdAt: new Date().toISOString(),
    };

    saveUser(newUser);

    const newSession: Session = {
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      headline: newUser.headline,
      connections: newUser.connections,
      loggedInAt: new Date().toISOString(),
    };

    saveSession(newSession);
    setSession(newSession);
    return { success: true };
  };

  const logout = () => {
    clearSession();
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
