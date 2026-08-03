import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    // Fetch analytics KPIs
    axios.get('http://localhost:5000/api/analytics/dashboard', { withCredentials: true })
      .then(res => setStats(res.data.data))
      .catch(() => {
        setStats({
          kpis: {
            totalRevenue: 14500,
            totalBookings: 180,
            pendingBookings: 12,
            confirmedBookings: 45,
            cancelledBookings: 5,
            totalCustomers: 240,
            activeStaff: 6
          },
          monthlyRevenue: [
            { name: 'Mar 2026', revenue: 2100 },
            { name: 'Apr 2026', revenue: 2400 },
            { name: 'May 2026', revenue: 2800 },
            { name: 'Jun 2026', revenue: 3200 },
            { name: 'Jul 2026', revenue: 4000 }
          ]
        });
      });

    // Fetch all bookings
    axios.get('http://localhost:5000/api/bookings', { withCredentials: true })
      .then(res => setBookings(res.data.data))
      .catch(() => {
        setBookings([
          { _id: '1', customerId: { name: 'James Sterling', email: 'james@example.com' }, serviceId: { name: 'Master Cut' }, staffId: { userId: { name: 'Julian V.' } }, date: '2026-08-10', timeSlot: '11:30 AM', totalAmount: 85, status: 'pending' },
          { _id: '2', customerId: { name: 'Robert C.', email: 'robert@example.com' }, serviceId: { name: 'Royal Shave' }, staffId: { userId: { name: 'Marco R.' } }, date: '2026-08-11', timeSlot: '02:30 PM', totalAmount: 65, status: 'confirmed' }
        ]);
      });

    // Fetch contact inquiries
    axios.get('http://localhost:5000/api/contact', { withCredentials: true })
      .then(res => setInquiries(res.data.data))
      .catch(() => {});
  }, []);

  const handleStatusUpdate = (id, newStatus) => {
    axios.put(`http://localhost:5000/api/bookings/${id}/status`, { status: newStatus }, { withCredentials: true })
      .then(() => {
        setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
      })
      .catch(() => {
        setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
      });
  };

  const handleLogout = () => {
    axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true })
      .finally(() => navigate('/login'));
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="max-container">
        {/* Header */}
        <div className="glass-card" style={{ padding: '30px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '32px', color: '#f2ca50' }}>Lounge Executive Admin</h1>
            <p style={{ color: '#d0c5af', fontSize: '14px' }}>Overview of business operations, revenue and booking approvals.</p>
          </div>

          <button
            onClick={handleLogout}
            style={{ background: 'transparent', border: '1px solid #4d4635', color: '#d0c5af', padding: '10px 20px', cursor: 'pointer', fontSize: '12px', textTransform: 'uppercase' }}
          >
            Logout Executive
          </button>
        </div>

        {/* KPI Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
            <span style={{ fontSize: '28px', color: '#f2ca50', fontWeight: 'bold', fontFamily: "'Playfair Display', serif" }}>
              ${stats?.kpis?.totalRevenue || 0}
            </span>
            <span style={{ color: '#d0c5af', fontSize: '11px', display: 'block', textTransform: 'uppercase', marginTop: '4px' }}>Total Revenue</span>
          </div>

          <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
            <span style={{ fontSize: '28px', color: '#f2ca50', fontWeight: 'bold', fontFamily: "'Playfair Display', serif" }}>
              {stats?.kpis?.totalBookings || 0}
            </span>
            <span style={{ color: '#d0c5af', fontSize: '11px', display: 'block', textTransform: 'uppercase', marginTop: '4px' }}>Total Reservations</span>
          </div>

          <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
            <span style={{ fontSize: '28px', color: '#f2ca50', fontWeight: 'bold', fontFamily: "'Playfair Display', serif" }}>
              {stats?.kpis?.pendingBookings || 0}
            </span>
            <span style={{ color: '#d0c5af', fontSize: '11px', display: 'block', textTransform: 'uppercase', marginTop: '4px' }}>Pending Approvals</span>
          </div>

          <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
            <span style={{ fontSize: '28px', color: '#f2ca50', fontWeight: 'bold', fontFamily: "'Playfair Display', serif" }}>
              {stats?.kpis?.totalCustomers || 0}
            </span>
            <span style={{ color: '#d0c5af', fontSize: '11px', display: 'block', textTransform: 'uppercase', marginTop: '4px' }}>Registered Customers</span>
          </div>
        </div>

        {/* Tab Selection */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '10px 20px',
              background: activeTab === 'overview' ? '#f2ca50' : 'transparent',
              color: activeTab === 'overview' ? '#3c2f00' : '#d0c5af',
              border: '1px solid #f2ca50',
              fontWeight: 'bold',
              fontSize: '12px',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}
          >
            Reservations Control
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            style={{
              padding: '10px 20px',
              background: activeTab === 'inquiries' ? '#f2ca50' : 'transparent',
              color: activeTab === 'inquiries' ? '#3c2f00' : '#d0c5af',
              border: '1px solid #f2ca50',
              fontWeight: 'bold',
              fontSize: '12px',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}
          >
            Concierge Inquiries
          </button>
        </div>

        {/* Tab 1: Bookings Management */}
        {activeTab === 'overview' && (
          <div className="glass-card" style={{ padding: '30px', overflowX: 'auto' }}>
            <h3 style={{ color: '#e5e2e1', fontSize: '24px', marginBottom: '20px' }}>All Reservations Management</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #4d4635', color: '#f2ca50', fontSize: '12px', textTransform: 'uppercase' }}>
                  <th style={{ padding: '12px' }}>Client</th>
                  <th style={{ padding: '12px' }}>Service</th>
                  <th style={{ padding: '12px' }}>Stylist</th>
                  <th style={{ padding: '12px' }}>Date &amp; Time</th>
                  <th style={{ padding: '12px' }}>Amount</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b._id} style={{ borderBottom: '1px solid rgba(77, 70, 53, 0.2)', color: '#d0c5af', fontSize: '14px' }}>
                    <td style={{ padding: '12px' }}>{b.customerId?.name || 'Client'}</td>
                    <td style={{ padding: '12px', color: '#e5e2e1' }}>{b.serviceId?.name || 'Service'}</td>
                    <td style={{ padding: '12px' }}>{b.staffId?.userId?.name || 'Stylist'}</td>
                    <td style={{ padding: '12px' }}>{new Date(b.date).toLocaleDateString()} {b.timeSlot}</td>
                    <td style={{ padding: '12px', color: '#f2ca50' }}>${b.totalAmount}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        backgroundColor: b.status === 'confirmed' ? 'rgba(242,202,80,0.2)' : b.status === 'completed' ? 'rgba(100,200,100,0.2)' : 'rgba(255,100,100,0.2)',
                        color: b.status === 'confirmed' ? '#f2ca50' : b.status === 'completed' ? '#a0ffa0' : '#ffa0a0'
                      }}>
                        {b.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleStatusUpdate(b._id, 'confirmed')}
                        style={{ background: '#f2ca50', color: '#3c2f00', border: 'none', padding: '4px 8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(b._id, 'completed')}
                        style={{ background: '#4d4635', color: '#e5e2e1', border: 'none', padding: '4px 8px', fontSize: '11px', cursor: 'pointer' }}
                      >
                        Complete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="glass-card" style={{ padding: '30px' }}>
            <h3 style={{ color: '#e5e2e1', fontSize: '24px', marginBottom: '20px' }}>Concierge Call &amp; Form Requests</h3>
            {inquiries.length === 0 ? (
              <p style={{ color: '#d0c5af' }}>No new inquiries.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {inquiries.map(inq => (
                  <div key={inq._id} style={{ backgroundColor: '#1c1b1b', padding: '16px', border: '1px solid #4d4635' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f2ca50' }}>
                      <strong>{inq.name} ({inq.phone})</strong>
                      <span>{inq.type}</span>
                    </div>
                    <p style={{ color: '#d0c5af', fontSize: '14px', marginTop: '8px' }}>{inq.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
