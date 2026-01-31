import { HeroSection } from '@/components/landing/HeroSection';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Index = () => {
  const { session, isLoading } = useAuth();

  // If already logged in, redirect to dashboard
  if (session && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  return <HeroSection />;
};

export default Index;
