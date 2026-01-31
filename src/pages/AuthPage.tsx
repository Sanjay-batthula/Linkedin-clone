import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2 } from 'lucide-react';

let Head: React.FC<{ children?: React.ReactNode }>;
try {
  // @ts-ignore
  Head = require('next/head').default;
} catch {
  Head = ({ children }) => <>{children}</>;
}

export const AuthPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupHeadline, setSignupHeadline] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  // Switch UI panels
  const handleRegisterClick = () => {
    setMode('signup');
    setError('');
    setIsLoading(false);
    containerRef.current?.classList.add('active');
  };

  const handleLoginClick = () => {
    setMode('login');
    setError('');
    setIsLoading(false);
    containerRef.current?.classList.remove('active');
  };

  // Login logic
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmail)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    const result = login(loginEmail, loginPassword);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }
    setIsLoading(false);
  };

  // Signup logic
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }
    if (signupName.trim().length < 2) {
      setError('Name must be at least 2 characters');
      setIsLoading(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupEmail)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }
    if (signupPassword.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    const result = signup(
      signupName.trim(),
      signupEmail.trim(),
      signupPassword,
      signupHeadline.trim() || undefined
    );
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Signup failed');
    }
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Login/Signup Form</title>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Poppins", sans-serif;
            text-decoration: none;
            list-style: none;
        }
        body{
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(90deg, #e2e2e2, #c9d6ff);
        }
        .container{
            position: relative;
            width: 850px;
            height: 550px;
            background: #fff;
            margin: 20px;
            border-radius: 30px;
            box-shadow: 0 0 30px rgba(0, 0, 0, .2);
            overflow: hidden;
        }
        .container h1{
            font-size: 36px;
            margin: -10px 0;
        }
        .container p{
            font-size: 14.5px;
            margin: 15px 0;
        }
        form{ width: 100%; }
        .form-box{
            position: absolute;
            right: 0;
            width: 50%;
            height: 100%;
            background: #fff;
            display: flex;
            align-items: center;
            color: #333;
            text-align: center;
            padding: 40px;
            z-index: 1;
            transition: .6s ease-in-out 1.2s, visibility 0s 1s;
        }
        .container.active .form-box{ right: 50%; }
        .form-box.register{ visibility: hidden; }
        .container.active .form-box.register{ visibility: visible; }
        .input-box{
            position: relative;
            margin: 30px 0;
        }
        .input-box input{
            width: 100%;
            padding: 13px 50px 13px 20px;
            background: #eee;
            border-radius: 8px;
            border: none;
            outline: none;
            font-size: 16px;
            color: #333;
            font-weight: 500;
        }
        .input-box input::placeholder{
            color: #888;
            font-weight: 400;
        }
        .input-box i{
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 20px;
        }
        .forgot-link{ margin: -15px 0 15px; }
        .forgot-link a{
            font-size: 14.5px;
            color: #333;
        }
        .btn{
            width: 100%;
            height: 48px;
            background: #7494ec;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, .1);
            border: none;
            cursor: pointer;
            font-size: 16px;
            color: #fff;
            font-weight: 600;
        }
        .social-icons{
            display: flex;
            justify-content: center;
        }
        .social-icons a{
            display: inline-flex;
            padding: 10px;
            border: 2px solid #ccc;
            border-radius: 8px;
            font-size: 24px;
            color: #333;
            margin: 0 8px;
        }
        .toggle-box{
            position: absolute;
            width: 100%;
            height: 100%;
        }
        .toggle-box::before{
            content: '';
            position: absolute;
            left: -250%;
            width: 300%;
            height: 100%;
            background: #7494ec;
            border-radius: 150px;
            z-index: 2;
            transition: 1.8s ease-in-out;
        }
        .container.active .toggle-box::before{ left: 50%; }
        .toggle-panel{
            position: absolute;
            width: 50%;
            height: 100%;
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 2;
            transition: .6s ease-in-out;
        }
        .toggle-panel.toggle-left{ 
            left: 0;
            transition-delay: 1.2s; 
        }
        .container.active .toggle-panel.toggle-left{
            left: -50%;
            transition-delay: .6s;
        }
        .toggle-panel.toggle-right{ 
            right: -50%;
            transition-delay: .6s;
        }
        .container.active .toggle-panel.toggle-right{
            right: 0;
            transition-delay: 1.2s;
        }
        .toggle-panel p{ margin-bottom: 20px; }
        .toggle-panel .btn{
            width: 160px;
            height: 46px;
            background: transparent;
            border: 2px solid #fff;
            box-shadow: none;
        }
        @media screen and (max-width: 650px){
            .container{ height: calc(100vh - 40px); }
            .form-box{
                bottom: 0;
                width: 100%;
                height: 70%;
            }
            .container.active .form-box{
                right: 0;
                bottom: 30%;
            }
            .toggle-box::before{
                left: 0;
                top: -270%;
                width: 100%;
                height: 300%;
                border-radius: 20vw;
            }
            .container.active .toggle-box::before{
                left: 0;
                top: 70%;
            }
            .container.active .toggle-panel.toggle-left{
                left: 0;
                top: -30%;
            }
            .toggle-panel{ 
                width: 100%;
                height: 30%;
            }
            .toggle-panel.toggle-left{ top: 0; }
            .toggle-panel.toggle-right{
                right: 0;
                bottom: -30%;
            }
            .container.active .toggle-panel.toggle-right{ bottom: 0; }
        }
        @media screen and (max-width: 400px){
            .form-box { padding: 20px; }
            .toggle-panel h1{font-size: 30px; }
        }
      `}</style>
      <div className="container" ref={containerRef}>
        {/* Login Form */}
        <div className="form-box login">
          <form onSubmit={handleLoginSubmit}>
            <h1>Login</h1>
            {mode === 'login' && error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20" style={{marginBottom: 10}}>
                {error}
              </div>
            )}
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                disabled={isLoading}
              />
              <i className='bx bxs-user'></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                disabled={isLoading}
              />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className="forgot-link">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading && mode === 'login' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" style={{verticalAlign: 'middle'}} />
                  Signing in...
                </>
              ) : (
                'Login'
              )}
            </button>
            <p>or login with social platforms</p>
            <div className="social-icons">
              <a href="#"><i className='bx bxl-google'></i></a>
              <a href="#"><i className='bx bxl-facebook'></i></a>
              <a href="#"><i className='bx bxl-github'></i></a>
              <a href="#"><i className='bx bxl-linkedin'></i></a>
            </div>
          </form>
        </div>
        {/* Signup Form */}
        <div className="form-box register">
          <form onSubmit={handleSignupSubmit}>
            <h1>Registration</h1>
            {mode === 'signup' && error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20" style={{marginBottom: 10}}>
                {error}
              </div>
            )}
            <div className="input-box">
              <input
                type="text"
                placeholder="Full name"
                required
                value={signupName}
                onChange={e => setSignupName(e.target.value)}
                disabled={isLoading}
              />
              <i className='bx bxs-user'></i>
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                required
                value={signupEmail}
                onChange={e => setSignupEmail(e.target.value)}
                disabled={isLoading}
              />
              <i className='bx bxs-envelope'></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                value={signupPassword}
                onChange={e => setSignupPassword(e.target.value)}
                disabled={isLoading}
              />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Headline (optional)"
                value={signupHeadline}
                onChange={e => setSignupHeadline(e.target.value)}
                disabled={isLoading}
              />
              <i className='bx bxs-briefcase'></i>
            </div>
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading && mode === 'signup' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" style={{verticalAlign: 'middle'}} />
                  Creating account...
                </>
              ) : (
                'Register'
              )}
            </button>
            <p>or register with social platforms</p>
            <div className="social-icons">
              <a href="#"><i className='bx bxl-google'></i></a>
              <a href="#"><i className='bx bxl-facebook'></i></a>
              <a href="#"><i className='bx bxl-github'></i></a>
              <a href="#"><i className='bx bxl-linkedin'></i></a>
            </div>
          </form>
        </div>
        {/* Toggle Panels */}
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn" type="button" onClick={handleRegisterClick}>
              Register
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button className="btn login-btn" type="button" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
