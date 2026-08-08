import React from 'react';
import { Link } from 'react-router-dom';
import businessConfig from '../../config/businessConfig';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#0e0e0e',
        borderTop: '1px solid rgba(77, 70, 53, 0.3)',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div
        className="max-container"
        style={{
          paddingTop: '64px',
          paddingBottom: '64px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px'
        }}
      >
        {/* Brand Col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              alt="Golden Scissor Footer Logo"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR-qyn9obwzzGyWIhFAOYnT6WMED3nyIsfwct7jssC3GgtXiR0mryui0neDjNN_e2AX1Otof76gNPDcEdzHzhWWN1hmvM5IGNVKvA_uMFtJPrU7w7dr8TLtOSgV_lQmORkpOhbFbfBqSags_lkpnry4roctunlyTSKpslJg8nhzK7I-9z0lXpHHQvL-fmn-vTuLOs1vP3y5HpiimdYdJ3kf-oMk-yTthQPbbhz2aWRvczaoJPs7yNImK9C8nK4GMK-OhQY3gCNkTBQ"
              style={{ height: '48px', width: '48px', objectFit: 'contain' }}
            />
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#f2ca50'
              }}
            >
              {businessConfig.name}
            </span>
          </div>
          <p style={{ color: '#d0c5af', fontSize: '14px', lineHeight: '1.6' }}>
            The Sanctuary of Grooming. Elevating the modern man through tradition and modern precision.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4
            style={{
              color: '#f2ca50',
              fontFamily: "'Manrope', sans-serif",
              fontSize: '13px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '24px'
            }}
          >
            Navigation
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link to="/" style={{ color: '#d0c5af', fontSize: '14px' }}>Home</Link></li>
            <li><Link to="/about" style={{ color: '#d0c5af', fontSize: '14px' }}>About Us</Link></li>
            <li><Link to="/services" style={{ color: '#d0c5af', fontSize: '14px' }}>Services</Link></li>
            <li><Link to="/pricing" style={{ color: '#d0c5af', fontSize: '14px' }}>Pricing Tiers</Link></li>
            <li><Link to="/gallery" style={{ color: '#d0c5af', fontSize: '14px' }}>Portfolio</Link></li>
            <li><Link to="/booking" style={{ color: '#d0c5af', fontSize: '14px' }}>Reservations</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4
            style={{
              color: '#f2ca50',
              fontFamily: "'Manrope', sans-serif",
              fontSize: '13px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '24px'
            }}
          >
            Explore
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link to="/team" style={{ color: '#d0c5af', fontSize: '14px' }}>Master Stylists</Link></li>
            <li><Link to="/membership" style={{ color: '#d0c5af', fontSize: '14px' }}>Memberships</Link></li>
            <li><Link to="/offers" style={{ color: '#d0c5af', fontSize: '14px' }}>Exclusive Offers</Link></li>
            <li><Link to="/testimonials" style={{ color: '#d0c5af', fontSize: '14px' }}>Client Reviews</Link></li>
            <li><Link to="/contact" style={{ color: '#d0c5af', fontSize: '14px' }}>Contact Concierge</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h4
            style={{
              color: '#f2ca50',
              fontFamily: "'Manrope', sans-serif",
              fontSize: '13px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1.5px'
            }}
          >
            Newsletter
          </h4>
          <p style={{ color: '#d0c5af', fontSize: '13px' }}>
            Subscribe to receive private lounge invitations and special announcements.
          </p>
          <div style={{ position: 'relative' }}>
            <input
              type="email"
              placeholder="Email Address"
              style={{
                width: '100%',
                backgroundColor: '#201f1f',
                border: 'none',
                borderBottom: '1px solid #4d4635',
                padding: '12px 40px 12px 12px',
                color: '#e5e2e1',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: '#f2ca50',
                cursor: 'pointer'
              }}
            >
              <span className="material-symbols-outlined">arrow_right_alt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: '1px solid rgba(77, 70, 53, 0.2)',
          padding: '24px 0'
        }}
      >
        <div
          className="max-container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '15px'
          }}
        >
          <p style={{ color: '#d0c5af', fontSize: '13px', fontFamily: "'Manrope', sans-serif" }}>
            © {new Date().getFullYear()} {businessConfig.name}. The Sanctuary of Precision.
          </p>
          <p
            style={{
              color: '#d0c5af',
              fontSize: '12px',
              fontFamily: "'Manrope', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}
          >
            Designed for the Distinguished
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
