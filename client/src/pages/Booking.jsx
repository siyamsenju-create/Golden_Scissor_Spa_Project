import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Booking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [services, setServices] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  // Form selections
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [contactData, setContactData] = useState({ name: '', email: '', phone: '', notes: '' });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5001/api/services')
      .then(res => setServices(res.data.data))
      .catch(() => {
        setServices([
          { _id: '1', name: 'Royal Shave', price: 65, duration: 45, description: 'The ultimate traditional straight-razor experience with hot towels and facial massage.' },
          { _id: '2', name: 'Master Cut', price: 85, duration: 60, description: 'Precision styling and cut by our senior artists, tailored to your facial structure.' },
          { _id: '3', name: 'Beard Sculpt', price: 45, duration: 30, description: 'Expert shaping, conditioning, and alignment using premium oils.' },
          { _id: '4', name: 'The Gentleman', price: 140, duration: 105, description: 'Our signature combo of a Master Cut and Royal Shave.' }
        ]);
      });

    axios.get('http://localhost:5001/api/staff')
      .then(res => setStaffList(res.data.data))
      .catch(() => {
        setStaffList([
          { _id: '1', userId: { name: 'Julian V.' }, specialties: ['Master Barber'], profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5vVt02nWdYnUx_li8M_pM5xodWY23wERkraX8N_SiOtjpgVTQuC232FGf4MKfXIFLWJ6fq4L7gZ5s58CWJPb6_Lg4V_K4kX6GgJAhF4Xk1TnHtqK4dSfFCStYgYkh7-UdEIKiXsHW5Xtj58FHjHUl7aIb-GDUo8Eee3GkQeG6sjoc7EE9_BVxIFhgHqZ4tl6faVkxTheE07Ew0XZSGAQahEhLoGUhztRj8r5gbXzk7JXla113Mfyc20twl4uEbcGuEDtI1pF-wfeg' },
          { _id: '2', userId: { name: 'Marco R.' }, specialties: ['Senior Stylist'], profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAirx_WQYIsluJ2xpOVI550I8o5m1LvTaLSBVzyhw3ZIc6lEA7etM5S8zDi9x6DKoZVSaNexey4wRlSfrVPWRDBETuyNY0erLrVP_Zb5YjVh4I-xNexza7KKYdT3CpfdSqFUB1X15o2oeblCLI6zKbU9jReElEPRg81adp-vYfLeTOOS-Y5F0qq1CzVtny-dmj22VfmsqcroosLqQ1EpRpoFOk8FW6RyWp6-m_7lXmlIVATkHgARazXnvuL0AnPqbTyzDNoZ3SxWJJP' },
          { _id: '3', userId: { name: 'Dominic T.' }, specialties: ['Executive Artisan'], profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASq3ddpkp0XE4ShpqY-qUl3rSshOXWoU9nC1aTgIyqDdDkZgkUMF9Vfj2jhbjdrK_LUtqIHSCzFPNEtUDH6RBTuH9NYErIvJnkD9zFrrY0ihm592GSU3Vm9mHtggRBARfnRCnDLJQZNnpi1ffJcLfXOdlq5STtiDfEalHkT6NS45NU-3tVTVVx8hrCCS6eNe-dJ936SiK_ydY4lh8zzQK06296hQYa_qaw6KNKtql1L8pdB7ArRDXcRthBCoqvYiTAwK69-6JlPXZS' }
        ]);
      });
  }, []);

  // Fetch slot options when date/stylist changes
  useEffect(() => {
    if (selectedStylist && selectedDate) {
      axios.get(`http://localhost:5001/api/bookings/slots?staffId=${selectedStylist._id}&date=${selectedDate}`)
        .then(res => setAvailableSlots(res.data.data))
        .catch(() => {
          setAvailableSlots([
            { slot: '09:00 AM', isAvailable: true },
            { slot: '10:30 AM', isAvailable: true },
            { slot: '11:30 AM', isAvailable: false },
            { slot: '01:00 PM', isAvailable: true },
            { slot: '02:30 PM', isAvailable: true },
            { slot: '04:00 PM', isAvailable: true }
          ]);
        });
    }
  }, [selectedStylist, selectedDate]);

  const stepLabels = [
    'Step 1: Service Selection',
    'Step 2: Stylist Selection',
    'Step 3: Date & Time Picker',
    'Step 4: Contact Details'
  ];

  const handleNext = () => {
    setErrorMsg('');
    if (currentStep === 1 && !selectedService) {
      return setErrorMsg('Please select an experience service before proceeding.');
    }
    if (currentStep === 2 && !selectedStylist) {
      return setErrorMsg('Please select a master stylist.');
    }
    if (currentStep === 3 && (!selectedDate || !selectedSlot)) {
      return setErrorMsg('Please select both a date and available time slot.');
    }
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setErrorMsg('');
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const payload = {
      serviceId: selectedService._id,
      staffId: selectedStylist._id,
      date: selectedDate,
      timeSlot: selectedSlot,
      notes: contactData.notes,
      customerName: contactData.name,
      customerPhone: contactData.phone,
      customerEmail: contactData.email
    };

    axios.post('http://localhost:5001/api/bookings', payload, { withCredentials: true })
      .then(res => {
        const { booking, whatsappSent } = res.data.data;
        const bookingId = booking._id;
        
        if (whatsappSent) {
          setSuccessMsg(
            `Booking Confirmed ✓\n\n` +
            `Your appointment has been successfully reserved.\n\n` +
            `Booking ID: ${bookingId}\n\n` +
            `A WhatsApp confirmation will be sent to:\n` +
            `${contactData.phone}\n\n` +
            `Thank you for choosing us.`
          );
        } else {
          setSuccessMsg(
            `Booking Confirmed ✓\n\n` +
            `Your appointment has been reserved successfully.\n\n` +
            `We could not send the WhatsApp confirmation right now.\n\n` +
            `Booking ID: ${bookingId}\n\n` +
            `Please note down this ID for your reference.`
          );
        }
        setTimeout(() => navigate('/'), 6000);
      })
      .catch(err => {
        setErrorMsg(err.response?.data?.message || 'Failed to complete your reservation. Please try again.');
      });
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="max-container" style={{ maxWidth: '900px' }}>
        <div className="glass-card" style={{ padding: '40px' }}>
          {/* Progress Indicator */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: '#f2ca50', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>
                {stepLabels[currentStep - 1]}
              </span>
              <span style={{ color: '#d0c5af', fontSize: '13px' }}>
                {currentStep} / {totalSteps}
              </span>
            </div>
            <div style={{ height: '2px', width: '100%', backgroundColor: 'rgba(77, 70, 53, 0.3)', position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  backgroundColor: '#f2ca50',
                  width: `${(currentStep / totalSteps) * 100}%`,
                  transition: 'width 0.4s ease'
                }}
              />
            </div>
          </div>

          {errorMsg && (
            <div style={{ backgroundColor: 'rgba(255, 180, 171, 0.1)', border: '1px solid #ffb4ab', color: '#ffb4ab', padding: '12px', marginBottom: '20px', fontSize: '14px', whiteSpace: 'pre-line' }}>
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div style={{ backgroundColor: 'rgba(242, 202, 80, 0.1)', border: '1px solid #f2ca50', color: '#f2ca50', padding: '16px', marginBottom: '20px', fontSize: '15px', textAlign: 'center', whiteSpace: 'pre-line', lineHeight: '1.6' }}>
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div>
                <h2 style={{ fontSize: '32px', color: '#f2ca50', marginBottom: '24px' }}>Select Your Experience</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', maxHeight: '420px', overflowY: 'auto', paddingRight: '8px' }}>
                  {services.map(srv => {
                    const isSelected = selectedService?._id === srv._id;
                    return (
                      <div
                        key={srv._id}
                        onClick={() => setSelectedService(srv)}
                        style={{
                          padding: '24px',
                          border: isSelected ? '1px solid #f2ca50' : '1px solid rgba(77, 70, 53, 0.3)',
                          backgroundColor: isSelected ? 'rgba(242, 202, 80, 0.08)' : 'transparent',
                          cursor: 'pointer',
                          borderRadius: '4px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <h3 style={{ fontSize: '20px', color: '#e5e2e1', marginBottom: '8px' }}>{srv.name}</h3>
                        <p style={{ color: '#d0c5af', fontSize: '13px', marginBottom: '16px' }}>{srv.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f2ca50', fontWeight: 'bold' }}>
                          <span>⏱ {srv.duration} min</span>
                          <span>${srv.price}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Stylist Selection */}
            {currentStep === 2 && (
              <div>
                <h2 style={{ fontSize: '32px', color: '#f2ca50', marginBottom: '24px' }}>Choose Your Artisan</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                  {staffList.map(st => {
                    const isSelected = selectedStylist?._id === st._id;
                    return (
                      <div
                        key={st._id}
                        onClick={() => setSelectedStylist(st)}
                        style={{
                          padding: '24px',
                          textAlign: 'center',
                          border: isSelected ? '1px solid #f2ca50' : '1px solid rgba(77, 70, 53, 0.3)',
                          backgroundColor: isSelected ? 'rgba(242, 202, 80, 0.08)' : 'transparent',
                          cursor: 'pointer',
                          borderRadius: '4px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px auto', border: '2px solid #f2ca50' }}>
                          <img alt={st.userId.name} src={st.profileImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <h3 style={{ fontSize: '18px', color: '#e5e2e1', marginBottom: '4px' }}>{st.userId.name}</h3>
                        <span style={{ color: '#f2ca50', fontSize: '12px', textTransform: 'uppercase' }}>
                          {st.specialties ? st.specialties.join(', ') : 'Master Stylist'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Date & Time Picker */}
            {currentStep === 3 && (
              <div>
                <h2 style={{ fontSize: '32px', color: '#f2ca50', marginBottom: '24px' }}>Select Date &amp; Time</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                  <div>
                    <label style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      style={{
                        width: '100%',
                        backgroundColor: '#1c1b1b',
                        border: '1px solid #4d4635',
                        color: '#e5e2e1',
                        padding: '12px',
                        fontSize: '16px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Available Slots
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                      {availableSlots.map((item, idx) => {
                        const isSelected = selectedSlot === item.slot;
                        return (
                          <button
                            type="button"
                            key={idx}
                            disabled={!item.isAvailable}
                            onClick={() => setSelectedSlot(item.slot)}
                            style={{
                              padding: '10px',
                              background: isSelected ? '#f2ca50' : item.isAvailable ? 'transparent' : '#1c1b1b',
                              color: isSelected ? '#3c2f00' : item.isAvailable ? '#e5e2e1' : '#4d4635',
                              border: isSelected ? '1px solid #f2ca50' : '1px solid rgba(77, 70, 53, 0.4)',
                              opacity: item.isAvailable ? 1 : 0.4,
                              cursor: item.isAvailable ? 'pointer' : 'not-allowed',
                              fontWeight: 'bold',
                              fontSize: '13px'
                            }}
                          >
                            {item.slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Contact Details */}
            {currentStep === 4 && (
              <div>
                <h2 style={{ fontSize: '32px', color: '#f2ca50', marginBottom: '24px' }}>Final Details</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Full Name</label>
                    <input
                      type="text"
                      placeholder="James Sterling"
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      required
                      style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #4d4635', color: '#e5e2e1', padding: '10px 0', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      required
                      style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #4d4635', color: '#e5e2e1', padding: '10px 0', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Email Address</label>
                    <input
                      type="email"
                      placeholder="james.s@luxury.com"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      required
                      style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #4d4635', color: '#e5e2e1', padding: '10px 0', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Special Requests (Optional)</label>
                    <textarea
                      rows="2"
                      placeholder="Mention any specific preferences..."
                      value={contactData.notes}
                      onChange={(e) => setContactData({ ...contactData, notes: e.target.value })}
                      style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #4d4635', color: '#e5e2e1', padding: '10px 0', outline: 'none', resize: 'none' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px' }}>
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  style={{ background: 'transparent', border: 'none', color: '#d0c5af', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold' }}
                >
                  <span className="material-symbols-outlined">arrow_back</span> Previous
                </button>
              ) : <div />}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="gold-shine"
                  style={{ background: '#f2ca50', color: '#3c2f00', border: 'none', padding: '12px 30px', cursor: 'pointer', textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  Next Step <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="gold-shine"
                  style={{ background: '#f2ca50', color: '#3c2f00', border: 'none', padding: '14px 40px', cursor: 'pointer', textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold' }}
                >
                  Confirm Reservation
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
