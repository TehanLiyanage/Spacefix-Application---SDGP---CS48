import React, { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db, googleProvider } from '../../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

const IITLecturerLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if user is already logged in when component mounts
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is logged in, check if token is expired (3 months)
        const lastLoginTime = localStorage.getItem('iit_lecturer_last_login');
        const currentTime = Date.now();
        const threeMonthsInMs = 3 * 30 * 24 * 60 * 60 * 1000; // ~3 months in milliseconds
        
        if (lastLoginTime && (currentTime - parseInt(lastLoginTime)) > threeMonthsInMs) {
          // Force sign out if token is older than 3 months
          await signOut(auth);
          localStorage.removeItem('iit_lecturer_last_login');
          setCheckingAuth(false);
        } else {
          // Check if user is a lecturer
          const isLecturer = await checkIfLecturerExists(user.email);
          if (isLecturer) {
            // User is logged in and token is valid, redirect to lecturer dashboard
            navigate('/lecturer-dashboard');
          } else {
            // Not a lecturer, sign out
            await signOut(auth);
            setError('Access denied. Only authorized lecturers can access this portal.');
            setCheckingAuth(false);
          }
        }
      } else {
        setCheckingAuth(false);
      }
    });

    // Clean up subscription
    return () => unsubscribe();
  }, [navigate]);

  // Check if the email exists in the lecturers collection
  const checkIfLecturerExists = async (email) => {
    try {
      // Query the lecturers collection to find documents where personalInfo.email matches
      const lecturersCollectionRef = collection(db, 'IIT/Users/lecturers');
      const q = query(lecturersCollectionRef, where("personalInfo.email", "==", email));
      const querySnapshot = await getDocs(q);
      
      // If we found any matching documents, the email exists
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking lecturer status:', error);
      return false;
    }
  };

  const saveUserToFirestore = async (user) => {
    try {
      const userDocRef = doc(db, 'IIT/Users/lecturers', user.uid);
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: serverTimestamp(),
        createdAt: serverTimestamp()
      };
      await setDoc(userDocRef, userData, { merge: true });
      console.log('Lecturer data saved to Firestore successfully');
    } catch (error) {
      console.error('Error saving lecturer data:', error);
      throw error;
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Set the persistence first to keep the user logged in
      await setPersistence(auth, browserLocalPersistence);
      
      // Check for expired token (3 months)
      const lastLoginTime = localStorage.getItem('iit_lecturer_last_login');
      const currentTime = Date.now();
      const threeMonthsInMs = 3 * 30 * 24 * 60 * 60 * 1000; // ~3 months in milliseconds
      
      if (lastLoginTime && (currentTime - parseInt(lastLoginTime)) > threeMonthsInMs) {
        // Force sign out if token is older than 3 months
        await signOut(auth);
        localStorage.removeItem('iit_lecturer_last_login');
        // This will make the user log in again, which will reset the timer
      }
      
      googleProvider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, googleProvider);
      
      // Check if the user is a lecturer
      const isLecturer = await checkIfLecturerExists(result.user.email);
      
      if (isLecturer) {
        // Store the login timestamp
        localStorage.setItem('iit_lecturer_last_login', currentTime.toString());
        
        // Save user data to Firestore
        await saveUserToFirestore(result.user);
        
        // Redirect to lecturer dashboard
        navigate('/lecturer-dashboard');
      } else {
        // Not a lecturer, sign out
        await signOut(auth);
        setError('Access denied. Only authorized lecturers can access this portal.');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        setError('Popup was blocked. Please allow popups for this site.');
      } else {
        setError('Failed to sign in with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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
          <span className="text-white text-2xl font-bold">IIT Portal</span>
        </div>
      </div>

      {/* Left Panel - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 bg-gradient-to-br from-emerald-400 to-cyan-600 p-12 flex-col justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-white" />
          <span className="text-white text-2xl font-bold">IIT Portal</span>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white">Welcome to Lecturer Portal</h1>
          <p className="text-emerald-50 text-lg">
            Access your lecturer dashboard to manage your courses, students, and academic activities.
          </p>
        </div>
        
        <div className="text-sm text-emerald-50 opacity-70">
          © 2025 IIT Lecturer Portal. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 xl:w-3/5 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center lg:text-left px-4 pt-4 pb-2">
            <h2 className="text-2xl font-bold text-gray-900">Lecturer Sign In</h2>
            <p className="mt-2 text-base text-gray-600">
              Continue with your Google account to access the lecturer portal
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-base flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span>{error}</span>
            </div>
          )}

          <div className="px-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 py-4 border border-gray-300 rounded-2xl px-4 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 text-lg font-medium"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                  </svg>
                  <span className="text-gray-700">Continue with Google</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Footer */}
          <div className="mt-8 text-center text-sm text-gray-500 lg:hidden px-4">
            © 2025 IIT Lecturer Portal. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default IITLecturerLogin;