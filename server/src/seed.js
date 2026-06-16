import 'dotenv/config'
import prisma from './db.js'

const products = [
  {
    name: 'Organic A2 Gir Cow Ghee',
    price: 849,
    image: '/products/1_ghee.png',
    imagePublicId: null,
    category: 'Ghee & Oils',
    description: 'Traditionally prepared A2 Gir Cow Ghee using the ancient Bilona method. Made from the pure milk of free-grazing Gir cows, this ghee is packed with nutritious goodness, healthy fats, and a rich, granular texture that enhances digestion and boosts immunity.',
    sourcing: 'Directly sourced from trusted gaushalas in Rajasthan, India',
    weight: '500ml',
    rating: 4.9,
    reviewsCount: 142,
    nutrition: { calories: 900, protein: '0g', carbs: '0g', fat: '99.8g', fiber: '0g' },
    isAvailable: true,
  },
  {
    name: 'Raw Wild Forest Honey',
    price: 399,
    image: '/products/2_honey.png',
    imagePublicId: null,
    category: 'Honey & Sweeteners',
    description: '100% pure, raw, and unfiltered forest honey collected sustainably by tribal communities from wild beehives in dense forests. Rich in natural antioxidants, enzymes, and pollen.',
    sourcing: 'Sustainably harvested from the Western Ghats forests',
    weight: '500g',
    rating: 4.8,
    reviewsCount: 96,
    nutrition: { calories: 304, protein: '0.3g', carbs: '82.4g', fat: '0g', fiber: '0.2g' },
    isAvailable: true,
  },
  {
    name: 'Cold Pressed Mustard Oil',
    price: 199,
    image: '/products/3_mustard_oil.png',
    imagePublicId: null,
    category: 'Ghee & Oils',
    description: 'Extracting mustard oil using a traditional wooden Kachi Ghani press preserves its natural nutrients, intense aroma, and pungent flavor. Cholesterol-free and highly rich in heart-healthy MUFAs.',
    sourcing: 'Sourced from organic mustard farms in Madhya Pradesh',
    weight: '1 Litre',
    rating: 4.7,
    reviewsCount: 84,
    nutrition: { calories: 884, protein: '0g', carbs: '0g', fat: '100g', fiber: '0g' },
    isAvailable: true,
  },
  {
    name: 'Organic Himalayan Pink Salt',
    price: 99,
    image: '/products/4_pink_salt.png',
    imagePublicId: null,
    category: 'Grains & Staples',
    description: 'Pure, unrefined Himalayan Pink Salt, hand-mined from ancient deposits at the foothills of the Himalayas. Contains 84 essential minerals and trace elements.',
    sourcing: 'Ethically mined from the salt ranges near the Himalayas',
    weight: '1kg',
    rating: 4.9,
    reviewsCount: 210,
    nutrition: { calories: 0, protein: '0g', carbs: '0g', fat: '0g', fiber: '0g', sodium: '38.8g' },
    isAvailable: true,
  },
  {
    name: 'Organic Premium Basmati Rice',
    price: 179,
    image: '/products/5_basmati_rice.png',
    imagePublicId: null,
    category: 'Grains & Staples',
    description: 'Long-grain, hand-selected, aromatic Basmati Rice aged naturally for over a year. Completely pesticide-free and grown using traditional organic farming techniques.',
    sourcing: 'Grown in the fertile foothills of Uttarakhand',
    weight: '1kg',
    rating: 4.8,
    reviewsCount: 118,
    nutrition: { calories: 349, protein: '8.1g', carbs: '77.5g', fat: '0.6g', fiber: '2.2g' },
    isAvailable: true,
  },
  {
    name: 'Premium Kashmiri Almonds',
    price: 599,
    image: '/products/6_almonds.png',
    imagePublicId: null,
    category: 'Nuts & Seeds',
    description: 'Pure, organic, small-sized Kashmiri almonds, famously known for their high oil content and naturally sweet flavor. High in protein, healthy fats, vitamins, and minerals.',
    sourcing: 'Harvested from certified almond orchards in Kashmir Valley',
    weight: '500g',
    rating: 4.9,
    reviewsCount: 176,
    nutrition: { calories: 579, protein: '21.2g', carbs: '21.7g', fat: '49.9g', fiber: '12.5g' },
    isAvailable: true,
  },
  {
    name: 'Organic Lakadong Turmeric Powder',
    price: 129,
    image: '/products/7_turmeric.png',
    imagePublicId: null,
    category: 'Spices & Herbs',
    description: 'Finely ground Lakadong Turmeric Powder with the highest curcumin content (7-9%). Sourced directly from Meghalaya, chemical-free and extremely aromatic.',
    sourcing: 'Directly sourced from female farming cooperatives in Jaintia Hills, Meghalaya',
    weight: '250g',
    rating: 5.0,
    reviewsCount: 88,
    nutrition: { calories: 354, protein: '7.8g', carbs: '64.9g', fat: '9.9g', fiber: '21.1g' },
    isAvailable: true,
  },
  {
    name: 'Raw Organic Chia Seeds',
    price: 189,
    image: '/products/8_chia_seeds.png',
    imagePublicId: null,
    category: 'Nuts & Seeds',
    description: 'Nutritious, organic raw Chia Seeds packed with high fiber, calcium, and essential Omega-3 fatty acids. Ideal for breakfast puddings, yogurt parfaits, or energy drinks.',
    sourcing: 'Sourced from organic farming projects in South India',
    weight: '250g',
    rating: 4.6,
    reviewsCount: 65,
    nutrition: { calories: 486, protein: '16.5g', carbs: '42.1g', fat: '30.7g', fiber: '34.4g' },
    isAvailable: true,
  },
  {
    name: 'Handmade Sugarcane Jaggery Blocks',
    price: 99,
    image: '/products/9_jaggery.png',
    imagePublicId: null,
    category: 'Honey & Sweeteners',
    description: 'Delicious, completely unrefined organic sugarcane jaggery prepared in traditional iron cauldrons. Free from artificial sulfur and chemical clarifying agents.',
    sourcing: 'Sourced from organic sugarcane fields in Maharashtra',
    weight: '500g',
    rating: 4.8,
    reviewsCount: 112,
    nutrition: { calories: 383, protein: '0.4g', carbs: '95g', fat: '0.1g', fiber: '0g' },
    isAvailable: true,
  },
  {
    name: 'Organic Green Cardamom Pods',
    price: 279,
    image: '/products/10_cardamom.png',
    imagePublicId: null,
    category: 'Spices & Herbs',
    description: 'Premium bold (8mm) Green Cardamom Pods, hand-picked for their vibrant green shade, rich aroma, and natural oils. Completely free from artificial coloring or chemical treatments.',
    sourcing: 'Harvested from certified organic spice gardens of Idukki, Kerala',
    weight: '100g',
    rating: 4.9,
    reviewsCount: 74,
    nutrition: { calories: 311, protein: '10.8g', carbs: '68.5g', fat: '6.7g', fiber: '28g' },
    isAvailable: true,
  },
]

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing products (safe for development)
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()

  // Seed all products
  for (const product of products) {
    await prisma.product.create({ data: product })
  }

  console.log(`✅ Seeded ${products.length} products successfully!`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
