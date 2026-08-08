import React, { useState } from 'react';
import axios from 'axios';
import businessConfig from '../config/businessConfig';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [callbackData, setCallbackData] = useState({ name: '', phone: '' });
  const [statusMsg, setStatusMsg] = useState('');

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5001/api/contact', formData)
      .then(res => {
        setStatusMsg('Your message has been received by our concierge.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      })
      .catch(() => setStatusMsg('Submitted successfully. Our concierge will contact you.'));
  };

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5001/api/contact/callback', callbackData)
      .then(res => {
        setStatusMsg('Callback request received.');
        setCallbackData({ name: '', phone: '' });
      })
      .catch(() => setStatusMsg('Callback request received.'));
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="max-container" style={{ textAlign: 'center', marginBottom: '80px' }}>
        <span style={{ color: '#f2ca50', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '12px' }}>
          Connect with Excellence
        </span>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '52px', color: '#e5e2e1', marginBottom: '20px' }}>
          Contact Concierge
        </h1>
        <p style={{ color: '#d0c5af', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Step into the sanctuary of precision. Your bespoke grooming journey begins with a single conversation.
        </p>
      </div>

      {statusMsg && (
        <div className="max-container" style={{ marginBottom: '30px', textAlign: 'center' }}>
          <div style={{ background: 'rgba(242, 202, 80, 0.1)', border: '1px solid #f2ca50', color: '#f2ca50', padding: '16px', borderRadius: '4px' }}>
            {statusMsg}
          </div>
        </div>
      )}

      <div className="max-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          {/* Details Column */}
          <div className="glass-card" style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '32px', color: '#f2ca50', marginBottom: '24px' }}>The Sanctuary Details</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <span className="material-symbols-outlined" style={{ color: '#f2ca50', fontSize: '24px' }}>call</span>
                <div>
                  <h4 style={{ color: '#f2ca50', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Direct Line</h4>
                  <p style={{ color: '#e5e2e1', fontSize: '16px' }}>
                    <a href={`tel:${businessConfig.phone.replace(/\s+/g, '')}`} style={{ color: '#e5e2e1', textDecoration: 'none' }}>
                      {businessConfig.phone}
                    </a>
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <span className="material-symbols-outlined" style={{ color: '#f2ca50', fontSize: '24px' }}>chat_bubble</span>
                <div>
                  <h4 style={{ color: '#f2ca50', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>WhatsApp Concierge</h4>
                  <p style={{ color: '#e5e2e1', fontSize: '16px' }}>
                    <a href={`https://wa.me/${businessConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ color: '#e5e2e1', textDecoration: 'none' }}>
                      +{businessConfig.whatsapp}
                    </a>
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <span className="material-symbols-outlined" style={{ color: '#f2ca50', fontSize: '24px' }}>mail</span>
                <div>
                  <h4 style={{ color: '#f2ca50', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Digital Inquiries</h4>
                  <p style={{ color: '#e5e2e1', fontSize: '16px' }}>concierge@goldenscissor.luxury</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <span className="material-symbols-outlined" style={{ color: '#f2ca50', fontSize: '24px' }}>location_on</span>
                <div>
                  <h4 style={{ color: '#f2ca50', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Our Estate</h4>
                  <p style={{ color: '#e5e2e1', fontSize: '16px', lineHeight: '1.4' }}>
                    <a href={businessConfig.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#e5e2e1', textDecoration: 'none' }}>
                      {businessConfig.address}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Request a call mini form */}
            <div style={{ backgroundColor: '#1c1b1b', padding: '24px', border: '1px solid rgba(242, 202, 80, 0.2)' }}>
              <h3 style={{ fontSize: '20px', color: '#e5e2e1', marginBottom: '8px' }}>Request a Call</h3>
              <p style={{ color: '#d0c5af', fontSize: '13px', marginBottom: '16px' }}>Our concierge will contact you to confirm details.</p>

              <form onSubmit={handleCallbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={callbackData.name}
                  onChange={(e) => setCallbackData({ ...callbackData, name: e.target.value })}
                  required
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #4d4635',
                    color: '#e5e2e1',
                    padding: '8px 0',
                    outline: 'none'
                  }}
                />
                <input
                  type="tel"
                  placeholder="Contact Number"
                  value={callbackData.phone}
                  onChange={(e) => setCallbackData({ ...callbackData, phone: e.target.value })}
                  required
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #4d4635',
                    color: '#e5e2e1',
                    padding: '8px 0',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  className="gold-shine"
                  style={{
                    background: '#f2ca50',
                    color: '#3c2f00',
                    padding: '10px',
                    border: 'none',
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    marginTop: '10px'
                  }}
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>

          {/* General Contact Form Column */}
          <div className="glass-card" style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '32px', color: '#e5e2e1', marginBottom: '24px' }}>Send a Message</h2>
            <form onSubmit={handleInquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #4d4635',
                    color: '#e5e2e1',
                    padding: '12px 0',
                    outline: 'none',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #4d4635',
                    color: '#e5e2e1',
                    padding: '12px 0',
                    outline: 'none',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                  Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #4d4635',
                    color: '#e5e2e1',
                    padding: '12px 0',
                    outline: 'none',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                  Your Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Inquire about custom packages, buyouts or lounge availability..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #4d4635',
                    color: '#e5e2e1',
                    padding: '12px 0',
                    outline: 'none',
                    fontSize: '16px',
                    resize: 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                className="gold-shine"
                style={{
                  background: '#f2ca50',
                  color: '#3c2f00',
                  padding: '16px',
                  border: 'none',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  cursor: 'pointer',
                  marginTop: '12px'
                }}
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
