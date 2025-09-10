'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/#home' },
    { name: 'About', path: '/#about' },
    { name: 'Services', path: '/#services' },
    { name: 'Contact', path: '/#contact' },
    { name: 'Careers', path: '/careers' },
  ];

  const scrollToSection = (path: string) => {
    if (path.startsWith('/#')) {
      // If we're on the careers page, navigate to home first, then scroll
      if (pathname === '/careers') {
        window.location.href = path;
        setIsOpen(false);
        return;
      }
      
      const element = document.querySelector(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800/50 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex-shrink-0 flex items-center"
            >
              <Image
                src="/logo.png"
                alt="Anoka Health Center Logo"
                width={60}
                height={60}
                className="hover:opacity-90 transition-opacity duration-300"
                style={{ filter: 'none' }}
              />
              <div className="ml-2 flex flex-col">
                <span className="text-2xl font-bold text-white leading-none">ANOKA</span>
                <span className="text-sm text-white">Health Center LLC</span>
              </div>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              item.path.startsWith('/#') ? (
                <button
                  key={item.path}
                  onClick={() => scrollToSection(item.path)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-[#00799F] hover:bg-gray-800/50 transition duration-300"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.path
                      ? 'text-[#00799F] bg-gray-800/50'
                      : 'text-gray-300 hover:text-[#00799F] hover:bg-gray-800/50'
                  } transition duration-300`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-[#00799F] hover:bg-gray-800/50 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              item.path.startsWith('/#') ? (
                <button
                  key={item.path}
                  onClick={() => scrollToSection(item.path)}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-[#00799F] hover:bg-gray-800/50 transition duration-300"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    pathname === item.path
                      ? 'text-[#00799F] bg-gray-800/50'
                      : 'text-gray-300 hover:text-[#00799F] hover:bg-gray-800/50'
                  } transition duration-300`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 