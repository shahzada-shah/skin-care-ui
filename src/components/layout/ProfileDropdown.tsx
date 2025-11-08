/**
 * ProfileDropdown Component
 *
 * Dropdown menu for user authentication and profile access.
 * Shows sign in/sign up options for unauthenticated users.
 * Opens on hover from the header user icon.
 *
 * @component
 * @example
 * <ProfileDropdown isOpen={true} />
 */

import { Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';

interface ProfileDropdownProps {
  isOpen: boolean;
}

export const ProfileDropdown = ({ isOpen }: ProfileDropdownProps) => {
  return (
    <div
      className={`absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl w-80 transition-all duration-300 overflow-hidden ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-light text-gray-900 mb-2">
            Welcome!
          </h3>
          <p className="text-sm text-gray-500">
            Sign in to your account or register
          </p>
        </div>

        <div className="space-y-3">
          <Link
            to="/login"
            className="w-full bg-black text-white py-3.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.98]"
          >
            <LogIn size={18} strokeWidth={2} />
            Sign In
          </Link>

          <Link
            to="/signup"
            className="w-full bg-white text-black border-2 border-black py-3.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <UserPlus size={18} strokeWidth={2} />
            Register
          </Link>
        </div>

        <div className="mt-6 pt-5 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            By signing in, you will get access to orders, favorites and personalized recommendations
          </p>
        </div>
      </div>
    </div>
  );
};
