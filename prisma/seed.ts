import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const existingAdmin = await prisma.admin.findFirst();
  if (existingAdmin) {
    console.log('⏭️ Admin user already exists');
  } else {
    const hashedPassword = await bcrypt.hash('GauAmrit@2026', 10);
    await prisma.admin.create({
      data: { username: 'owner', password: hashedPassword },
    });
    console.log('✅ Admin user created (owner / GauAmrit@2026)');
  }

  // Check if products already exist
  const productCount = await prisma.product.count();
  if (productCount > 0) {
    console.log(`⏭️ Products already exist (${productCount})`);
  } else {
    const products = [
      {
        name: 'A2 Bilona Cow Ghee',
        slug: 'a2-bilona-cow-ghee',
        description: 'Pure A2 cow ghee made using traditional Bilona method. Hand-churned from curd made of A2 cow milk. Rich in nutrients, golden in color, and divine in taste. Perfect for cooking, religious ceremonies, and Ayurvedic remedies.',
        price: '750',
        originalPrice: '900',
        category: 'ghee',
        images: JSON.stringify(['/products/a2-ghee-1.jpg']),
        videoUrl: '',
        features: JSON.stringify(['Traditional Bilona Method', '100% A2 Cow Milk', 'Lab Tested & Certified', 'No Preservatives', 'Farm Fresh']),
        specs: JSON.stringify({ Weight: '500ml', Shelf Life: '12 Months', Source: 'Desi A2 Cow', Method: 'Bilona (Hand-churned)' }),
        technology: 'Bilona Method',
        capacity: '500ml',
        warranty: '',
        tdsRange: '',
        order: 1,
      },
      {
        name: 'A2 Cow Milk',
        slug: 'a2-cow-milk',
        description: 'Fresh A2 cow milk delivered daily from our Gaushala. Pure, unadulterated milk from desi cows. Rich in A2 beta-casein protein, easier to digest and healthier than regular milk.',
        price: '80',
        originalPrice: '',
        category: 'milk',
        images: JSON.stringify(['/products/a2-milk-1.jpg']),
        videoUrl: '',
        features: JSON.stringify(['Farm Fresh Daily', 'A2 Beta-Casein', 'No Chemicals', 'Easy to Digest', 'Home Delivery']),
        specs: JSON.stringify({ Volume: '1 Litre', Type: 'Full Cream', Source: 'Desi A2 Cow', Delivery: 'Daily Morning' }),
        technology: '',
        capacity: '1 Litre',
        warranty: '',
        tdsRange: '',
        order: 2,
      },
      {
        name: 'Panchagavya Diya Batti',
        slug: 'panchagavya-diya-batti',
        description: 'Handmade Diya Batti (cotton wick) made from Panchagavya products. Pure and natural, ideal for daily pooja and religious ceremonies. Burns steadily with a calm, divine flame.',
        price: '50',
        originalPrice: '70',
        category: 'pooja-items',
        images: JSON.stringify(['/products/diya-batti-1.jpg']),
        videoUrl: '',
        features: JSON.stringify(['Panchagavya Based', 'Handmade', 'Pure Cotton', 'Steady Burn', 'Eco-friendly']),
        specs: JSON.stringify({ Quantity: '50 Pieces', Material: 'Pure Cotton + Panchagavya', Length: '4 inches' }),
        technology: 'Panchagavya',
        capacity: '50 Pieces',
        warranty: '',
        tdsRange: '',
        order: 3,
      },
      {
        name: 'Cow Dung Cakes',
        slug: 'cow-dung-cakes',
        description: 'Pure cow dung cakes (Uple) from desi cows. Dried naturally in sunlight. Used for Havan, religious rituals, and traditional cooking. 100% natural and chemical-free.',
        price: '100',
        originalPrice: '',
        category: 'cow-products',
        images: JSON.stringify(['/products/cow-dung-1.jpg']),
        videoUrl: '',
        features: JSON.stringify(['Sun-Dried', 'Natural & Pure', 'For Havan & Pooja', 'Eco-friendly', 'Traditional Use']),
        specs: JSON.stringify({ Quantity: '10 Pieces', Weight: '2kg approx', Source: 'Desi Cow' }),
        technology: '',
        capacity: '2kg',
        warranty: '',
        tdsRange: '',
        order: 4,
      },
      {
        name: 'A2 Ghee (1 Litre)',
        slug: 'a2-ghee-1-litre',
        description: 'Premium A2 Bilona Cow Ghee in 1 Litre pack. Made from curd of pure desi A2 cow milk using the Vedic Bilona method. Golden, aromatic, and packed with nutrition.',
        price: '1400',
        originalPrice: '1700',
        category: 'ghee',
        images: JSON.stringify(['/products/a2-ghee-1l-1.jpg']),
        videoUrl: '',
        features: JSON.stringify(['Bilona Method', '1 Litre Family Pack', 'Lab Tested', 'Rich Aroma', 'Ayurvedic Grade']),
        specs: JSON.stringify({ Weight: '1 Litre', Shelf Life: '12 Months', Source: 'Desi A2 Cow', Method: 'Bilona (Hand-churned)' }),
        technology: 'Bilona Method',
        capacity: '1 Litre',
        warranty: '',
        tdsRange: '',
        order: 5,
      },
      {
        name: 'Dhoop & Agarbatti Set',
        slug: 'dhoop-agarbatti-set',
        description: 'Natural dhoop and agarbatti made from cow dung and herbs. Chemical-free, pure fragrance for daily pooja. Handcrafted with traditional methods.',
        price: '120',
        originalPrice: '150',
        category: 'pooja-items',
        images: JSON.stringify(['/products/dhoop-1.jpg']),
        videoUrl: '',
        features: JSON.stringify(['Cow Dung Based', 'Natural Herbs', 'Chemical-free', 'Long-lasting Fragrance', 'Handcrafted']),
        specs: JSON.stringify({ Contents: 'Dhoop Sticks + Agarbatti', Quantity: '100 Sticks', Fragrance: 'Natural Sandal & Herb' }),
        technology: '',
        capacity: '100 Sticks',
        warranty: '',
        tdsRange: '',
        order: 6,
      },
      {
        name: 'A2 Paneer',
        slug: 'a2-paneer',
        description: 'Fresh A2 paneer made from pure desi cow milk. Soft, creamy, and rich in protein. No chemicals or preservatives. Made fresh to order.',
        price: '350',
        originalPrice: '',
        category: 'dairy',
        images: JSON.stringify(['/products/paneer-1.jpg']),
        videoUrl: '',
        features: JSON.stringify(['Fresh Made', 'A2 Cow Milk', 'No Preservatives', 'Soft & Creamy', 'Rich Protein']),
        specs: JSON.stringify({ Weight: '250g', Type: 'Fresh Paneer', Source: 'A2 Cow Milk' }),
        technology: '',
        capacity: '250g',
        warranty: '',
        tdsRange: '',
        order: 7,
      },
      {
        name: 'Panchagavya Soap',
        slug: 'panchagavya-soap',
        description: 'Handmade Panchagavya soap made from cow milk, ghee, curd, cow urine, and cow dung extract. Natural skin care, chemical-free. Good for all skin types.',
        price: '90',
        originalPrice: '120',
        category: 'cow-products',
        images: JSON.stringify(['/products/soap-1.jpg']),
        videoUrl: '',
        features: JSON.stringify(['Panchagavya Based', 'Handmade', 'Chemical-free', 'Skin Friendly', 'Ayurvedic']),
        specs: JSON.stringify({ Weight: '100g', Type: 'Bathing Soap', Ingredients: 'Panchagavya + Essential Oils' }),
        technology: 'Panchagavya',
        capacity: '100g',
        warranty: '',
        tdsRange: '',
        order: 8,
      },
    ];

    for (const product of products) {
      await prisma.product.create({ data: product });
    }
    console.log(`✅ Created ${products.length} products`);
  }

  // Create store
  const storeCount = await prisma.store.count();
  if (storeCount > 0) {
    console.log(`⏭️ Stores already exist (${storeCount})`);
  } else {
    await prisma.store.create({
      data: {
        name: 'Gau Amrit Traders - Main Branch',
        phone: '+91-9876543210',
        address: 'Near Gaushala, Main Road, India',
        googleMapUrl: 'https://maps.google.com',
        googleReviewUrl: 'https://search.google.com/local/writereview',
        hours: 'Mon-Sun 6AM-9PM',
        isVerified: true,
        order: 1,
      },
    });
    console.log('✅ Created 1 store');
  }

  // Create testimonials
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount > 0) {
    console.log(`⏭️ Testimonials already exist (${testimonialCount})`);
  } else {
    const testimonials = [
      { name: 'Sunita Devi', location: 'Varanasi', rating: 5, review: 'Best A2 ghee I have ever tasted. Pure and aromatic, just like homemade. My family loves it!', order: 1 },
      { name: 'Rajesh Kumar', location: 'Lucknow', rating: 5, review: 'Fresh milk delivery every morning. Very reliable service and the milk quality is outstanding.', order: 2 },
      { name: 'Priya Sharma', location: 'Delhi', rating: 4, review: 'The Panchagavya soap is amazing for sensitive skin. My skin has improved so much since I started using it.', order: 3 },
      { name: 'Amit Patel', location: 'Ahmedabad', rating: 5, review: 'Authentic Bilona ghee. You can taste the difference. Perfect for our daily cooking and pooja.', order: 4 },
      { name: 'Meera Joshi', location: 'Haridwar', rating: 5, review: 'The pooja items are pure and traditional. The cow dung cakes burn perfectly for Havan. Highly recommended!', order: 5 },
      { name: 'Vikram Singh', location: 'Jaipur', rating: 4, review: 'Great quality A2 paneer. Fresh and soft. Wish they had more dairy products. Will definitely order again.', order: 6 },
    ];

    for (const t of testimonials) {
      await prisma.testimonial.create({ data: t });
    }
    console.log(`✅ Created ${testimonials.length} testimonials`);
  }

  // Create site settings
  const settingsCount = await prisma.siteSetting.count();
  if (settingsCount > 0) {
    console.log(`⏭️ Settings already exist (${settingsCount})`);
  } else {
    const settings = [
      { key: 'site_name', value: 'Gau Amrit Traders' },
      { key: 'tagline', value: 'Pure Cow Products, Pure Life' },
      { key: 'phone', value: '+91-9876543210' },
      { key: 'whatsapp', value: '919876543210' },
      { key: 'email', value: 'info@gauamrittraders.com' },
      { key: 'address', value: 'Gau Amrit Traders, Near Gaushala, India' },
      { key: 'hero_title', value: 'Pure A2 Cow Products' },
      { key: 'hero_subtitle', value: 'Traditional Bilona Ghee, Fresh A2 Milk, Pooja Items & Natural Cow Products' },
      { key: 'about_text', value: 'Gau Amrit Traders brings you the purest cow products sourced directly from our Gaushala. Our A2 ghee is made using the ancient Vedic Bilona method, ensuring authenticity and purity in every drop.' },
      { key: 'facebook_url', value: 'https://facebook.com/gauamrittraders' },
      { key: 'instagram_url', value: 'https://instagram.com/gauamrittraders' },
      { key: 'youtube_url', value: 'https://youtube.com/@gauamrittraders' },
    ];

    for (const s of settings) {
      await prisma.siteSetting.create({ data: s });
    }
    console.log(`✅ Created ${settings.length} settings`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
