import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState } from '@/redux/store';
import { IProfile } from '@/features/profile/types/profile.types';
import { logoutUser } from '@/redux/auth.slice';
import { LanguageSwitcher } from '@/components/common';

// Brand/Logo Component
const Brand = () => (
  <div className="flex items-center">
    <div className="flex-shrink-0">
      <Link to="/" className="text-xl font-bold text-white hover:text-blue-100 transition-colors">
        Quiz App
      </Link>
    </div>
  </div>
);

// Navigation Link Component
const NavLink = ({
  to,
  children,
  className = '',
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <Link
    to={to}
    className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors ${className}`}
  >
    {children}
  </Link>
);

// Logout Button Component
const LogoutButton = ({ onClick, className = '' }: { onClick: () => void; className?: string }) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={onClick}
      className={`text-white/90 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${className}`}
    >
      {t('auth.logout')}
    </button>
  );
};

// Auth Links Component
const AuthLinks = ({
  isLoggedIn,
  onLogout,
  className = '',
}: {
  isLoggedIn: boolean;
  onLogout: () => void;
  className?: string;
}) => {
  const { t } = useTranslation();
  return (
    <>
      {isLoggedIn ? (
        <LogoutButton onClick={onLogout} className={className} />
      ) : (
        <>
          <NavLink to="/login" className={className}>
            {t('auth.login')}
          </NavLink>
          <NavLink to="/register" className={className}>
            {t('auth.register')}
          </NavLink>
        </>
      )}
    </>
  );
};

// Desktop Navigation Component
const DesktopNavigation = ({
  isLoggedIn,
  onLogout,
  profile,
}: {
  isLoggedIn: boolean;
  onLogout: () => void;
  profile: IProfile | null;
}) => {
  const { t } = useTranslation();
  return (
    <div className="hidden md:flex items-center space-x-8">
      <NavLink to="/profile">
        {profile?.first_name} {profile?.last_name}
      </NavLink>
      <NavLink to="/dashboard">{t('navigation.dashboard')}</NavLink>
      <NavLink to="/quizzes">{t('navigation.quizzes')}</NavLink>
      <LanguageSwitcher />
      <AuthLinks isLoggedIn={isLoggedIn} onLogout={onLogout} />
    </div>
  );
};

// Mobile Menu Button Component
const MobileMenuButton = ({ onClick }: { onClick: () => void }) => (
  <div className="md:hidden flex items-center">
    <button
      type="button"
      onClick={onClick}
      className="text-white/90 hover:text-white focus:outline-none focus:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-600"
      aria-label="Toggle menu"
    >
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  </div>
);

// Mobile Navigation Component
const MobileNavigation = ({
  isLoggedIn,
  onLogout,
  isOpen,
  profile,
}: {
  isLoggedIn: boolean;
  onLogout: () => void;
  isOpen: boolean;
  profile: IProfile | null;
}) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <NavLink to="/profile" className="block text-base">
          {profile?.first_name} {profile?.last_name}
        </NavLink>
        <NavLink to="/dashboard" className="block text-base">
          {t('navigation.dashboard')}
        </NavLink>
        <NavLink to="/quizzes" className="block text-base">
          {t('navigation.quizzes')}
        </NavLink>
        <div className="py-2">
          <LanguageSwitcher />
        </div>
        <AuthLinks isLoggedIn={isLoggedIn} onLogout={onLogout} className="block text-base" />
      </div>
    </div>
  );
};

// Main Navbar Component
const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading } = useSelector((state: RootState) => state.profile);
  const isLoggedIn = profile !== null;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Brand />
          {!loading && (
            <>
              <DesktopNavigation
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                profile={profile}
              />
              <MobileMenuButton onClick={toggleMobileMenu} />
            </>
          )}
        </div>
        <MobileNavigation
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          isOpen={isMobileMenuOpen}
          profile={profile}
        />
      </div>
    </nav>
  );
};

export default Navbar;
