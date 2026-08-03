import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Pricing = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/memberships')
      .then(res => setPlans(res.data.data))
      .catch(() => {
        setPlans([
          {
            _id: '1',
            name: 'Essential',
            price: 45,
            benefits: [
              'Precision Scissor Cut',
              'Hot Towel Refresh',
              'Artisanal Hair Styling',
              'Straight Razor Finish'
            ]
          },
          {
            _id: '2',
            name: 'Signature',
            price: 85,
            isPopular: true,
            benefits: [
              'Everything in Essential',
              'Signature Facial Massage',
              'Bergamot Beard Therapy',
              'Gold-Infused Scalp Wash',
              'Craft Beverage Pairing'
            ]
          },
          {
            _id: '3',
            name: 'Royal',
            price: 150,
            benefits: [
              'Everything in Signature',
              'Private Vault Suite Access',
              'Hand & Arm Acupressure',
              'Premium Cigar Lounge Pass',
              'Exclusive Fragrance Kit'
            ]
          }
        ]);
      });
  }, []);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      {/* Hero */}
      <div className="max-container" style={{ textAlign: 'center', marginBottom: '80px' }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', border: '1px solid rgba(242,202,80,0.3)', marginBottom: '20px', borderRadius: '20px', backgroundColor: 'rgba(242,202,80,0.05)' }}>
          <span style={{ color: '#f2ca50', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>
            The Sanctuary of Precision
          </span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '56px', color: '#e5e2e1', marginBottom: '20px' }}>
          Curated Experiences
        </h1>
        <p style={{ color: '#d0c5af', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Select the tier of indulgence that fits your lifestyle. Every service is a masterclass in traditional grooming.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', alignItems: 'stretch' }}>
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="glass-card"
              style={{
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                position: 'relative',
                border: plan.isPopular ? '1px solid #f2ca50' : '1px solid rgba(242, 202, 80, 0.1)',
                boxShadow: plan.isPopular ? '0 0 40px rgba(242, 202, 80, 0.1)' : 'none'
              }}
            >
              {plan.isPopular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-14px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#f2ca50',
                    color: '#3c2f00',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    padding: '4px 16px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  Most Popular
                </div>
              )}

              <div>
                <h3 style={{ fontSize: '28px', color: '#e5e2e1', marginBottom: '12px' }}>{plan.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '30px' }}>
                  <span style={{ color: '#f2ca50', fontSize: '24px', fontFamily: "'Playfair Display', serif" }}>$</span>
                  <span style={{ color: '#f2ca50', fontSize: '56px', fontFamily: "'Playfair Display', serif", fontWeight: 'bold' }}>{plan.price}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                  {plan.benefits.map((benefit, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span className="material-symbols-outlined" style={{ color: '#f2ca50', fontSize: '20px' }}>
                        check_circle
                      </span>
                      <span style={{ color: '#d0c5af', fontSize: '15px' }}>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link to="/booking">
                <button
                  className="gold-shine"
                  style={{
                    width: '100%',
                    background: plan.isPopular ? '#f2ca50' : 'transparent',
                    color: plan.isPopular ? '#3c2f00' : '#f2ca50',
                    border: plan.isPopular ? 'none' : '1px solid #f2ca50',
                    padding: '16px',
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    cursor: 'pointer'
                  }}
                >
                  Choose {plan.name}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
