import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/api/gallery')
      .then(res => setItems(res.data.data))
      .catch(() => {
        setItems([
          { _id: '1', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0k3i1YxaToL5NmqJYEHSXH7rbybAd1LSKlTxEObJk-OQne_BeVv8YpWQ06hwP-beCwxrVpWuGkGy6JBlTac2jFVHkAJMdpTCA109tO8Hwk_-a4an0f2kmD0rqeXyJyXLJsJo6SKxHjBKH0GWGNJqM-BA-TnaOBHRUL1iBVV7gWzVRMRCwKlbEyafS3fDUs5UwIuQFqEO9jGnzouy4RVDdyNZtajExyFsSDsAqixZS1F5cWirBS26x0oeMX5EW7hRo-Fy-CvB6jfjS', category: 'Interior', caption: 'The Grand Lounge' },
          { _id: '2', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASq3ddpkp0XE4ShpqY-qUl3rSshOXWoU9nC1aTgIyqDdDkZgkUMF9Vfj2jhbjdrK_LUtqIHSCzFPNEtUDH6RBTuH9NYErIvJnkD9zFrrY0ihm592GSU3Vm9mHtggRBARfnRCnDLJQZNnpi1ffJcLfXOdlq5STtiDfEalHkT6NS45NU-3tVTVVx8hrCCS6eNe-dJ936SiK_ydY4lh8zzQK06296hQYa_qaw6KNKtql1L8pdB7ArRDXcRthBCoqvYiTAwK69-6JlPXZS', category: 'Haircuts', caption: 'Classic Executive Cut' },
          { _id: '3', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC4W0JFopP9AxKJyo8DnfU99FNPoc4hC-G8kYPlSOPzxt26A9CVeFe8xMNEIMjGLu8zbCIiLQCzTZS7xt-mNyJ4p9U9PsMkv8y6UY59iT-qkP3a5ZlznOtiPMGXpr3-ebfTTqDc4tuskQUKc9gx7N_AevRiSZ2RUeX_bvYAMW6j_6g77VFhaEyV2CF9i7sc3COdevb1_ujAH4P9__1twErBsP-hq9Cvi3qdu4RWa5_b-Q9WTXnfnDkiqF_C0QtUFjUVaoj3Qxd6BaY', category: 'Beard', caption: 'Artisan Beard Sculpting' },
          { _id: '4', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByIQ7ixTmp68_I0l21GgD8kAJiLACRRIdcHl-sL1Q7QOQd6qm_t5Lx9ragTuRwDkD_AD7u9FP-ZC7mjdA0RebUyi40hDrdbPTbBM0QWw7aehnMOsEfoTJFMfBF5GGMMEWkEg54L8YC2RSKIS_Fiv2Xtfz8ZCmL1O91NWewMznhqTgdbII2mrenrYkBYa9KPvOwVErNKzx0PIs0ZaR1yE_JxinbILj1WSvxfvveF5msMsMj2F1Vj2RlHgTqY29lnxyDPtq5ZxC3ozoH', category: 'Facial', caption: 'Gold Serum Treatment' }
        ]);
      });
  }, []);

  const categories = ['All', 'Haircuts', 'Beard', 'Facial', 'Interior'];

  const filteredItems = filter === 'All'
    ? items
    : items.filter(item => item.category === filter);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="max-container" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ color: '#f2ca50', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '12px' }}>
          Visual Excellence
        </span>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '52px', color: '#e5e2e1', marginBottom: '24px' }}>
          The Portfolio
        </h1>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                background: filter === cat ? '#f2ca50' : 'transparent',
                color: filter === cat ? '#3c2f00' : '#d0c5af',
                border: '1px solid rgba(242, 202, 80, 0.3)',
                padding: '8px 20px',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry / Grid */}
      <div className="max-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {filteredItems.map(item => (
            <div
              key={item._id}
              onClick={() => setSelectedImage(item)}
              style={{
                position: 'relative',
                height: '360px',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              className="glass-card"
            >
              <img
                alt={item.caption}
                src={item.image}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(19,19,19,0.9), transparent)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '24px'
                }}
              >
                <div>
                  <span style={{ color: '#f2ca50', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block' }}>
                    {item.category}
                  </span>
                  <span style={{ color: '#e5e2e1', fontSize: '18px', fontFamily: "'Playfair Display', serif" }}>
                    {item.caption}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div style={{ position: 'relative', maxWidth: '900px', width: '100%' }}>
            <img
              alt={selectedImage.caption}
              src={selectedImage.image}
              style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', border: '1px solid #f2ca50' }}
            />
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <h3 style={{ color: '#f2ca50', fontSize: '24px' }}>{selectedImage.caption}</h3>
              <p style={{ color: '#d0c5af', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {selectedImage.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
