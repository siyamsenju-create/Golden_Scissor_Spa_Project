import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Team = () => {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/staff')
      .then(res => setStaffList(res.data.data))
      .catch(() => {
        setStaffList([
          {
            _id: '1',
            userId: { name: 'Julian V.' },
            specialties: ['Royal Shave', 'Master Cut'],
            bio: 'Master barber with 15+ years of craft in traditional wet shaves and hot towel rituals.',
            profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5vVt02nWdYnUx_li8M_pM5xodWY23wERkraX8N_SiOtjpgVTQuC232FGf4MKfXIFLWJ6fq4L7gZ5s58CWJPb6_Lg4V_K4kX6GgJAhF4Xk1TnHtqK4dSfFCStYgYkh7-UdEIKiXsHW5Xtj58FHjHUl7aIb-GDUo8Eee3GkQeG6sjoc7EE9_BVxIFhgHqZ4tl6faVkxTheE07Ew0XZSGAQahEhLoGUhztRj8r5gbXzk7JXla113Mfyc20twl4uEbcGuEDtI1pF-wfeg',
            rating: 4.9,
            experience: 15
          },
          {
            _id: '2',
            userId: { name: 'Marco R.' },
            specialties: ['Beard Sculpt', 'Hair Styling'],
            bio: 'Specialist in contemporary trends, beard grooming, and facial structure styling.',
            profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAirx_WQYIsluJ2xpOVI550I8o5m1LvTaLSBVzyhw3ZIc6lEA7etM5S8zDi9x6DKoZVSaNexey4wRlSfrVPWRDBETuyNY0erLrVP_Zb5YjVh4I-xNexza7KKYdT3CpfdSqFUB1X15o2oeblCLI6zKbU9jReElEPRg81adp-vYfLeTOOS-Y5F0qq1CzVtny-dmj22VfmsqcroosLqQ1EpRpoFOk8FW6RyWp6-m_7lXmlIVATkHgARazXnvuL0AnPqbTyzDNoZ3SxWJJP',
            rating: 4.8,
            experience: 8
          },
          {
            _id: '3',
            userId: { name: 'Dominic T.' },
            specialties: ['Facial Rituals', 'Head Massage'],
            bio: 'Expert wellness therapist specializing in skin rejuvenation and tension release massage.',
            profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASq3ddpkp0XE4ShpqY-qUl3rSshOXWoU9nC1aTgIyqDdDkZgkUMF9Vfj2jhbjdrK_LUtqIHSCzFPNEtUDH6RBTuH9NYErIvJnkD9zFrrY0ihm592GSU3Vm9mHtggRBARfnRCnDLJQZNnpi1ffJcLfXOdlq5STtiDfEalHkT6NS45NU-3tVTVVx8hrCCS6eNe-dJ936SiK_ydY4lh8zzQK06296hQYa_qaw6KNKtql1L8pdB7ArRDXcRthBCoqvYiTAwK69-6JlPXZS',
            rating: 4.9,
            experience: 12
          }
        ]);
      });
  }, []);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="max-container" style={{ textAlign: 'center', marginBottom: '80px' }}>
        <span style={{ color: '#ffcc33ff', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '3px', display: 'block', marginBottom: '12px' }}>
          Master Artisans
        </span>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '52px', color: '#e5e2e1', marginBottom: '20px' }}>
          Our Stylists &amp; Therapists
        </h1>
        <p style={{ color: '#d0c5af', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Guided by years of dedicated practice, our craftsmen are committed to precision grooming excellence.
        </p>
      </div>

      <div className="max-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {staffList.map((staff) => (
            <div key={staff._id} className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px auto', border: '2px solid #f2ca50' }}>
                <img
                  alt={staff.userId.name}
                  src={staff.profileImage}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <h3 style={{ fontSize: '24px', color: '#e5e2e1', marginBottom: '6px' }}>{staff.userId.name}</h3>
              <p style={{ color: '#f2ca50', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                {staff.specialties.join(' • ')}
              </p>
              <p style={{ color: '#d0c5af', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                {staff.bio}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid rgba(77, 70, 53, 0.3)', paddingTop: '16px' }}>
                <div>
                  <span style={{ color: '#f2ca50', fontWeight: 'bold', fontSize: '18px' }}>{staff.experience} yrs</span>
                  <span style={{ color: '#d0c5af', fontSize: '11px', display: 'block', textTransform: 'uppercase' }}>Experience</span>
                </div>
                <div>
                  <span style={{ color: '#f2ca50', fontWeight: 'bold', fontSize: '18px' }}>★ {staff.rating}</span>
                  <span style={{ color: '#d0c5af', fontSize: '11px', display: 'block', textTransform: 'uppercase' }}>Rating</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
