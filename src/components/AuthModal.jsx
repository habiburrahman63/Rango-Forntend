import React, { useState, useEffect } from 'react';
import { X, User, Mail, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalTab, setAuthModalTab, login, register, showToast } =
    useCart();

  const showPasswordState = useState(false);
  const [showPassword, setShowPassword] = showPasswordState;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const activeTab = authModalTab || 'signin';
  const setActiveTab = (tab) => {
    setAuthModalTab(tab);
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    emailOrUsername: '',
    password: '',
    rememberMe: true
  });
  const [signInErrors, setSignInErrors] = useState({});

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [signUpErrors, setSignUpErrors] = useState({});

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState('');

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  // Validation Helpers
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const errors = {};

    if (!signInData.emailOrUsername.trim()) {
      errors.emailOrUsername = 'Please enter your email address.';
    } else if (!validateEmail(signInData.emailOrUsername.trim())) {
      errors.emailOrUsername = 'Please enter a valid email address.';
    }
    if (!signInData.password) {
      errors.password = 'Please enter your password.';
    } else if (signInData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    if (Object.keys(errors).length > 0) {
      setSignInErrors(errors);
      return;
    }

    setSignInErrors({});
    setIsLoading(true);

    try {
      const res = await login({
        emailOrUsername: signInData.emailOrUsername.trim(),
        password: signInData.password,
        rememberMe: signInData.rememberMe
      });

      if (!res.success) {
        setErrorMessage(res.error || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'An unexpected error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const errors = {};

    if (!signUpData.name.trim()) {
      errors.name = 'Full name is required.';
    } else if (signUpData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    if (!signUpData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!validateEmail(signUpData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!signUpData.password) {
      errors.password = 'Password is required.';
    } else if (signUpData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (!signUpData.agreeTerms) {
      errors.agreeTerms = 'You must agree to the Terms of Service & Privacy Policy.';
    }

    if (Object.keys(errors).length > 0) {
      setSignUpErrors(errors);
      return;
    }

    setSignUpErrors({});
    setIsLoading(true);

    try {
      const res = await register({
        name: signUpData.name.trim(),
        email: signUpData.email.trim(),
        password: signUpData.password
      });

      if (!res.success) {
        setErrorMessage(res.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'An unexpected error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotError('');
    if (!forgotEmail.trim()) {
      setForgotError('Please enter your email address.');
      return;
    }
    if (!validateEmail(forgotEmail.trim())) {
      setForgotError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(`A password reset link has been dispatched to ${forgotEmail}.`);
      showToast('Password reset link sent!');
    }, 1200);
  };

  // Demo Login Helper
  const handleQuickDemoLogin = () => {
    setSignInData({
      emailOrUsername: 'admin@rango.com',
      password: 'demo123',
      rememberMe: true
    });
    setSignInErrors({});
    login({
      emailOrUsername: 'admin@rango.com',
      password: 'demo123',
      rememberMe: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeAuthModal}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-md shadow-2xl rounded-xs overflow-hidden z-10 my-8 border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header with Close */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100 bg-[#fbfbfb]">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-[#048287]" />
            <h3 className="font-['Lato'] font-bold text-base text-[#222222] tracking-wider uppercase">
              {activeTab === 'signin'
                ? 'Welcome Back'
                : activeTab === 'signup'
                ? 'Create New Account'
                : 'Reset Password'}
            </h3>
          </div>
          <button
            onClick={closeAuthModal}
            className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer transition-colors rounded-xs"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation (Sign In vs Sign Up) */}
        {activeTab !== 'forgot' && (
          <div className="flex border-b border-gray-200 bg-gray-50">
            <button
              onClick={() => {
                setActiveTab('signin');
                setAuthModalTab('signin');
                setErrorMessage('');
              }}
              className={`flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                activeTab === 'signin'
                  ? 'border-[#048287] text-[#048287] bg-white'
                  : 'border-transparent text-gray-500 hover:text-[#222222]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setActiveTab('signup');
                setAuthModalTab('signup');
                setErrorMessage('');
              }}
              className={`flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                activeTab === 'signup'
                  ? 'border-[#048287] text-[#048287] bg-white'
                  : 'border-transparent text-gray-500 hover:text-[#222222]'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          {/* Global Alert Notification */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs flex items-start gap-2 rounded-xs">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 text-xs flex items-start gap-2 rounded-xs">
              <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* TAB 1: SIGN IN FORM */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignInSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    value={signInData.emailOrUsername}
                    onChange={(e) => {
                      setSignInData({ ...signInData, emailOrUsername: e.target.value });
                      if (signInErrors.emailOrUsername) {
                        setSignInErrors({ ...signInErrors, emailOrUsername: '' });
                      }
                    }}
                    placeholder="Email"
                    autoFocus
                    className={`w-full pl-9 pr-3 py-2.5 text-xs text-[#222222] border rounded-xs outline-none transition-colors ${
                      signInErrors.emailOrUsername
                        ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                        : 'border-gray-300 focus:border-[#048287]'
                    }`}
                  />
                </div>
                {signInErrors.emailOrUsername && (
                  <p className="mt-1 text-[11px] text-red-600">{signInErrors.emailOrUsername}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('forgot');
                      setErrorMessage('');
                    }}
                    className="text-[11px] text-[#048287] hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Lock size={16} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signInData.password}
                    onChange={(e) => {
                      setSignInData({ ...signInData, password: e.target.value });
                      if (signInErrors.password) {
                        setSignInErrors({ ...signInErrors, password: '' });
                      }
                    }}
                    placeholder="Enter your password"
                    className={`w-full pl-9 pr-10 py-2.5 text-xs text-[#222222] border rounded-xs outline-none transition-colors ${
                      signInErrors.password
                        ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                        : 'border-gray-300 focus:border-[#048287]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {signInErrors.password && (
                  <p className="mt-1 text-[11px] text-red-600">{signInErrors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600">
                  <input
                    type="checkbox"
                    checked={signInData.rememberMe}
                    onChange={(e) => setSignInData({ ...signInData, rememberMe: e.target.checked })}
                    className="accent-[#048287] rounded-xs cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#048287] hover:bg-[#036b6f] text-white py-3 font-['Lato'] font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

              {/* Quick Demo Login Option */}
              <div className="pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <User size={13} className="text-[#048287]" />
                  <span>Instant Demo Admin Login</span>
                </button>
                <p className="text-[10px] text-gray-400 text-center mt-1.5">
                  Demo credentials: <strong>admin@rango.com</strong> / <strong>demo123</strong>
                </p>
              </div>
            </form>
          )}

          {/* TAB 2: SIGN UP / REGISTRATION FORM */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5" noValidate>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    value={signUpData.name}
                    onChange={(e) => {
                      setSignUpData({ ...signUpData, name: e.target.value });
                      if (signUpErrors.name) setSignUpErrors({ ...signUpErrors, name: '' });
                    }}
                    placeholder="Full Name"
                    autoFocus
                    className={`w-full pl-9 pr-3 py-2 text-xs text-[#222222] border rounded-xs outline-none transition-colors ${
                      signUpErrors.name
                        ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                        : 'border-gray-300 focus:border-[#048287]'
                    }`}
                  />
                </div>
                {signUpErrors.name && (
                  <p className="mt-1 text-[11px] text-red-600">{signUpErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    value={signUpData.email}
                    onChange={(e) => {
                      setSignUpData({ ...signUpData, email: e.target.value });
                      if (signUpErrors.email) setSignUpErrors({ ...signUpErrors, email: '' });
                    }}
                    placeholder="Email"
                    className={`w-full pl-9 pr-3 py-2 text-xs text-[#222222] border rounded-xs outline-none transition-colors ${
                      signUpErrors.email
                        ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                        : 'border-gray-300 focus:border-[#048287]'
                    }`}
                  />
                </div>
                {signUpErrors.email && (
                  <p className="mt-1 text-[11px] text-red-600">{signUpErrors.email}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <Lock size={15} />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={signUpData.password}
                      onChange={(e) => {
                        setSignUpData({ ...signUpData, password: e.target.value });
                        if (signUpErrors.password) setSignUpErrors({ ...signUpErrors, password: '' });
                      }}
                      placeholder="Min 6 chars"
                      className={`w-full pl-8 pr-8 py-2 text-xs text-[#222222] border rounded-xs outline-none transition-colors ${
                        signUpErrors.password
                          ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                          : 'border-gray-300 focus:border-[#048287]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  {signUpErrors.password && (
                    <p className="mt-1 text-[10px] text-red-600">{signUpErrors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Confirm <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <Lock size={15} />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={signUpData.confirmPassword}
                      onChange={(e) => {
                        setSignUpData({ ...signUpData, confirmPassword: e.target.value });
                        if (signUpErrors.confirmPassword) {
                          setSignUpErrors({ ...signUpErrors, confirmPassword: '' });
                        }
                      }}
                      placeholder="Repeat password"
                      className={`w-full pl-8 pr-3 py-2 text-xs text-[#222222] border rounded-xs outline-none transition-colors ${
                        signUpErrors.confirmPassword
                          ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                          : 'border-gray-300 focus:border-[#048287]'
                      }`}
                    />
                  </div>
                  {signUpErrors.confirmPassword && (
                    <p className="mt-1 text-[10px] text-red-600">{signUpErrors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="flex items-start gap-2 cursor-pointer text-xs text-gray-600 pt-1">
                  <input
                    type="checkbox"
                    checked={signUpData.agreeTerms}
                    onChange={(e) => {
                      setSignUpData({ ...signUpData, agreeTerms: e.target.checked });
                      if (signUpErrors.agreeTerms) setSignUpErrors({ ...signUpErrors, agreeTerms: '' });
                    }}
                    className="accent-[#048287] rounded-xs cursor-pointer mt-0.5"
                  />
                  <span className="text-[11px] leading-tight">
                    I agree to the <a href="#terms" className="text-[#048287] underline">Terms of Service</a> &amp; <a href="#privacy" className="text-[#048287] underline">Privacy Policy</a>
                  </span>
                </label>
                {signUpErrors.agreeTerms && (
                  <p className="mt-1 text-[11px] text-red-600">{signUpErrors.agreeTerms}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#048287] hover:bg-[#036b6f] text-white py-3 font-['Lato'] font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAB 3: FORGOT PASSWORD */}
          {activeTab === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-4" noValidate>
              <p className="text-xs text-gray-600 leading-relaxed">
                Enter your registered email address and we'll send you instructions to reset your password.
              </p>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => {
                      setForgotEmail(e.target.value);
                      setForgotError('');
                    }}
                    placeholder="Email"
                    autoFocus
                    className={`w-full pl-9 pr-3 py-2.5 text-xs text-[#222222] border rounded-xs outline-none transition-colors ${
                      forgotError
                        ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                        : 'border-gray-300 focus:border-[#048287]'
                    }`}
                  />
                </div>
                {forgotError && <p className="mt-1 text-[11px] text-red-600">{forgotError}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#048287] hover:bg-[#036b6f] text-white py-3 font-['Lato'] font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span>Sending Instructions...</span>
                ) : (
                  <span>Send Reset Link</span>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('signin');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className="text-xs text-[#048287] hover:underline cursor-pointer"
                >
                  &larr; Back to Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
