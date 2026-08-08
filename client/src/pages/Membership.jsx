import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Membership = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/memberships')
      .then(res => setPlans(res.data.data))
      .catch(() => {
        setPlans([
          { _id: '1', name: 'Essential', price: 45, benefits: ['5% Off all bookings', 'Priority booking window', 'Complimentary beverage'] },
          { _id: '2', name: 'Signature', price: 85, benefits: ['10% Off all bookings', 'Private Vault Suite access', 'Free monthly beard trim', 'Complimentary beverage'] },
          { _id: '3', name: 'Royal', price: 150, benefits: ['15% Off all bookings', 'Unlimited private suite reservation', 'Free monthly facial', 'Exclusive fragrance gift kit'] }
        ]);
      });
  }, []);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="max-container" style={{ textAlign: 'center', marginBottom: '80px' }}>
        <span style={{ color: '#f2ca50', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '12px' }}>
          Exclusive Club
        </span>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '52px', color: '#e5e2e1', marginBottom: '20px' }}>
          Membership Plans
        </h1>
        <p style={{ color: '#d0c5af', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Unlock tailored privileges, priority access, and exclusive loyalty rewards with our club subscriptions.
        </p>
      </div>

      <div className="max-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {plans.map((plan) => (
            <div key={plan._id} className="glass-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '28px', color: '#e5e2e1', marginBottom: '12px' }}>{plan.name} Plan</h3>
                <div style={{ color: '#f2ca50', fontSize: '48px', fontFamily: "'Playfair Display', serif", fontWeight: 'bold', marginBottom: '30px' }}>
                  ${plan.price} <span style={{ fontSize: '14px', color: '#d0c5af', fontFamily: "'Manrope', sans-serif" }}>/ month</span>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                  {plan.benefits.map((b, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d0c5af', fontSize: '14px' }}>
                      <span className="material-symbols-outlined" style={{ color: '#f2ca50', fontSize: '18px' }}>check_circle</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/booking">
                <button
                  className="gold-shine"
                  style={{
                    width: '100%',
                    background: '#f2ca50',
                    color: '#3c2f00',
                    border: 'none',
                    padding: '14px',
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    cursor: 'pointer'
                  }}
                >
                  Subscribe to {plan.name}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Membership;
