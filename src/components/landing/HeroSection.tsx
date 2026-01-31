import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export const HeroSection = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/herobg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />
      {/* Main Content */}
      <div className="relative z-10 w-full md:w-1/2 flex flex-col items-center md:items-start justify-center py-12 md:pl-16 text-white">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-2">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white text-2xl font-bold">in</span>
          </div>
          <span className="text-3xl font-bold text-white">LinkUp</span>
        </div>

        {/* Hero Content */}
        <div className="text-center md:text-left max-w-2xl mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Welcome to your professional community
          </h1>
          <p className="text-xl text-white mb-8">
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

      {/* Right Side: Image */}
      <div className="relative z-10 hidden md:flex w-1/2 h-full items-center justify-center">
        <img
          src="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4"
          alt="LinkedIn Hero"
          className="max-w-full max-h-[600px] object-contain"
        />
      </div>
    </div>
  );
};
