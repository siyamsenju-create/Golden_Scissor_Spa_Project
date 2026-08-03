import React from 'react';
import { Link } from 'react-router-dom';

const ConciergeWidget = () => {
  return (
    <Link
      to="/booking"
      className="glass-card"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 24px',
        borderRadius: '4px',
        textDecoration: 'none',
        transition: 'all 0.4s ease'
      }}
    >
      <span className="material-symbols-outlined" style={{ color: '#f2ca50', fontSize: '24px' }}>
        calendar_month
      </span>
      <span
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: '12px',
          fontWeight: '600',
          color: '#e5e2e1',
          textTransform: 'uppercase',
          letterSpacing: '1.5px'
        }}
      >
        Reserve Experience
      </span>
    </Link>
  );
};

export default ConciergeWidget;
