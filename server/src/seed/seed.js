require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User.model');
const Staff = require('../models/Staff.model');
const Service = require('../models/Service.model');
const Membership = require('../models/Membership.model');
const Gallery = require('../models/Gallery.model');
const Offer = require('../models/Offer.model');
const Review = require('../models/Review.model');

const seedData = async () => {
  try {
    console.log('🔄 Connecting to MongoDB for seeding...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected.');

    // Clear existing data
    console.log('🗑️ Clearing existing collections...');
    await User.deleteMany();
    await Staff.deleteMany();
    await Service.deleteMany();
    await Membership.deleteMany();
    await Gallery.deleteMany();
    await Offer.deleteMany();
    await Review.deleteMany();

    // 1. Create memberships
    console.log('🌱 Seeding memberships...');
    const memberships = await Membership.create([
      {
        name: 'Essential',
        price: 45,
        duration: 30,
        benefits: ['Precision Scissor Cut', 'Hot Towel Refresh', 'Artisanal Hair Styling', 'Straight Razor Finish'],
        discountPercent: 5
      },
      {
        name: 'Signature',
        price: 85,
        duration: 30,
        benefits: ['Everything in Essential', 'Signature Facial Massage', 'Bergamot Beard Therapy', 'Gold-Infused Scalp Wash', 'Craft Beverage Pairing'],
        discountPercent: 10
      },
      {
        name: 'Royal',
        price: 150,
        duration: 30,
        benefits: ['Everything in Signature', 'Private Vault Suite Access', 'Hand & Arm Acupressure', 'Premium Cigar Lounge Pass', 'Exclusive Fragrance Kit'],
        discountPercent: 15
      }
    ]);

    // 2. Create Users
    console.log('🌱 Seeding users...');
    const adminUser = await User.create({
      name: 'Arthur Pendragon',
      email: 'admin@goldenscissorspa.com',
      phone: '+1 (555) 111-2222',
      password: 'password123',
      role: 'admin',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5vVt02nWdYnUx_li8M_pM5xodWY23wERkraX8N_SiOtjpgVTQuC232FGf4MKfXIFLWJ6fq4L7gZ5s58CWJPb6_Lg4V_K4kX6GgJAhF4Xk1TnHtqK4dSfFCStYgYkh7-UdEIKiXsHW5Xtj58FHjHUl7aIb-GDUo8Eee3GkQeG6sjoc7EE9_BVxIFhgHqZ4tl6faVkxTheE07Ew0XZSGAQahEhLoGUhztRj8r5gbXzk7JXla113Mfyc20twl4uEbcGuEDtI1pF-wfeg'
    });

    const staffUser1 = await User.create({
      name: 'Julian V.',
      email: 'julian@goldenscissorspa.com',
      phone: '+1 (555) 222-3333',
      password: 'password123',
      role: 'staff',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5vVt02nWdYnUx_li8M_pM5xodWY23wERkraX8N_SiOtjpgVTQuC232FGf4MKfXIFLWJ6fq4L7gZ5s58CWJPb6_Lg4V_K4kX6GgJAhF4Xk1TnHtqK4dSfFCStYgYkh7-UdEIKiXsHW5Xtj58FHjHUl7aIb-GDUo8Eee3GkQeG6sjoc7EE9_BVxIFhgHqZ4tl6faVkxTheE07Ew0XZSGAQahEhLoGUhztRj8r5gbXzk7JXla113Mfyc20twl4uEbcGuEDtI1pF-wfeg'
    });

    const staffUser2 = await User.create({
      name: 'Marco R.',
      email: 'marco@goldenscissorspa.com',
      phone: '+1 (555) 333-4444',
      password: 'password123',
      role: 'staff',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAirx_WQYIsluJ2xpOVI550I8o5m1LvTaLSBVzyhw3ZIc6lEA7etM5S8zDi9x6DKoZVSaNexey4wRlSfrVPWRDBETuyNY0erLrVP_Zb5YjVh4I-xNexza7KKYdT3CpfdSqFUB1X15o2oeblCLI6zKbU9jReElEPRg81adp-vYfLeTOOS-Y5F0qq1CzVtny-dmj22VfmsqcroosLqQ1EpRpoFOk8FW6RyWp6-m_7lXmlIVATkHgARazXnvuL0AnPqbTyzDNoZ3SxWJJP'
    });

    const staffUser3 = await User.create({
      name: 'Dominic T.',
      email: 'dominic@goldenscissorspa.com',
      phone: '+1 (555) 444-5555',
      password: 'password123',
      role: 'staff',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASq3ddpkp0XE4ShpqY-qUl3rSshOXWoU9nC1aTgIyqDdDkZgkUMF9Vfj2jhbjdrK_LUtqIHSCzFPNEtUDH6RBTuH9NYErIvJnkD9zFrrY0ihm592GSU3Vm9mHtggRBARfnRCnDLJQZNnpi1ffJcLfXOdlq5STtiDfEalHkT6NS45NU-3tVTVVx8hrCCS6eNe-dJ936SiK_ydY4lh8zzQK06296hQYa_qaw6KNKtql1L8pdB7ArRDXcRthBCoqvYiTAwK69-6JlPXZS'
    });

    const customerUser = await User.create({
      name: 'James Sterling',
      email: 'customer@goldenscissorspa.com',
      phone: '+1 (555) 999-8888',
      password: 'password123',
      role: 'customer',
      loyaltyPoints: 120,
      membershipId: memberships[1]._id, // Subscribed to Signature
      membershipExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    // 3. Create Staff profiles
    console.log('🌱 Seeding staff profiles...');
    const defaultAvailability = [
      { day: 'Monday', startTime: '09:00', endTime: '19:00', isOff: false },
      { day: 'Tuesday', startTime: '09:00', endTime: '19:00', isOff: false },
      { day: 'Wednesday', startTime: '09:00', endTime: '19:00', isOff: false },
      { day: 'Thursday', startTime: '09:00', endTime: '19:00', isOff: false },
      { day: 'Friday', startTime: '09:00', endTime: '19:00', isOff: false },
      { day: 'Saturday', startTime: '09:00', endTime: '19:00', isOff: false },
      { day: 'Sunday', startTime: '11:00', endTime: '18:00', isOff: true }
    ];

    const staff1 = await Staff.create({
      userId: staffUser1._id,
      specialties: ['Royal Shave', 'Master Cut'],
      bio: 'Master barber with 15+ years of craft in traditional wet shaves and hot towel rituals.',
      experience: 15,
      rating: 4.9,
      totalReviews: 240,
      availability: defaultAvailability,
      profileImage: staffUser1.avatar,
      profileImagePublicId: 'seed/staff1'
    });

    const staff2 = await Staff.create({
      userId: staffUser2._id,
      specialties: ['Beard Sculpt', 'Hair Styling'],
      bio: 'Specialist in contemporary trends, beard grooming, and facial structure styling.',
      experience: 8,
      rating: 4.8,
      totalReviews: 180,
      availability: defaultAvailability,
      profileImage: staffUser2.avatar,
      profileImagePublicId: 'seed/staff2'
    });

    const staff3 = await Staff.create({
      userId: staffUser3._id,
      specialties: ['Facial Rituals', 'Head Massage'],
      bio: 'Expert wellness therapist specializing in skin rejuvenation and tension release massage.',
      experience: 12,
      rating: 4.9,
      totalReviews: 150,
      availability: defaultAvailability,
      profileImage: staffUser3.avatar,
      profileImagePublicId: 'seed/staff3'
    });

    // 4. Create Services
    console.log('🌱 Seeding services...');
    const services = await Service.create([
      {
        name: 'Haircut',
        category: 'Signature',
        description: 'Bespoke cutting and styling tailored to your face shape and personal lifestyle.',
        duration: 45,
        price: 50,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL8jBZceg1Ou5QcAxYoLyqVhrGs7FcwP4GUKZhi2mjSSdwILTfepeX03XQjLMx8TRC8fcQnqGeR-zDihvMLJJQ5FDBmZoPtBSBJT7MhiXb3T4aDJHgUHQ5M6v839anMKh6-YfoFkYkdCW__UhMdWg1_ermHbQwV5ltYwneiJ1GV8Gzthkyt4YBCSAI0s8HM_fb8nkosDsJtCB72H7ZfU81GmEvByIdq2O9eobfH2pME0xp0LFsnuIUARYEvwRUz-hGo64fJhWGNQK7',
        isFeatured: true,
        displayOrder: 1
      },
      {
        name: 'Beard Styling',
        category: 'Artisan',
        description: 'Sculpting, hot towel treatment, and premium oils for a perfectly maintained beard.',
        duration: 30,
        price: 40,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXS19LeUBVct7crXcRQRBWPmR-YE5O07B_IxfgsnrhQmZfhDHxttBQRBlaZocPV9VwqDXAEPtK-p4x5iZXa60NV1g-YJ1fDiJfAy2ntRwWixdYKgS82nS0J3Hd7poJm7hbXC0cmunHN45daAOqYhz1nH03j90c251TpH6xTFAnXmj5tPURWM7jxC3Qlh19_7DnsChd4fHqSHxd0AdWVDzBDRsu3FE8OHfw0UaLLuwT9kzhmpu5O9DlfDN2UHU5oX1f_2nktiq4lkad',
        isFeatured: true,
        displayOrder: 2
      },
      {
        name: 'Facial Treatments',
        category: 'Rejuvenation',
        description: 'Revitalizing skin therapy using organic compounds for a refreshed, youthful appearance.',
        duration: 60,
        price: 85,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByIQ7ixTmp68_I0l21GgD8kAJiLACRRIdcHl-sL1Q7QOQd6qm_t5Lx9ragTuRwDkD_AD7u9FP-ZC7mjdA0RebUyi40hDrdbPTbBM0QWw7aehnMOsEfoTJFMfBF5GGMMEWkEg54L8YC2RSKIS_Fiv2Xtfz8ZCmL1O91NWewMznhqTgdbII2mrenrYkBYa9KPvOwVErNKzx0PIs0ZaR1yE_JxinbILj1WSvxfvveF5msMsMj2F1Vj2RlHgTqY29lnxyDPtq5ZxC3ozoH',
        isFeatured: true,
        displayOrder: 3
      },
      {
        name: 'D-Tan',
        category: 'Therapy',
        description: 'Intensive skin brightening treatment to remove tanning and even out skin tone.',
        duration: 40,
        price: 60,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKDbRomZ7uAHzUJSMemx-vr9BfVYvBtofmT1SO5WR417r1ucZnI8zeicwmuE5MjEzLOHnyrYmVspMWxOtDgvthuPcshXcrV8bD02YVhk6Dg31FqbuAUAE2jhRMRbaPtlVPQWPk4NHdX1ogMJe2QXQ_9nzvXJSsdzfGXtRoGKmyQmBlEMHRtqgp488AVEe9NmnuaQIupW_zvtCleZB2XghFNMyHVvcnF1mSmqEPNwFB5G3OICewlRTM82QzV1S7eVZpHpfo1y-8azPQ',
        isFeatured: false,
        displayOrder: 4
      },
      {
        name: 'Head Massage',
        category: 'Wellness',
        description: 'Therapeutic scalp massage with essential oils to release stress and tension.',
        duration: 20,
        price: 35,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRZInkUMfj6ivmk8e7iz63nXlAWOtd0Q-cWUtJ8i1tiIpqurJwFxdXyprm2JqTU9HdkbW-omwlAt7tpxKXL9UDPQb-mpmE_kgLue8PCYzt-Wx-Ia3PL2Luwyc4EOGNPMz8FyHxoPWQ4QKO5fODZGRBVAvSKp4wxjNVPcfOpOhs9LbhJPZi9ia-wzr6F9prhYgE3i0QJLKARbW351u9uU_WSSEOM_BD-b7R4Sw_w18CxFXVD9NAZ1ydMgUq-nmHVcJy8Q8d48e2chbP',
        isFeatured: false,
        displayOrder: 5
      },
      {
        name: 'Hair Smoothening',
        category: 'Lustre',
        description: 'Advanced chemical treatments to tame frizz and provide a sleek, manageable look.',
        duration: 90,
        price: 120,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkDqTNckxvpy3MCev0zPxiH3nS4YYGpE6EF8L2V2NCvrwD_3E-xBAwbKEkljX3oeOVTWuYcnY0SfORgEkJXrTTQr3pHaAlHawLR7hFqi00dpFcxz3s3VvjNYRQKa4Y_o7FVVxNhhjvSvl-7WwCfVNyfeNZjoUKCfVtevTOk_SbG8m_MwvVd4npOlJvmRiSy2e8IVQLRQygf5LW70O9FBzw8YoERGZ-StNeqPJnXA_020vkBsT_PXYxEO20mDZBXaIOItZ3FQ7SwhAK',
        isFeatured: false,
        displayOrder: 6
      }
    ]);

    // Add services to Customer wishlist
    customerUser.wishlist.push(services[0]._id, services[1]._id);
    await customerUser.save();

    // 5. Create Offers
    console.log('🌱 Seeding offers...');
    const validDate = new Date();
    validDate.setMonth(validDate.getMonth() + 3);

    await Offer.create([
      {
        title: 'Welcome Discount',
        description: 'Get 20% off your initial sanctuary session.',
        discountPercent: 20,
        code: 'GOLDEN20',
        validUntil: validDate,
        targetServices: [services[0]._id, services[1]._id]
      },
      {
        title: 'Royal Spa Treatment',
        description: 'Experience pure indulgence at 15% discount.',
        discountPercent: 15,
        code: 'ROYAL15',
        validUntil: validDate,
        targetServices: [services[2]._id]
      }
    ]);

    // 6. Create Gallery Items
    console.log('🌱 Seeding gallery...');
    await Gallery.create([
      {
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0k3i1YxaToL5NmqJYEHSXH7rbybAd1LSKlTxEObJk-OQne_BeVv8YpWQ06hwP-beCwxrVpWuGkGy6JBlTac2jFVHkAJMdpTCA109tO8Hwk_-a4an0f2kmD0rqeXyJyXLJsJo6SKxHjBKH0GWGNJqM-BA-TnaOBHRUL1iBVV7gWzVRMRCwKlbEyafS3fDUs5UwIuQFqEO9jGnzouy4RVDdyNZtajExyFsSDsAqixZS1F5cWirBS26x0oeMX5EW7hRo-Fy-CvB6jfjS',
        imagePublicId: 'seed/gallery1',
        category: 'Interior',
        caption: 'The Grand Lounge'
      },
      {
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASq3ddpkp0XE4ShpqY-qUl3rSshOXWoU9nC1aTgIyqDdDkZgkUMF9Vfj2jhbjdrK_LUtqIHSCzFPNEtUDH6RBTuH9NYErIvJnkD9zFrrY0ihm592GSU3Vm9mHtggRBARfnRCnDLJQZNnpi1ffJcLfXOdlq5STtiDfEalHkT6NS45NU-3tVTVVx8hrCCS6eNe-dJ936SiK_ydY4lh8zzQK06296hQYa_qaw6KNKtql1L8pdB7ArRDXcRthBCoqvYiTAwK69-6JlPXZS',
        imagePublicId: 'seed/gallery2',
        category: 'Haircuts',
        caption: 'Traditional Precision Cut'
      },
      {
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC4W0JFopP9AxKJyo8DnfU99FNPoc4hC-G8kYPlSOPzxt26A9CVeFe8xMNEIMjGLu8zbCIiLQCzTZS7xt-mNyJ4p9U9PsMkv8y6UY59iT-qkP3a5ZlznOtiPMGXpr3-ebfTTqDc4tuskQUKc9gx7N_AevRiSZ2RUeX_bvYAMW6j_6g77VFhaEyV2CF9i7sc3COdevb1_ujAH4P9__1twErBsP-hq9Cvi3qdu4RWa5_b-Q9WTXnfnDkiqF_C0QtUFjUVaoj3Qxd6BaY',
        imagePublicId: 'seed/gallery3',
        category: 'Beard',
        caption: 'Bespoke Beard Sculpting'
      }
    ]);

    // 7. Create Reviews
    console.log('🌱 Seeding reviews...');
    await Review.create([
      {
        customerId: customerUser._id,
        staffId: staff1._id,
        serviceId: services[0]._id,
        rating: 5,
        comment: 'Outstanding service! Julian V is a true master artisan. Best haircut and scalp wash I have ever received.',
        isApproved: true
      },
      {
        customerId: customerUser._id,
        staffId: staff2._id,
        serviceId: services[1]._id,
        rating: 5,
        comment: 'Superb hot towel wet shave. Extremely relaxed atmosphere, warm amber backlighting was incredibly comforting.',
        isApproved: true,
        reply: 'Thank you for your feedback, James. We look forward to welcome you back.'
      }
    ]);

    console.log('🟢 Seeding complete. All models populated successfully.');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
