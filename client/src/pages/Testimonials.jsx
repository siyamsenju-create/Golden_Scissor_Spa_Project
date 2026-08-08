import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/reviews')
      .then(res => setReviews(res.data.data))
      .catch(() => {
        setReviews([
          {
            _id: '1',
            customerId: { name: 'James Sterling', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5vVt02nWdYnUx_li8M_pM5xodWY23wERkraX8N_SiOtjpgVTQuC232FGf4MKfXIFLWJ6fq4L7gZ5s58CWJPb6_Lg4V_K4kX6GgJAhF4Xk1TnHtqK4dSfFCStYgYkh7-UdEIKiXsHW5Xtj58FHjHUl7aIb-GDUo8Eee3GkQeG6sjoc7EE9_BVxIFhgHqZ4tl6faVkxTheE07Ew0XZSGAQahEhLoGUhztRj8r5gbXzk7JXla113Mfyc20twl4uEbcGuEDtI1pF-wfeg' },
            rating: 5,
            comment: 'Outstanding service! Julian V is a true master artisan. Best haircut and scalp wash I have ever received.',
            reply: 'Thank you James, pleasure having you in the sanctuary.'
          },
          {
            _id: '2',
            customerId: { name: 'Robert C.', avatar: '' },
            rating: 5,
            comment: 'Superb hot towel wet shave. Extremely relaxed atmosphere, warm amber backlighting was incredibly comforting.'
          }
        ]);
      });
  }, []);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="max-container" style={{ textAlign: 'center', marginBottom: '80px' }}>
        <span style={{ color: '#f2ca50', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '12px' }}>
          Distinguished Patron Words
        </span>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '52px', color: '#e5e2e1', marginBottom: '20px' }}>
          Client Reviews
        </h1>
        <p style={{ color: '#d0c5af', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Hear directly from high-net-worth gentlemen who entrust their personal style to Golden Scissor Spa.
        </p>
      </div>

      <div className="max-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {reviews.map((rev) => (
            <div key={rev._id} className="glass-card" style={{ padding: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#201f1f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f2ca50', fontWeight: 'bold' }}>
                  {rev.customerId?.name ? rev.customerId.name[0] : 'C'}
                </div>
                <div>
                  <h4 style={{ color: '#e5e2e1', fontSize: '18px' }}>{rev.customerId?.name || 'Anonymous Client'}</h4>
                  <div style={{ color: '#f2ca50', fontSize: '14px' }}>
                    {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                  </div>
                </div>
              </div>

              <p style={{ color: '#d0c5af', fontSize: '15px', lineHeight: '1.6', fontStyle: 'italic', marginBottom: rev.reply ? '20px' : '0' }}>
                "{rev.comment}"
              </p>

              {rev.reply && (
                <div style={{ backgroundColor: 'rgba(242, 202, 80, 0.05)', borderLeft: '2px solid #f2ca50', padding: '12px 16px', marginTop: '16px' }}>
                  <span style={{ color: '#f2ca50', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
                    Lounge Response:
                  </span>
                  <p style={{ color: '#e5e2e1', fontSize: '13px' }}>{rev.reply}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
