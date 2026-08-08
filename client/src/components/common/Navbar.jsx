import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import businessConfig from '../../config/businessConfig';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        background: isScrolled ? 'rgba(19, 19, 19, 0.85)' : 'transparent',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(77, 70, 53, 0.2)',
        transition: 'all 0.5s ease-in-out',
        padding: isScrolled ? '12px 0' : '20px 0'
      }}
    >
      <div className="max-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Brand logo & name */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            alt="Golden Scissor Spa"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR-qyn9obwzzGyWIhFAOYnT6WMED3nyIsfwct7jssC3GgtXiR0mryui0neDjNN_e2AX1Otof76gNPDcEdzHzhWWN1hmvM5IGNVKvA_uMFtJPrU7w7dr8TLtOSgV_lQmORkpOhbFbfBqSags_lkpnry4roctunlyTSKpslJg8nhzK7I-9z0lXpHHQvL-fmn-vTuLOs1vP3y5HpiimdYdJ3kf-oMk-yTthQPbbhz2aWRvczaoJPs7yNImK9C8nK4GMK-OhQY3gCNkTBQ"
            style={{ height: '36px', width: '36px', objectFit: 'contain' }}
          />
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#f2ca50',
              letterSpacing: '-0.5px'
            }}
          >
            {businessConfig.name}
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }} className="hidden md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.label}
                to={link.path}
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: isActive ? '#f2ca50' : '#d0c5af',
                  borderBottom: isActive ? '2px solid #f2ca50' : '2px solid transparent',
                  paddingBottom: '4px',
                  transition: 'color 0.3s ease'
                }}
                className="hover-gold"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }} className="hidden md:flex">
          <Link
            to="/login"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '13px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#d0c5af'
            }}
          >
            Portal
          </Link>
          <Link to="/booking">
            <button
              className="gold-shine"
              style={{
                background: '#f2ca50',
                color: '#3c2f00',
                padding: '10px 24px',
                border: 'none',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                cursor: 'pointer',
                transition: 'all 0.4s ease-in-out'
              }}
            >
              Reserve Now
            </button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#f2ca50',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
          className="md:hidden"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '30px' }}>
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: '#131313',
            borderBottom: '1px solid rgba(77, 70, 53, 0.3)',
            padding: '20px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            alignItems: 'center',
            zIndex: 49
          }}
          className="md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                color: location.pathname === link.path ? '#f2ca50' : '#e5e2e1'
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/login" onClick={() => setIsOpen(false)} style={{ color: '#d0c5af', textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '14px', fontWeight: '600' }}>
            Portal
          </Link>
          <Link to="/booking" onClick={() => setIsOpen(false)}>
            <button
              className="gold-shine"
              style={{
                background: '#f2ca50',
                color: '#3c2f00',
                padding: '12px 30px',
                border: 'none',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                cursor: 'pointer'
              }}
            >
              Reserve Now
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
