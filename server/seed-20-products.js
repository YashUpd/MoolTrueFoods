import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const additionalProducts = [
  {
    name: 'Organic Cloves (Laung)',
    price: 349,
    category: 'Spices & Herbs',
    weight: '100g',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    description: 'Hand-picked organic cloves with a strong, pungent aroma. Ideal for curries, teas, and medicinal uses.',
    sourcing: 'Kerala, India',
    rating: 4.8,
    reviewsCount: 82,
    nutrition: { calories: 274, protein: '6g', carbs: '65g', fat: '13g', fiber: '34g' },
    isAvailable: true
  },
  {
    name: 'Premium Saffron (Kesar)',
    price: 1299,
    category: 'Spices & Herbs',
    weight: '5g',
    image: 'https://images.unsplash.com/photo-1615485984666-6804a9190119?auto=format&fit=crop&q=80&w=800',
    description: 'Pure Grade A1 Kashmiri Saffron. Hand-harvested, delivering unmatched color and aroma for your desserts and biryanis.',
    sourcing: 'Pampore, Kashmir',
    rating: 5.0,
    reviewsCount: 154,
    nutrition: { calories: 310, protein: '11g', carbs: '65g', fat: '6g', fiber: '3.9g' },
    isAvailable: true
  },
  {
    name: 'Organic Black Pepper',
    price: 299,
    category: 'Spices & Herbs',
    weight: '200g',
    image: 'https://images.unsplash.com/photo-1620023602410-b14bebf208dc?auto=format&fit=crop&q=80&w=800',
    description: 'Bold black peppercorns from the Malabar coast, sun-dried for a sharp and spicy flavor.',
    sourcing: 'Malabar Coast, Kerala',
    rating: 4.9,
    reviewsCount: 120,
    nutrition: { calories: 251, protein: '10g', carbs: '64g', fat: '3g', fiber: '25g' },
    isAvailable: true
  },
  {
    name: 'Himalayan Rock Salt (Sendha Namak)',
    price: 120,
    category: 'Grains & Staples',
    weight: '1kg',
    image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&q=80&w=800',
    description: 'Crushed raw rock salt containing vital trace minerals for daily cooking.',
    sourcing: 'Himalayan Ranges',
    rating: 4.7,
    reviewsCount: 231,
    nutrition: { calories: 0, protein: '0g', carbs: '0g', fat: '0g', fiber: '0g' },
    isAvailable: true
  },
  {
    name: 'Organic Cashews (Kaju)',
    price: 699,
    category: 'Nuts & Seeds',
    weight: '500g',
    image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800',
    description: 'Whole, crunchy W320 grade organic cashews. High in protein and healthy fats.',
    sourcing: 'Goa, India',
    rating: 4.8,
    reviewsCount: 189,
    nutrition: { calories: 553, protein: '18g', carbs: '30g', fat: '44g', fiber: '3.3g' },
    isAvailable: true
  },
  {
    name: 'Raw Pumpkin Seeds',
    price: 249,
    category: 'Nuts & Seeds',
    weight: '250g',
    image: 'https://images.unsplash.com/photo-1621216597207-6f81c9b63435?auto=format&fit=crop&q=80&w=800',
    description: 'Raw, unsalted pumpkin seeds. A nutritional powerhouse packed with magnesium, zinc, and healthy fats.',
    sourcing: 'Organic Farms, Rajasthan',
    rating: 4.6,
    reviewsCount: 95,
    nutrition: { calories: 446, protein: '19g', carbs: '54g', fat: '19g', fiber: '18g' },
    isAvailable: true
  },
  {
    name: 'Cold Pressed Coconut Oil',
    price: 349,
    category: 'Ghee & Oils',
    weight: '500ml',
    image: 'https://images.unsplash.com/photo-1611078516086-de600573e86c?auto=format&fit=crop&q=80&w=800',
    description: 'Unrefined, unbleached, and pure cold pressed coconut oil. Perfect for cooking, skin, and hair care.',
    sourcing: 'Tamil Nadu, India',
    rating: 4.9,
    reviewsCount: 278,
    nutrition: { calories: 862, protein: '0g', carbs: '0g', fat: '100g', fiber: '0g' },
    isAvailable: true
  },
  {
    name: 'A2 Buffalo Ghee',
    price: 699,
    category: 'Ghee & Oils',
    weight: '500ml',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800',
    description: 'Traditional A2 Buffalo Ghee made from the Bilona method. Offers a rich, nutty flavor, higher fat content, and promotes bone health.',
    sourcing: 'Haryana, India',
    rating: 4.7,
    reviewsCount: 65,
    nutrition: { calories: 900, protein: '0g', carbs: '0g', fat: '99.8g', fiber: '0g' },
    isAvailable: true
  },
  {
    name: 'Coriander Powder (Dhania)',
    price: 110,
    category: 'Spices & Herbs',
    weight: '250g',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f8300f7?auto=format&fit=crop&q=80&w=800',
    description: 'Coarsely ground fresh coriander seeds, capturing the perfect citrusy and nutty essence.',
    sourcing: 'Rajasthan, India',
    rating: 4.8,
    reviewsCount: 110,
    nutrition: { calories: 298, protein: '12g', carbs: '55g', fat: '17g', fiber: '41g' },
    isAvailable: true
  },
  {
    name: 'Organic Quinoa',
    price: 399,
    category: 'Grains & Staples',
    weight: '500g',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
    description: 'Premium white quinoa, completely gluten-free and packed with essential amino acids. An excellent rice alternative.',
    sourcing: 'Andes inspired, grown in Uttarakhand',
    rating: 4.9,
    reviewsCount: 142,
    nutrition: { calories: 120, protein: '4.4g', carbs: '21.3g', fat: '1.9g', fiber: '2.8g' },
    isAvailable: true
  },
  {
    name: 'Multiflora Raw Honey',
    price: 299,
    category: 'Honey & Sweeteners',
    weight: '500g',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=800',
    description: 'A delicate and sweet raw honey, harvested from bees pollinating diverse wild flora. Naturally crystallized over time.',
    sourcing: 'Himalayan Foothills',
    rating: 4.8,
    reviewsCount: 201,
    nutrition: { calories: 304, protein: '0.3g', carbs: '82.4g', fat: '0g', fiber: '0.2g' },
    isAvailable: true
  },
  {
    name: 'Organic Brown Sugar',
    price: 149,
    category: 'Honey & Sweeteners',
    weight: '1kg',
    image: 'https://images.unsplash.com/photo-1604487550833-e3c1a235290c?auto=format&fit=crop&q=80&w=800',
    description: 'Unrefined brown sugar retaining natural molasses. A healthier baking and sweetening option.',
    sourcing: 'Maharashtra, India',
    rating: 4.7,
    reviewsCount: 92,
    nutrition: { calories: 380, protein: '0.1g', carbs: '98g', fat: '0g', fiber: '0g' },
    isAvailable: true
  },
  {
    name: 'Organic Poha (Flattened Rice)',
    price: 85,
    category: 'Grains & Staples',
    weight: '500g',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
    description: 'Thick, wholesome organic poha made from unpolished rice. Excellent for a light, healthy Indian breakfast.',
    sourcing: 'Madhya Pradesh',
    rating: 4.8,
    reviewsCount: 173,
    nutrition: { calories: 346, protein: '6.6g', carbs: '77.3g', fat: '1.2g', fiber: '2.2g' },
    isAvailable: true
  },
  {
    name: 'Cold Pressed Sesame Oil (Til Oil)',
    price: 499,
    category: 'Ghee & Oils',
    weight: '1 Litre',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800',
    description: 'Traditional wood-pressed sesame oil. Highly aromatic and perfect for traditional cooking, pickles, and massage.',
    sourcing: 'Tamil Nadu',
    rating: 4.9,
    reviewsCount: 104,
    nutrition: { calories: 884, protein: '0g', carbs: '0g', fat: '100g', fiber: '0g' },
    isAvailable: true
  },
  {
    name: 'Dried Fig (Anjeer)',
    price: 849,
    category: 'Nuts & Seeds',
    weight: '500g',
    image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800',
    description: 'Premium quality Afghani dried figs. Naturally sweet, chewy, and an excellent source of dietary fiber.',
    sourcing: 'Imported from Afghanistan, Packed in India',
    rating: 4.8,
    reviewsCount: 88,
    nutrition: { calories: 249, protein: '3.3g', carbs: '63.9g', fat: '0.9g', fiber: '9.8g' },
    isAvailable: true
  }
]

async function main() {
  console.log('Adding 15 additional products to ensure we have >20 total...')
  
  for (const p of additionalProducts) {
    const exists = await prisma.product.findFirst({
      where: { name: p.name }
    })
    
    if (!exists) {
      await prisma.product.create({
        data: p
      })
      console.log(`Created product: ${p.name}`)
    } else {
      console.log(`Product already exists: ${p.name}`)
    }
  }
  
  const total = await prisma.product.count()
  console.log(`Total products in database: ${total}`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
