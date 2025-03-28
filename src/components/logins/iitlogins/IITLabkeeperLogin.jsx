import React, { useState, useEffect } from 'react';
import { Lock, User, ArrowRight, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IITLabkeeperLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in when component mounts
    const labkeeperLastLogin = localStorage.getItem('iit_labkeeper_last_login');
    const labkeeperUsername = localStorage.getItem('iit_labkeeper_username');
    
    if (labkeeperLastLogin && labkeeperUsername) {
      // Check if token is expired (3 months)
      const currentTime = Date.now();
      const threeMonthsInMs = 3 * 30 * 24 * 60 * 60 * 1000; // ~3 months in milliseconds
      
      if ((currentTime - parseInt(labkeeperLastLogin)) > threeMonthsInMs) {
        // Force logout if token is older than 3 months
        localStorage.removeItem('iit_labkeeper_last_login');
        localStorage.removeItem('iit_labkeeper_username');
        setCheckingAuth(false);
      } else {
        // User is logged in and token is valid, redirect to labkeeper dashboard
        onLoginSuccess?.();
        navigate('/labkeeper-dashboard');
      }
    } else {
      setCheckingAuth(false);
    }
  }, [navigate, onLoginSuccess]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Authentication logic with the new credentials
    if (username === '1234' && password === '1234') {
      // Store login timestamp and username
      const currentTime = Date.now();
      localStorage.setItem('iit_labkeeper_last_login', currentTime.toString());
      localStorage.setItem('iit_labkeeper_username', username);
      
      onLoginSuccess?.();
      navigate('/labkeeper-dashboard');
    } else {
      setError('Invalid credentials');
      setTimeout(() => setError(''), 3000);
    }
    setIsLoading(false);
  };

  // Show loading indicator while checking authentication state
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Mobile Header - Only visible on mobile */}
      <div className="lg:hidden bg-gradient-to-r from-emerald-500 to-emerald-600 p-6">
        <div className="flex items-center justify-center space-x-3">
          <Shield className="w-8 h-8 text-white" />
          <span className="text-white text-2xl font-bold">LabAccess</span>
        </div>
      </div>

      {/* Left Panel - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 bg-gradient-to-br from-emerald-400 to-cyan-600 p-12 flex-col justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-white" />
          <span className="text-white text-2xl font-bold">LabAccess</span>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white">Welcome to Lab Portal</h1>
          <p className="text-emerald-50 text-lg">
            Access your dashboard to manage laboratory resources, equipment, and schedules.
          </p>
        </div>
        
        <div className="text-sm text-emerald-50 opacity-70">
          © 2025 LabAccess. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 xl:w-3/5 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center lg:text-left px-4 pt-4 pb-2">
            <h2 className="text-2xl font-bold text-gray-900">Lab Keeper Sign In</h2>
            <p className="mt-2 text-base text-gray-600">
              Enter your credentials to access the lab keeper portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 px-4">
            <div className="space-y-5">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-6 w-6 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-2xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-6 w-6 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-2xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-base flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 border border-transparent rounded-2xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 disabled:opacity-70 text-lg font-medium shadow-lg"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                    <ArrowRight className="h-6 w-6 text-emerald-50 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                  Sign in
                </>
              )}
            </button>
          </form>

          {/* Mobile Footer */}
          <div className="mt-8 text-center text-sm text-gray-500 lg:hidden px-4">
            © 2025 LabAccess. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default IITLabkeeperLogin;