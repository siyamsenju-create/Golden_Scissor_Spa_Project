import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    axios.get('http://localhost:5000/api/services')
      .then(res => setServices(res.data.data))
      .catch(() => {
        setServices([
          { _id: '1', name: 'Haircuts', category: 'Signature', duration: 45, price: 50, description: 'Masterfully tailored cuts that complement your face shape and lifestyle.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL8jBZceg1Ou5QcAxYoLyqVhrGs7FcwP4GUKZhi2mjSSdwILTfepeX03XQjLMx8TRC8fcQnqGeR-zDihvMLJJQ5FDBmZoPtBSBJT7MhiXb3T4aDJHgUHQ5M6v839anMKh6-YfoFkYkdCW__UhMdWg1_ermHbQwV5ltYwneiJ1GV8Gzthkyt4YBCSAI0s8HM_fb8nkosDsJtCB72H7ZfU81GmEvByIdq2O9eobfH2pME0xp0LFsnuIUARYEvwRUz-hGo64fJhWGNQK7' },
          { _id: '2', name: 'Beard Styling', category: 'Artisan', duration: 30, price: 40, description: 'Expert shaping and grooming with straight razor detailing and hot towel treatment.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXS19LeUBVct7crXcRQRBWPmR-YE5O07B_IxfgsnrhQmZfhDHxttBQRBlaZocPV9VwqDXAEPtK-p4x5iZXa60NV1g-YJ1fDiJfAy2ntRwWixdYKgS82nS0J3Hd7poJm7hbXC0cmunHN45daAOqYhz1nH03j90c251TpH6xTFAnXmj5tPURWM7jxC3Qlh19_7DnsChd4fHqSHxd0AdWVDzBDRsu3FE8OHfw0UaLLuwT9kzhmpu5O9DlfDN2UHU5oX1f_2nktiq4lkad' },
          { _id: '3', name: 'Facial Treatments', category: 'Rejuvenation', duration: 60, price: 85, description: 'Deep cleansing and hydration using gold-infused serums to restore vitality.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByIQ7ixTmp68_I0l21GgD8kAJiLACRRIdcHl-sL1Q7QOQd6qm_t5Lx9ragTuRwDkD_AD7u9FP-ZC7mjdA0RebUyi40hDrdbPTbBM0QWw7aehnMOsEfoTJFMfBF5GGMMEWkEg54L8YC2RSKIS_Fiv2Xtfz8ZCmL1O91NWewMznhqTgdbII2mrenrYkBYa9KPvOwVErNKzx0PIs0ZaR1yE_JxinbILj1WSvxfvveF5msMsMj2F1Vj2RlHgTqY29lnxyDPtq5ZxC3ozoH' },
          { _id: '4', name: 'D-Tan', category: 'Therapy', duration: 40, price: 60, description: 'Advanced skin brightening treatment to remove environmental dullness.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKDbRomZ7uAHzUJSMemx-vr9BfVYvBtofmT1SO5WR417r1ucZnI8zeicwmuE5MjEzLOHnyrYmVspMWxOtDgvthuPcshXcrV8bD02YVhk6Dg31FqbuAUAE2jhRMRbaPtlVPQWPk4NHdX1ogMJe2QXQ_9nzvXJSsdzfGXtRoGKmyQmBlEMHRtqgp488AVEe9NmnuaQIupW_zvtCleZB2XghFNMyHVvcnF1mSmqEPNwFB5G3OICewlRTM82QzV1S7eVZpHpfo1y-8azPQ' },
          { _id: '5', name: 'Head Massage', category: 'Wellness', duration: 20, price: 35, description: 'The ultimate sanctuary experience. Scalp stimulation using essential oils.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRZInkUMfj6ivmk8e7iz63nXlAWOtd0Q-cWUtJ8i1tiIpqurJwFxdXyprm2JqTU9HdkbW-omwlAt7tpxKXL9UDPQb-mpmE_kgLue8PCYzt-Wx-Ia3PL2Luwyc4EOGNPMz8FyHxoPWQ4QKO5fODZGRBVAvSKp4wxjNVPcfOpOhs9LbhJPZi9ia-wzr6F9prhYgE3i0QJLKARbW351u9uU_WSSEOM_BD-b7R4Sw_w18CxFXVD9NAZ1ydMgUq-nmHVcJy8Q8d48e2chbP' },
          { _id: '6', name: 'Hair Smoothening', category: 'Lustre', duration: 90, price: 120, description: 'Professional keratin-infused treatment to tame frizz and add mirror-like shine.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkDqTNckxvpy3MCev0zPxiH3nS4YYGpE6EF8L2V2NCvrwD_3E-xBAwbKEkljX3oeOVTWuYcnY0SfORgEkJXrTTQr3pHaAlHawLR7hFqi00dpFcxz3s3VvjNYRQKa4Y_o7FVVxNhhjvSvl-7WwCfVNyfeNZjoUKCfVtevTOk_SbG8m_MwvVd4npOlJvmRiSy2e8IVQLRQygf5LW70O9FBzw8YoERGZ-StNeqPJnXA_020vkBsT_PXYxEO20mDZBXaIOItZ3FQ7SwhAK' }
        ]);
      });
  }, []);

  const categories = ['All', 'Signature', 'Artisan', 'Rejuvenation', 'Therapy', 'Wellness', 'Lustre'];

  const filteredServices = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      {/* Header */}
      <div className="max-container" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ color: '#f2ca50', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '12px' }}>
          Our Experiences
        </span>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '52px', color: '#e5e2e1', marginBottom: '16px' }}>
          Precision &amp; Luxury
        </h1>
        <p style={{ color: '#d0c5af', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Refining the modern gentleman through centuries of heritage and contemporary mastery.
        </p>

        {/* Categories Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginTop: '40px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? '#f2ca50' : 'transparent',
                color: activeCategory === cat ? '#3c2f00' : '#d0c5af',
                border: '1px solid rgba(242, 202, 80, 0.3)',
                padding: '8px 20px',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {filteredServices.map(service => (
            <div key={service._id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '100%', height: '240px', overflow: 'hidden', marginBottom: '20px', position: 'relative' }}>
                  <img
                    alt={service.name}
                    src={service.image}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(19, 19, 19, 0.8)',
                      border: '1px solid #f2ca50',
                      color: '#f2ca50',
                      fontSize: '11px',
                      padding: '4px 10px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                  >
                    {service.category}
                  </span>
                </div>

                <h3 style={{ fontSize: '26px', color: '#e5e2e1', marginBottom: '10px' }}>{service.name}</h3>
                <p style={{ color: '#d0c5af', fontSize: '14px', marginBottom: '20px', lineHeight: '1.6' }}>
                  {service.description}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderTop: '1px solid rgba(77, 70, 53, 0.3)', paddingTop: '16px' }}>
                  <span style={{ color: '#d0c5af', fontSize: '13px' }}>⏱ {service.duration} mins</span>
                  <span style={{ color: '#f2ca50', fontSize: '22px', fontFamily: "'Playfair Display', serif", fontWeight: 'bold' }}>${service.price}</span>
                </div>
                <Link to="/booking">
                  <button
                    className="gold-shine"
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: '1px solid #f2ca50',
                      color: '#f2ca50',
                      padding: '12px',
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      cursor: 'pointer'
                    }}
                  >
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
