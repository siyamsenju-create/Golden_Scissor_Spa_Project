import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          height: '75vh',
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
            backgroundImage: "url('https://lh3.googleusercontent.com/aida/AP1WRLsG-4kx7wQLBsB2jeYgvKHbJ3cr3yTiikD1mb0HieHPxw-O-69_2nKAMJyBNdarotFAkYLSVmgD2mjDnhOheoy5WP4r2cxEQdpxpKgUAT9nGBGrxuAE0Bo3pVcMfQNgRa6eyxIwslLTpnGN7aj4r9gAY6kxlbYxY7aibcjlwlesI_tlS5Qk4eG-eFbULdehQHWMxUFIyH-Cllfuhv1lnV1UDh7uWVSN0kk4kba8by_GPBZt4jYxtAQ6gwo')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3)'
          }}
        />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '700px', padding: '0 20px' }}>
          <span style={{ color: '#f2ca50', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '16px' }}>
            Established 2014
          </span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '56px', color: '#ffffff', marginBottom: '24px' }}>
            The Sanctuary of Precision
          </h1>
          <p style={{ color: '#d0c5af', fontSize: '18px', lineHeight: '1.6' }}>
            Where timeless heritage meets modern grooming excellence. Experience the art of the scissor in an environment designed for the discerning gentleman.
          </p>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section style={{ backgroundColor: '#0e0e0e', padding: '80px 0' }}>
        <div
          className="max-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            textAlign: 'center'
          }}
        >
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '56px', color: '#f2ca50', marginBottom: '8px' }}>5000+</h2>
            <p style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>Clients Served</p>
          </div>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '56px', color: '#f2ca50', marginBottom: '8px' }}>10+</h2>
            <p style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>Years of Excellence</p>
          </div>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '56px', color: '#f2ca50', marginBottom: '8px' }}>12+</h2>
            <p style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>Master Stylists</p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section style={{ padding: '120px 0' }}>
        <div
          className="max-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'center'
          }}
        >
          <div>
            <span style={{ color: '#f2ca50', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '12px' }}>
              Our Story
            </span>
            <h2 style={{ fontSize: '40px', color: '#e5e2e1', marginBottom: '24px' }}>The Legacy of Precision</h2>
            <p style={{ color: '#d0c5af', fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
              Founded in the heart of the city, Golden Scissor Spa was born from a singular vision: to restore the dignity of the traditional barbering experience while infusing it with contemporary luxury.
            </p>
            <p style={{ color: '#d0c5af', fontSize: '16px', lineHeight: '1.8', marginBottom: '36px' }}>
              Our journey began a decade ago with a single chair and a commitment to perfection. Today, we stand as a beacon of excellence, where every stroke of the razor and cut of the scissor is performed with surgical precision.
            </p>
            <div className="glass-card" style={{ padding: '24px', borderLeft: '4px solid #f2ca50' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontStyle: 'italic', color: '#f2ca50' }}>
                "A haircut is a conversation between tradition and the individual."
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '12px' }}>
            <img
              alt="Craftsmanship"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkc0XKZesdkq1w0bgzO3Mi1qWQixasJ-di4ARHPYW1QJ4kcOsckBAAccAHGTUxipg7zy-0KzZ2BBOtlEcQNMiXAKV9Y0gDjZzrjvtONzZoxLuWNKVqklvc8RiXPMtqvo-2OYHQrf4FUj1_aWKaOQEZ3yo7lhh6Fq1X3WTW-WGNNdkC9MARVewoprzL53cevCJadp7wvPC1LcbwmnIvdZJY44sZXcg4zvBgkfUqMRTAys48ZYXJV5oE7pxWavjJqQXaebR3fpkcBp3l"
              style={{ width: '100%', height: '500px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '100px 0', backgroundColor: '#1c1b1b' }}>
        <div
          className="max-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}
        >
          <div className="glass-card" style={{ padding: '40px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#f2ca50', marginBottom: '20px', display: 'block' }}>
              content_cut
            </span>
            <h3 style={{ fontSize: '28px', color: '#e5e2e1', marginBottom: '16px' }}>Mission</h3>
            <p style={{ color: '#d0c5af', fontSize: '16px', lineHeight: '1.7' }}>
              To provide an unparalleled sanctuary of grooming that empowers the modern man through meticulous craftsmanship and bespoke service.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '40px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#f2ca50', marginBottom: '20px', display: 'block' }}>
              visibility
            </span>
            <h3 style={{ fontSize: '28px', color: '#e5e2e1', marginBottom: '16px' }}>Vision</h3>
            <p style={{ color: '#d0c5af', fontSize: '16px', lineHeight: '1.7' }}>
              To redefine the global standard of male luxury grooming, becoming the definitive destination where heritage techniques and innovative wellness converge.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
