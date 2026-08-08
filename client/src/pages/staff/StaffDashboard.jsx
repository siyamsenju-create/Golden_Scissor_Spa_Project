import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('today');
  const [bookings, setBookings] = useState([]);
  const [staffProfile, setStaffProfile] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [savingAvailability, setSavingAvailability] = useState(false);
  const [msg, setMsg] = useState('');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    // Fetch current user + assigned bookings
    axios.get('http://localhost:5001/api/auth/me', { withCredentials: true })
      .then(res => setStaffProfile(res.data.data))
      .catch(() => {
        setStaffProfile({
          name: 'Julian V.',
          email: 'julian@goldenscissorspa.com',
          role: 'staff'
        });
      });

    axios.get('http://localhost:5001/api/bookings', { withCredentials: true })
      .then(res => setBookings(res.data.data))
      .catch(() => {
        const today = new Date().toISOString().split('T')[0];
        setBookings([
          {
            _id: '1',
            customerId: { name: 'James Sterling', phone: '+1 (555) 999-8888' },
            serviceId: { name: 'Master Cut', duration: 60 },
            date: today,
            timeSlot: '11:30 AM',
            totalAmount: 85,
            status: 'confirmed'
          },
          {
            _id: '2',
            customerId: { name: 'Robert C.', phone: '+1 (555) 777-5555' },
            serviceId: { name: 'Beard Sculpt', duration: 30 },
            date: today,
            timeSlot: '02:30 PM',
            totalAmount: 45,
            status: 'pending'
          }
        ]);
        setAvailability(
          daysOfWeek.map(day => ({
            day,
            startTime: '09:00',
            endTime: '19:00',
            isOff: day === 'Sunday'
          }))
        );
      });
  }, []);

  const handleStatusUpdate = (id, newStatus) => {
    axios.put(`http://localhost:5001/api/bookings/${id}/status`, { status: newStatus }, { withCredentials: true })
      .then(() => {
        setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
        setMsg(`Booking status updated to "${newStatus}".`);
      })
      .catch(() => {
        // Demo fallback
        setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
        setMsg(`Status updated to "${newStatus}".`);
      });
  };

  const handleAvailabilityChange = (index, field, value) => {
    setAvailability(prev =>
      prev.map((item, i) => i === index ? { ...item, [field]: value } : item)
    );
  };

  const saveAvailability = () => {
    setSavingAvailability(true);
    axios.put('http://localhost:5001/api/staff/availability/me', { availability }, { withCredentials: true })
      .then(() => {
        setMsg('Your availability schedule has been updated.');
        setSavingAvailability(false);
      })
      .catch(() => {
        setMsg('Availability saved (demo mode).');
        setSavingAvailability(false);
      });
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter(b => {
    const bookingDate = new Date(b.date).toISOString().split('T')[0];
    return bookingDate === todayStr;
  });

  const handleLogout = () => {
    axios.post('http://localhost:5001/api/auth/logout', {}, { withCredentials: true })
      .finally(() => navigate('/login'));
  };

  const statusColor = (status) => {
    if (status === 'confirmed') return { bg: 'rgba(242,202,80,0.15)', color: '#f2ca50' };
    if (status === 'completed') return { bg: 'rgba(100,200,100,0.15)', color: '#a0ffa0' };
    if (status === 'cancelled') return { bg: 'rgba(255,100,100,0.15)', color: '#ffa0a0' };
    return { bg: 'rgba(180,180,180,0.15)', color: '#d0c5af' };
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="max-container">
        {/* Header */}
        <div
          className="glass-card"
          style={{
            padding: '28px 36px',
            marginBottom: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div>
            <span style={{ color: '#f2ca50', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '6px' }}>
              Staff Portal
            </span>
            <h1 style={{ fontSize: '30px', color: '#e5e2e1', fontFamily: "'Playfair Display', serif" }}>
              Welcome, {staffProfile?.name || 'Artisan'}
            </h1>
            <p style={{ color: '#d0c5af', fontSize: '13px' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div className="glass-card" style={{ padding: '12px 20px', textAlign: 'center' }}>
              <span style={{ color: '#f2ca50', fontSize: '24px', fontWeight: 'bold', display: 'block' }}>
                {todayBookings.length}
              </span>
              <span style={{ color: '#d0c5af', fontSize: '10px', textTransform: 'uppercase' }}>Today's Appointments</span>
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: '1px solid rgba(77,70,53,0.5)',
                color: '#d0c5af',
                padding: '10px 18px',
                cursor: 'pointer',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Feedback Message */}
        {msg && (
          <div
            style={{
              background: 'rgba(242,202,80,0.08)',
              border: '1px solid #f2ca50',
              color: '#f2ca50',
              padding: '12px 20px',
              marginBottom: '24px',
              fontSize: '14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>{msg}</span>
            <button onClick={() => setMsg('')} style={{ background: 'none', border: 'none', color: '#f2ca50', cursor: 'pointer', fontSize: '18px' }}>×</button>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '28px' }}>
          {/* Sidebar Nav */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px', alignSelf: 'start' }}>
            {[
              { key: 'today', label: "Today's Schedule", icon: 'today' },
              { key: 'all', label: 'All Reservations', icon: 'event_note' },
              { key: 'availability', label: 'My Availability', icon: 'schedule' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  background: activeTab === tab.key ? 'rgba(242,202,80,0.12)' : 'transparent',
                  color: activeTab === tab.key ? '#f2ca50' : '#d0c5af',
                  border: 'none',
                  borderLeft: activeTab === tab.key ? '3px solid #f2ca50' : '3px solid transparent',
                  cursor: 'pointer',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Panel */}
          <div>
            {/* Today's Schedule */}
            {activeTab === 'today' && (
              <div className="glass-card" style={{ padding: '30px' }}>
                <h2 style={{ fontSize: '24px', color: '#e5e2e1', marginBottom: '24px' }}>
                  Today's Appointments
                </h2>

                {todayBookings.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#4d4635', display: 'block', marginBottom: '16px' }}>
                      event_available
                    </span>
                    <p style={{ color: '#d0c5af' }}>No appointments scheduled for today. Enjoy the serenity.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {todayBookings.map(b => {
                      const sc = statusColor(b.status);
                      return (
                        <div
                          key={b._id}
                          style={{
                            backgroundColor: '#1c1b1b',
                            border: '1px solid rgba(77,70,53,0.3)',
                            padding: '20px 24px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '16px'
                          }}
                        >
                          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <div
                              style={{
                                background: 'rgba(242,202,80,0.1)',
                                border: '1px solid rgba(242,202,80,0.3)',
                                padding: '12px 16px',
                                textAlign: 'center',
                                minWidth: '80px'
                              }}
                            >
                              <span style={{ color: '#f2ca50', fontSize: '18px', fontWeight: 'bold', display: 'block' }}>{b.timeSlot}</span>
                              <span style={{ color: '#d0c5af', fontSize: '11px', textTransform: 'uppercase' }}>Time</span>
                            </div>
                            <div>
                              <h3 style={{ color: '#f2ca50', fontSize: '18px', marginBottom: '4px' }}>{b.serviceId?.name}</h3>
                              <p style={{ color: '#e5e2e1', fontSize: '14px', marginBottom: '2px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '4px' }}>person</span>
                                {b.customerName || b.customerId?.name || 'Guest'}
                              </p>
                              <p style={{ color: '#d0c5af', fontSize: '13px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '13px', verticalAlign: 'middle', marginRight: '4px' }}>call</span>
                                {b.customerPhone || b.customerId?.phone || 'No phone'}
                              </p>
                              <p style={{ color: '#d0c5af', fontSize: '12px', marginTop: '4px' }}>
                                Duration: {b.serviceId?.duration} min · ${b.totalAmount}
                              </p>
                            </div>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                            <span
                              style={{
                                padding: '4px 12px',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                backgroundColor: sc.bg,
                                color: sc.color,
                                letterSpacing: '1px'
                              }}
                            >
                              {b.status}
                            </span>
                            {(b.status === 'pending' || b.status === 'confirmed') && (
                              <div style={{ display: 'flex', gap: '8px' }}>
                                {b.status === 'pending' && (
                                  <button
                                    onClick={() => handleStatusUpdate(b._id, 'confirmed')}
                                    style={{
                                      background: '#f2ca50',
                                      color: '#3c2f00',
                                      border: 'none',
                                      padding: '6px 14px',
                                      fontSize: '11px',
                                      fontWeight: 'bold',
                                      cursor: 'pointer',
                                      textTransform: 'uppercase'
                                    }}
                                  >
                                    Confirm
                                  </button>
                                )}
                                <button
                                  onClick={() => handleStatusUpdate(b._id, 'completed')}
                                  style={{
                                    background: 'transparent',
                                    color: '#a0ffa0',
                                    border: '1px solid #a0ffa0',
                                    padding: '6px 14px',
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase'
                                  }}
                                >
                                  Mark Done
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* All Reservations */}
            {activeTab === 'all' && (
              <div className="glass-card" style={{ padding: '30px', overflowX: 'auto' }}>
                <h2 style={{ fontSize: '24px', color: '#e5e2e1', marginBottom: '24px' }}>All Assigned Reservations</h2>
                {bookings.length === 0 ? (
                  <p style={{ color: '#d0c5af' }}>No reservations found.</p>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #4d4635', color: '#f2ca50', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Client</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Service</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Time</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(b => {
                        const sc = statusColor(b.status);
                        return (
                          <tr key={b._id} style={{ borderBottom: '1px solid rgba(77,70,53,0.2)' }}>
                            <td style={{ padding: '12px', color: '#e5e2e1', fontSize: '14px' }}>{b.customerName || b.customerId?.name || 'Guest'}</td>
                            <td style={{ padding: '12px', color: '#d0c5af', fontSize: '14px' }}>{b.serviceId?.name}</td>
                            <td style={{ padding: '12px', color: '#d0c5af', fontSize: '13px' }}>
                              {new Date(b.date).toLocaleDateString()}
                            </td>
                            <td style={{ padding: '12px', color: '#d0c5af', fontSize: '13px' }}>{b.timeSlot}</td>
                            <td style={{ padding: '12px' }}>
                              <span style={{ padding: '3px 10px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', backgroundColor: sc.bg, color: sc.color }}>
                                {b.status}
                              </span>
                            </td>
                            <td style={{ padding: '12px' }}>
                              {(b.status === 'pending' || b.status === 'confirmed') && (
                                <button
                                  onClick={() => handleStatusUpdate(b._id, 'completed')}
                                  style={{
                                    background: 'transparent',
                                    color: '#f2ca50',
                                    border: '1px solid #f2ca50',
                                    padding: '4px 10px',
                                    fontSize: '11px',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Complete
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* Availability Schedule */}
            {activeTab === 'availability' && (
              <div className="glass-card" style={{ padding: '30px' }}>
                <h2 style={{ fontSize: '24px', color: '#e5e2e1', marginBottom: '8px' }}>Working Availability</h2>
                <p style={{ color: '#d0c5af', fontSize: '14px', marginBottom: '28px' }}>
                  Configure your weekly schedule. Clients can only book you during active hours.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(availability.length > 0 ? availability : daysOfWeek.map(day => ({ day, startTime: '09:00', endTime: '19:00', isOff: day === 'Sunday' }))).map((av, idx) => (
                    <div
                      key={av.day}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '120px 1fr 1fr 120px',
                        gap: '16px',
                        alignItems: 'center',
                        padding: '14px 20px',
                        backgroundColor: av.isOff ? 'rgba(255,100,100,0.05)' : 'rgba(242,202,80,0.04)',
                        border: '1px solid rgba(77,70,53,0.3)'
                      }}
                    >
                      <span style={{ color: av.isOff ? '#4d4635' : '#e5e2e1', fontWeight: '600', fontSize: '14px' }}>
                        {av.day}
                      </span>
                      <div>
                        <label style={{ color: '#d0c5af', fontSize: '11px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Start</label>
                        <input
                          type="time"
                          value={av.startTime}
                          disabled={av.isOff}
                          onChange={(e) => handleAvailabilityChange(idx, 'startTime', e.target.value)}
                          style={{
                            background: '#1c1b1b',
                            border: '1px solid #4d4635',
                            color: av.isOff ? '#4d4635' : '#e5e2e1',
                            padding: '8px',
                            width: '100%',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ color: '#d0c5af', fontSize: '11px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>End</label>
                        <input
                          type="time"
                          value={av.endTime}
                          disabled={av.isOff}
                          onChange={(e) => handleAvailabilityChange(idx, 'endTime', e.target.value)}
                          style={{
                            background: '#1c1b1b',
                            border: '1px solid #4d4635',
                            color: av.isOff ? '#4d4635' : '#e5e2e1',
                            padding: '8px',
                            width: '100%',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                          type="checkbox"
                          id={`off-${av.day}`}
                          checked={av.isOff}
                          onChange={(e) => handleAvailabilityChange(idx, 'isOff', e.target.checked)}
                          style={{ accentColor: '#f2ca50', width: '16px', height: '16px' }}
                        />
                        <label htmlFor={`off-${av.day}`} style={{ color: '#d0c5af', fontSize: '12px', cursor: 'pointer' }}>Day Off</label>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={saveAvailability}
                  disabled={savingAvailability}
                  className="gold-shine"
                  style={{
                    marginTop: '28px',
                    background: '#f2ca50',
                    color: '#3c2f00',
                    border: 'none',
                    padding: '14px 36px',
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    cursor: 'pointer'
                  }}
                >
                  {savingAvailability ? 'Saving...' : 'Save Schedule'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
