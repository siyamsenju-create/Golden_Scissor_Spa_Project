import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    // Fetch services from API fallback to defaults
    axios.get('http://localhost:5001/api/services')
      .then(res => setServices(res.data.data))
      .catch(() => {
        setServices([
          { _id: '1', name: 'Haircut', price: 50, description: 'Bespoke cutting and styling tailored to your face shape and personal lifestyle.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL8jBZceg1Ou5QcAxYoLyqVhrGs7FcwP4GUKZhi2mjSSdwILTfepeX03XQjLMx8TRC8fcQnqGeR-zDihvMLJJQ5FDBmZoPtBSBJT7MhiXb3T4aDJHgUHQ5M6v839anMKh6-YfoFkYkdCW__UhMdWg1_ermHbQwV5ltYwneiJ1GV8Gzthkyt4YBCSAI0s8HM_fb8nkosDsJtCB72H7ZfU81GmEvByIdq2O9eobfH2pME0xp0LFsnuIUARYEvwRUz-hGo64fJhWGNQK7' },
          { _id: '2', name: 'Beard Styling', price: 40, description: 'Sculpting, hot towel treatment, and premium oils for a perfectly maintained beard.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXS19LeUBVct7crXcRQRBWPmR-YE5O07B_IxfgsnrhQmZfhDHxttBQRBlaZocPV9VwqDXAEPtK-p4x5iZXa60NV1g-YJ1fDiJfAy2ntRwWixdYKgS82nS0J3Hd7poJm7hbXC0cmunHN45daAOqYhz1nH03j90c251TpH6xTFAnXmj5tPURWM7jxC3Qlh19_7DnsChd4fHqSHxd0AdWVDzBDRsu3FE8OHfw0UaLLuwT9kzhmpu5O9DlfDN2UHU5oX1f_2nktiq4lkad' },
          { _id: '3', name: 'Facial Treatments', price: 85, description: 'Revitalizing skin therapy using organic compounds for a refreshed, youthful appearance.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByIQ7ixTmp68_I0l21GgD8kAJiLACRRIdcHl-sL1Q7QOQd6qm_t5Lx9ragTuRwDkD_AD7u9FP-ZC7mjdA0RebUyi40hDrdbPTbBM0QWw7aehnMOsEfoTJFMfBF5GGMMEWkEg54L8YC2RSKIS_Fiv2Xtfz8ZCmL1O91NWewMznhqTgdbII2mrenrYkBYa9KPvOwVErNKzx0PIs0ZaR1yE_JxinbILj1WSvxfvveF5msMsMj2F1Vj2RlHgTqY29lnxyDPtq5ZxC3ozoH' }
        ]);
      });

    axios.get('http://localhost:5001/api/gallery')
      .then(res => setGallery(res.data.data))
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <header
        id="hero"
        style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0k3i1YxaToL5NmqJYEHSXH7rbybAd1LSKlTxEObJk-OQne_BeVv8YpWQ06hwP-beCwxrVpWuGkGy6JBlTac2jFVHkAJMdpTCA109tO8Hwk_-a4an0f2kmD0rqeXyJyXLJsJo6SKxHjBKH0GWGNJqM-BA-TnaOBHRUL1iBVV7gWzVRMRCwKlbEyafS3fDUs5UwIuQFqEO9jGnzouy4RVDdyNZtajExyFsSDsAqixZS1F5cWirBS26x0oeMX5EW7hRo-Fy-CvB6jfjS')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)',
            transform: 'scale(1.05)'
          }}
        />
        <div style={{ position: 'relative', zIndex: 20, textAlign: 'center', maxWidth: '800px', padding: '0 20px' }}>
          <img
            alt="Center Brand Logo"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR-qyn9obwzzGyWIhFAOYnT6WMED3nyIsfwct7jssC3GgtXiR0mryui0neDjNN_e2AX1Otof76gNPDcEdzHzhWWN1hmvM5IGNVKvA_uMFtJPrU7w7dr8TLtOSgV_lQmORkpOhbFbfBqSags_lkpnry4roctunlyTSKpslJg8nhzK7I-9z0lXpHHQvL-fmn-vTuLOs1vP3y5HpiimdYdJ3kf-oMk-yTthQPbbhz2aWRvczaoJPs7yNImK9C8nK4GMK-OhQY3gCNkTBQ"
            style={{ width: '120px', height: '120px', margin: '0 auto 30px auto' }}
            className="animate-fade-in-up"
          />
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '56px',
              color: '#f2ca50',
              lineHeight: '1.1',
              marginBottom: '20px'
            }}
          >
            Premium Grooming.<br />Timeless Style.
          </h1>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '18px',
              color: 'rgba(229, 226, 225, 0.8)',
              marginBottom: '40px'
            }}
          >
            Experience professional haircuts and luxury grooming crafted for modern gentlemen in an environment of absolute distinction.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/booking">
              <button
                className="gold-shine"
                style={{
                  background: '#f2ca50',
                  color: '#3c2f00',
                  padding: '16px 36px',
                  border: 'none',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  cursor: 'pointer'
                }}
              >
                Book Appointment
              </button>
            </Link>
            <Link to="/services">
              <button
                style={{
                  border: '1px solid #f2ca50',
                  background: 'transparent',
                  color: '#f2ca50',
                  padding: '16px 36px',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  cursor: 'pointer'
                }}
              >
                View Services
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section style={{ padding: '120px 0' }}>
        <div
          className="max-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px',
            alignItems: 'center'
          }}
        >
          <div style={{ position: 'relative' }}>
            <div className="glass-card" style={{ padding: '10px' }}>
              <img
                alt="Sanctuary Interior"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0k3i1YxaToL5NmqJYEHSXH7rbybAd1LSKlTxEObJk-OQne_BeVv8YpWQ06hwP-beCwxrVpWuGkGy6JBlTac2jFVHkAJMdpTCA109tO8Hwk_-a4an0f2kmD0rqeXyJyXLJsJo6SKxHjBKH0GWGNJqM-BA-TnaOBHRUL1iBVV7gWzVRMRCwKlbEyafS3fDUs5UwIuQFqEO9jGnzouy4RVDdyNZtajExyFsSDsAqixZS1F5cWirBS26x0oeMX5EW7hRo-Fy-CvB6jfjS"
                style={{ width: '100%', height: '480px', objectFit: 'cover' }}
              />
            </div>
            <div
              className="glass-card"
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                padding: '24px',
                borderLeft: '4px solid #f2ca50'
              }}
            >
              <span style={{ color: '#f2ca50', fontSize: '32px', fontFamily: "'Playfair Display', serif", display: 'block' }}>
                Est. 2025
              </span>
              <span style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Legacy of Excellence
              </span>
            </div>
          </div>

          <div>
            <span style={{ color: '#f2ca50', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '12px' }}>
              The Sanctuary of Grooming
            </span>
            <h2 style={{ fontSize: '38px', color: '#e5e2e1', marginBottom: '24px', lineHeight: '1.2' }}>
              Where Tradition Meets Modern Precision
            </h2>
            <p style={{ color: '#d0c5af', fontSize: '16px', lineHeight: '1.7', marginBottom: '32px' }}>
              Golden Scissor Spa was founded on the belief that a haircut is not just a service, but a ceremony. Our master stylists blend centuries-old barbering techniques with contemporary aesthetics to provide an unparalleled grooming experience.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              <div>
                <div style={{ color: '#f2ca50', fontSize: '36px', fontFamily: "'Playfair Display', serif" }}>500+</div>
                <div style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase' }}>Premium Clients</div>
              </div>
              <div>
                <div style={{ color: '#f2ca50', fontSize: '36px', fontFamily: "'Playfair Display', serif" }}>10+</div>
                <div style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase' }}>Years Experience</div>
              </div>
              <div>
                <div style={{ color: '#f2ca50', fontSize: '36px', fontFamily: "'Playfair Display', serif" }}>12+</div>
                <div style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase' }}>Master Stylists</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section style={{ padding: '120px 0', backgroundColor: 'rgba(14, 14, 14, 0.4)' }}>
        <div className="max-container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ color: '#f2ca50', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '12px' }}>
              Our Expertise
            </span>
            <h2 style={{ fontSize: '42px', color: '#e5e2e1' }}>The Collection</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {services.map((item) => (
              <div key={item._id} className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ width: '100%', height: '220px', overflow: 'hidden', marginBottom: '24px' }}>
                    <img
                      alt={item.name}
                      src={item.image}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    />
                  </div>
                  <h3 style={{ fontSize: '24px', color: '#f2ca50', marginBottom: '12px' }}>{item.name}</h3>
                  <p style={{ color: '#d0c5af', fontSize: '14px', marginBottom: '24px' }}>{item.description}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(77, 70, 53, 0.3)', paddingTop: '16px' }}>
                  <span style={{ color: '#f2ca50', fontWeight: 'bold' }}>Starts at ${item.price}</span>
                  <Link to="/booking" style={{ color: '#f2ca50', display: 'flex', alignItems: 'center' }}>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concierge Reservation Banner */}
      <section style={{ padding: '100px 0' }}>
        <div className="max-container">
          <div className="glass-card" style={{ padding: '60px', textAlign: 'center', border: '1px solid rgba(242, 202, 80, 0.3)' }}>
            <h2 style={{ fontSize: '36px', color: '#f2ca50', marginBottom: '16px' }}>The Golden Standard Awaits</h2>
            <p style={{ color: '#d0c5af', fontSize: '16px', maxWidth: '600px', margin: '0 auto 30px auto' }}>
              Experience grooming as it was meant to be: unhurried, precise, and purely exceptional. Reserve your private appointment today.
            </p>
            <Link to="/booking">
              <button
                className="gold-shine"
                style={{
                  background: '#f2ca50',
                  color: '#3c2f00',
                  padding: '16px 40px',
                  border: 'none',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '13px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  cursor: 'pointer'
                }}
              >
                Reserve Your Session
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
