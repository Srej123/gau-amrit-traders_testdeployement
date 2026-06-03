export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Gau Amrit Traders',
    description: 'Premium A2 cow ghee, milk, dairy products, pooja items & natural cow products. Traditional Bilona method, lab tested, farm fresh delivery.',
    url: 'https://gauamrittraders.com',
    telephone: '+91-9876543210',
    email: 'info@gauamrittraders.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: 'India',
    },
    priceRange: '₹₹',
    openingHours: 'Mo-Su 09:00-20:00',
    sameAs: [
      'https://facebook.com/gauamrittraders',
      'https://instagram.com/gauamrittraders',
      'https://youtube.com/@gauamrittraders',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cow Products',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'A2 Bilona Ghee' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'A2 Fresh Milk' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'A2 Paneer' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Panchagavya Soap' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Gomutra Ark' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Havan Samagri' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Cow Dung Cakes' } },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
