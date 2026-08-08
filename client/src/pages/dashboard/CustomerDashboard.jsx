import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    // Fetch profile
    axios.get('http://localhost:5001/api/auth/me', { withCredentials: true })
      .then(res => setUser(res.data.data))
      .catch(() => {
        // Fallback user if non-authed demo
        setUser({
          name: 'James Sterling',
          email: 'james.s@luxury.com',
          phone: '+1 (555) 000-0000',
          loyaltyPoints: 140,
          membershipId: { name: 'Signature Plan' }
        });
      });

    // Fetch bookings
    axios.get('http://localhost:5001/api/bookings', { withCredentials: true })
      .then(res => setBookings(res.data.data))
      .catch(() => {
        setBookings([
          { _id: '1', serviceId: { name: 'Master Cut' }, staffId: { userId: { name: 'Julian V.' } }, date: '2026-08-10', timeSlot: '11:30 AM', totalAmount: 85, status: 'confirmed' },
          { _id: '2', serviceId: { name: 'Royal Shave' }, staffId: { userId: { name: 'Marco R.' } }, date: '2026-07-20', timeSlot: '02:30 PM', totalAmount: 65, status: 'completed' }
        ]);
      });

    // Fetch wishlist
    axios.get('http://localhost:5001/api/users/wishlist', { withCredentials: true })
      .then(res => setWishlist(res.data.data))
      .catch(() => {
        setWishlist([
          { _id: '1', name: 'Facial Treatments', price: 85, category: 'Rejuvenation' }
        ]);
      });
  }, []);

  const handleCancelBooking = (bookingId) => {
    axios.put(`http://localhost:5001/api/bookings/${bookingId}/cancel`, {}, { withCredentials: true })
      .then(() => {
        setMsg('Booking cancelled successfully.');
        setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: 'cancelled' } : b));
      })
      .catch(err => setMsg(err.response?.data?.message || 'Cancellation limit: Must be 24h prior.'));
  };

  const handleLogout = () => {
    axios.post('http://localhost:5001/api/auth/logout', {}, { withCredentials: true })
      .finally(() => navigate('/login'));
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="max-container">
        {/* Welcome Header */}
        <div className="glass-card" style={{ padding: '30px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ fontSize: '32px', color: '#f2ca50' }}>Welcome, {user?.name || 'Valued Patron'}</h1>
            <p style={{ color: '#d0c5af', fontSize: '14px' }}>Membership: <strong style={{ color: '#e5e2e1' }}>{user?.membershipId?.name || 'Club Member'}</strong></p>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#1c1b1b', border: '1px solid #f2ca50', padding: '12px 20px', textAlign: 'center' }}>
              <span style={{ color: '#f2ca50', fontSize: '22px', fontWeight: 'bold', display: 'block' }}>{user?.loyaltyPoints || 0}</span>
              <span style={{ color: '#d0c5af', fontSize: '11px', textTransform: 'uppercase' }}>Loyalty Points</span>
            </div>

            <button
              onClick={handleLogout}
              style={{ background: 'transparent', border: '1px solid #4d4635', color: '#d0c5af', padding: '10px 20px', cursor: 'pointer', fontSize: '12px', textTransform: 'uppercase' }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {msg && (
          <div style={{ backgroundColor: 'rgba(242,202,80,0.1)', border: '1px solid #f2ca50', color: '#f2ca50', padding: '12px', marginBottom: '20px', fontSize: '14px' }}>
            {msg}
          </div>
        )}

        {/* Dashboard Tabs & Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '30px' }}>
          {/* Navigation Sidebar */}
          <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => setActiveTab('bookings')}
              style={{
                textAlign: 'left',
                padding: '12px',
                background: activeTab === 'bookings' ? 'rgba(242, 202, 80, 0.15)' : 'transparent',
                color: activeTab === 'bookings' ? '#f2ca50' : '#d0c5af',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              📋 My Reservations
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              style={{
                textAlign: 'left',
                padding: '12px',
                background: activeTab === 'wishlist' ? 'rgba(242, 202, 80, 0.15)' : 'transparent',
                color: activeTab === 'wishlist' ? '#f2ca50' : '#d0c5af',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              ♡ Wishlist Services
            </button>
            <button
              onClick={() => setActiveTab('loyalty')}
              style={{
                textAlign: 'left',
                padding: '12px',
                background: activeTab === 'loyalty' ? 'rgba(242, 202, 80, 0.15)' : 'transparent',
                color: activeTab === 'loyalty' ? '#f2ca50' : '#d0c5af',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              ★ Loyalty &amp; Rewards
            </button>
          </div>

          {/* Main Content Area */}
          <div className="glass-card" style={{ padding: '30px' }}>
            {activeTab === 'bookings' && (
              <div>
                <h3 style={{ color: '#e5e2e1', fontSize: '24px', marginBottom: '20px' }}>Reservation History</h3>
                {bookings.length === 0 ? (
                  <p style={{ color: '#d0c5af' }}>No reservations found.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {bookings.map(b => (
                      <div key={b._id} style={{ backgroundColor: '#1c1b1b', border: '1px solid rgba(77, 70, 53, 0.3)', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                        <div>
                          <h4 style={{ color: '#f2ca50', fontSize: '18px' }}>{b.serviceId?.name || 'Service'}</h4>
                          <p style={{ color: '#d0c5af', fontSize: '13px' }}>Stylist: {b.staffId?.userId?.name || 'Assigned Stylist'}</p>
                          <p style={{ color: '#d0c5af', fontSize: '13px' }}>Date: {new Date(b.date).toLocaleDateString()} at {b.timeSlot}</p>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            marginBottom: '10px',
                            backgroundColor: b.status === 'confirmed' ? 'rgba(242,202,80,0.2)' : b.status === 'completed' ? 'rgba(100,200,100,0.2)' : 'rgba(255,100,100,0.2)',
                            color: b.status === 'confirmed' ? '#f2ca50' : b.status === 'completed' ? '#a0ffa0' : '#ffa0a0'
                          }}>
                            {b.status}
                          </span>
                          {b.status === 'confirmed' && (
                            <div>
                              <button
                                onClick={() => handleCancelBooking(b._id)}
                                style={{ background: 'transparent', border: '1px solid #ffb4ab', color: '#ffb4ab', padding: '6px 12px', fontSize: '11px', cursor: 'pointer' }}
                              >
                                Cancel Session
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h3 style={{ color: '#e5e2e1', fontSize: '24px', marginBottom: '20px' }}>Saved Wishlist Services</h3>
                {wishlist.length === 0 ? (
                  <p style={{ color: '#d0c5af' }}>Your wishlist is empty.</p>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    {wishlist.map(s => (
                      <div key={s._id} style={{ backgroundColor: '#1c1b1b', border: '1px solid rgba(242, 202, 80, 0.2)', padding: '20px' }}>
                        <h4 style={{ color: '#f2ca50', fontSize: '18px' }}>{s.name}</h4>
                        <p style={{ color: '#d0c5af', fontSize: '13px' }}>Category: {s.category}</p>
                        <p style={{ color: '#e5e2e1', fontWeight: 'bold', margin: '10px 0' }}>${s.price}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'loyalty' && (
              <div>
                <h3 style={{ color: '#e5e2e1', fontSize: '24px', marginBottom: '16px' }}>Loyalty Points Balance</h3>
                <p style={{ color: '#d0c5af', fontSize: '15px', marginBottom: '24px' }}>
                  Earn 10% of every completed grooming session as loyalty points. Redeem 100 points for $10 off your next session.
                </p>
                <div style={{ backgroundColor: '#1c1b1b', padding: '30px', border: '1px solid #f2ca50', textAlign: 'center', maxWidth: '300px' }}>
                  <span style={{ fontSize: '48px', color: '#f2ca50', fontFamily: "'Playfair Display', serif", fontWeight: 'bold' }}>
                    {user?.loyaltyPoints || 0}
                  </span>
                  <p style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Available Points</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
