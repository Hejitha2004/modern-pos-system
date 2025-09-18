import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/items', label: 'Items', icon: '📦' },
    { path: '/categories', label: 'Categories', icon: '🏷️' },
    { path: '/stock', label: 'Stock', icon: '📈' },
    { path: '/pos', label: 'POS', icon: '🛒' },
    { path: '/login', label: 'Logout', icon: '🚪' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav style={{
        backgroundColor: '#1a202c',
        padding: '0 20px',
        position: 'relative',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '70px'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#667eea',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'white'
            }}>
              POS
            </div>
            <span style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: '700'
            }}>
              System
            </span>
          </div>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            gap: '5px',
            alignItems: 'center'
          }}>
            {/* Desktop Menu */}
            <div style={{
              display: window.innerWidth >= 768 ? 'flex' : 'none',
              gap: '5px'
            }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    backgroundColor: isActive(item.path) ? '#667eea' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.backgroundColor = '#374151';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                display: window.innerWidth < 768 ? 'flex' : 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div style={{
            position: 'absolute',
            top: '70px',
            left: '0',
            right: '0',
            backgroundColor: '#1a202c',
            borderTop: '1px solid #374151',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000
          }}>
            <div style={{
              padding: '10px'
            }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '15px 20px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    backgroundColor: isActive(item.path) ? '#667eea' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '5px',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.backgroundColor = '#374151';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 999
          }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Add responsive CSS */}
      <style>
        {`
          @media (max-width: 767px) {
            .desktop-nav {
              display: none !important;
            }
            .mobile-menu-btn {
              display: flex !important;
            }
          }
          
          @media (min-width: 768px) {
            .desktop-nav {
              display: flex !important;
            }
            .mobile-menu-btn {
              display: none !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default Navbar;