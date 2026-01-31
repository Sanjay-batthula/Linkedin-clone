import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export const HeroSection = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground text-2xl font-bold">in</span>
        </div>
        <span className="text-3xl font-bold text-foreground">LinkUp</span>
      </div>

      {/* Hero Content */}
      <div className="text-center max-w-2xl mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
          Welcome to your professional community
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Connect. Share. Grow.
        </p>
      </div>

      {/* Auth Buttons */}
      {!showLogin && !showSignup && (
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={() => setShowLogin(true)}
            className="btn-linkedin min-w-[200px] text-lg h-12"
          >
            Sign in
          </Button>
          <Button 
            onClick={() => setShowSignup(true)}
            variant="outline"
            className="btn-linkedin-outline min-w-[200px] text-lg h-12"
          >
            Join now
          </Button>
        </div>
      )}

      {/* Login Form */}
      {showLogin && (
        <LoginForm 
          onBack={() => setShowLogin(false)} 
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {/* Signup Form */}
      {showSignup && (
        <SignupForm 
          onBack={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
};
