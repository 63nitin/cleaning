import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Ensure you have your styles imported

// A single, reusable link component for both desktop and mobile
const CustomNavLink = ({ href, children, isMobile = false, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className={`
      ${isMobile 
        ? 'block w-full px-3 py-2 text-center text-gray-800 hover:bg-gray-100 hover:text-blue-500 rounded-md transition'
        : 'text-gray-800 hover:text-blue-500 font-medium px-3 py-2 rounded-md text-lg transition'
      }
    `}
  >
    {children}
  </a>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT US' },
    { href: '/services', label: 'SERVICES' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <nav 
      className={` card line
        fixed top-0 left-0 right-0 z-50 shadow-md
        transition-all duration-300 ease-in-out bg-white
        ${isScrolled ? 'rounded-xl top-3 left-3 right-3' : 'py-2'}
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" onClick={closeMobileMenu}>
              <img src="/logo.png" alt="Logo" width={90} height={30} />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:flex-1 md:ml-10 lg:ml-20">
            <div className="flex space-x-4 lg:space-x-6">
              {navLinks.map((link) => (
                <CustomNavLink key={link.href} href={link.href}>
                  {link.label}
                </CustomNavLink>
              ))}
            </div>
            <Link
              to="/contact"
              className=" button ml-4 button py-2 px-4 rounded-2xl bg-blue-400 text-white font-bold shadow transition hover:shadow-md"
            >
              GETTING STARTED
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex p-2 rounded-md bg-white text-gray-800 shadow-sm border focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-300"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden box card bg-white transition-all ease-in-out duration-700 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 p-5 opacity-100 py-2' : 'max-h-0 opacity-0'
        }`}
        id="mobile-menu"
      >
        <div className="space-y-2 pb-5 text-center rounded-xl">
          {navLinks.map((link) => (
            <CustomNavLink key={link.href} href={link.href} isMobile onClick={closeMobileMenu}>
              {link.label}
            </CustomNavLink>
          ))}
          <Link
            to="/contact"
              onClick={closeMobileMenu}
            className="p-3 mx-auto button py-2 bg-blue-400 text-white font-semibold rounded-full items-center justify-center shadow transition hover:shadow-lg"
          >
            GETTING STARTED
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;