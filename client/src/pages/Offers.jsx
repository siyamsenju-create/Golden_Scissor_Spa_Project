import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/offers')
      .then(res => setOffers(res.data.data))
      .catch(() => {
        setOffers([
          { _id: '1', title: 'Welcome Discount', description: 'Get 20% off your initial sanctuary session.', code: 'GOLDEN20', discountPercent: 20 },
          { _id: '2', title: 'Royal Spa Treatment', description: 'Experience pure indulgence at 15% discount.', code: 'ROYAL15', discountPercent: 15 }
        ]);
      });
  }, []);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="max-container" style={{ textAlign: 'center', marginBottom: '80px' }}>
        <span style={{ color: '#f2ca50', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '12px' }}>
          Privileges
        </span>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '52px', color: '#e5e2e1', marginBottom: '20px' }}>
          Exclusive Offers
        </h1>
        <p style={{ color: '#d0c5af', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Use the promo codes below at checkout during reservation to apply special savings.
        </p>
      </div>

      <div className="max-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {offers.map((offer) => (
            <div key={offer._id} className="glass-card" style={{ padding: '40px', borderLeft: '4px solid #f2ca50' }}>
              <span style={{ background: '#f2ca50', color: '#3c2f00', padding: '4px 12px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'inline-block', marginBottom: '16px' }}>
                {offer.discountPercent}% OFF
              </span>
              <h3 style={{ fontSize: '26px', color: '#e5e2e1', marginBottom: '12px' }}>{offer.title}</h3>
              <p style={{ color: '#d0c5af', fontSize: '15px', marginBottom: '24px' }}>{offer.description}</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1c1b1b', padding: '12px 20px', border: '1px dashed #f2ca50' }}>
                <span style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase' }}>Promo Code:</span>
                <span style={{ color: '#f2ca50', fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px' }}>{offer.code}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
