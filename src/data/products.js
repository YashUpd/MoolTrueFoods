const products = [
  {
    id: 1,
    name: 'Organic A2 Gir Cow Ghee',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1589733901241-5e391270fe0a?auto=format&fit=crop&q=80&w=800',
    category: 'Ghee & Oils',
    description: 'Traditionally prepared A2 Gir Cow Ghee using the ancient Bilona method. Made from the pure milk of free-grazing Gir cows, this ghee is packed with nutritious goodness, healthy fats, and a rich, granular texture that enhances digestions and boosts immunity.',
    sourcing: 'Directly sourced from trusted gaushalas in Rajasthan, India',
    weight: '500ml',
    rating: 4.9,
    reviewsCount: 142,
    nutrition: {
      calories: 900,
      protein: '0g',
      carbs: '0g',
      fat: '99.8g',
      fiber: '0g'
    }
  },
  {
    id: 2,
    name: 'Raw Wild Forest Honey',
    price: 649,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
    category: 'Honey & Sweeteners',
    description: '100% pure, raw, and unfiltered forest honey collected sustainably by tribal communities from wild beehives in dense forests. This honey is rich in natural antioxidants, enzymes, and pollen, and possesses unique floral hints representing forest biodiversity.',
    sourcing: 'Sustainably harvested from the Western Ghats forests',
    weight: '500g',
    rating: 4.8,
    reviewsCount: 96,
    nutrition: {
      calories: 304,
      protein: '0.3g',
      carbs: '82.4g',
      fat: '0g',
      fiber: '0.2g'
    }
  },
  {
    id: 3,
    name: 'Cold Pressed Mustard Oil',
    price: 249,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800',
    category: 'Ghee & Oils',
    description: 'Extracting mustard oil using a traditional wooden Kachi Ghani press preserves its natural nutrients, intense aroma, and pungent flavor. Our organic mustard oil is cholesterol-free and highly rich in heart-healthy monounsaturated fatty acids (MUFAs).',
    sourcing: 'Sourced from organic mustard farms in Madhya Pradesh',
    weight: '1 Litre',
    rating: 4.7,
    reviewsCount: 84,
    nutrition: {
      calories: 884,
      protein: '0g',
      carbs: '0g',
      fat: '100g',
      fiber: '0g'
    }
  },
  {
    id: 4,
    name: 'Organic Himalayan Pink Salt',
    price: 129,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800',
    category: 'Grains & Staples',
    description: 'Pure, unrefined Himalayan Pink Salt, hand-mined from ancient deposits at the foothills of the Himalayas. Containing 84 essential minerals and trace elements, it helps regulate water content in the body and acts as a healthier, mineral-dense alternative to table salt.',
    sourcing: 'Ethically mined from the salt ranges near the Himalayas',
    weight: '1kg',
    rating: 4.9,
    reviewsCount: 210,
    nutrition: {
      calories: 0,
      protein: '0g',
      carbs: '0g',
      fat: '0g',
      fiber: '0g',
      sodium: '38.8g'
    }
  },
  {
    id: 5,
    name: 'Organic Premium Basmati Rice',
    price: 279,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
    category: 'Grains & Staples',
    description: 'Long-grain, hand-selected, aromatic Basmati Rice aged naturally for over a year to achieve a rich aroma and fluffy, non-sticky texture. It is completely pesticide-free and grown using traditional organic farming techniques watered by freshwater mountain rivers.',
    sourcing: 'Grown in the fertile foothills of Uttarakhand',
    weight: '1kg',
    rating: 4.8,
    reviewsCount: 118,
    nutrition: {
      calories: 349,
      protein: '8.1g',
      carbs: '77.5g',
      fat: '0.6g',
      fiber: '2.2g'
    }
  },
  {
    id: 6,
    name: 'Premium Kashmiri Almonds',
    price: 899,
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=800',
    category: 'Nuts & Seeds',
    description: 'Pure, organic, small-sized Kashmiri almonds, famously known for their high oil content and naturally sweet flavor. High in protein, healthy fats, vitamins, and minerals, these nuts are perfect for supporting brain function, cardiac health, and skin texture.',
    sourcing: 'Harvested from certified almond orchards in Kashmir Valley',
    weight: '500g',
    rating: 4.9,
    reviewsCount: 176,
    nutrition: {
      calories: 579,
      protein: '21.2g',
      carbs: '21.7g',
      fat: '49.9g',
      fiber: '12.5g'
    }
  },
  {
    id: 7,
    name: 'Organic Lakadong Turmeric Powder',
    price: 159,
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f8300f7?auto=format&fit=crop&q=80&w=800',
    category: 'Spices & Herbs',
    description: 'Finely ground Lakadong Turmeric Powder, widely recognized for having the highest curcumin content (7-9%). Sourced directly from Meghalaya, it is chemical-free and extremely aromatic, delivering unmatched anti-inflammatory, antiseptic, and healing properties.',
    sourcing: 'Directly sourced from female farming cooperatives in Jaintia Hills, Meghalaya',
    weight: '250g',
    rating: 5.0,
    reviewsCount: 88,
    nutrition: {
      calories: 354,
      protein: '7.8g',
      carbs: '64.9g',
      fat: '9.9g',
      fiber: '21.1g'
    }
  },
  {
    id: 8,
    name: 'Raw Organic Chia Seeds',
    price: 229,
    image: 'https://images.unsplash.com/photo-1511225336969-923fbe2e68be?auto=format&fit=crop&q=80&w=800',
    category: 'Nuts & Seeds',
    description: 'Nutritious, organic raw Chia Seeds packed with high fiber, calcium, and essential Omega-3 fatty acids. Ideal for breakfast puddings, yogurt parfaits, or dynamic energy drinks, these tiny black seeds help promote gut health and weight management.',
    sourcing: 'Sourced from organic farming projects in South India',
    weight: '250g',
    rating: 4.6,
    reviewsCount: 65,
    nutrition: {
      calories: 486,
      protein: '16.5g',
      carbs: '42.1g',
      fat: '30.7g',
      fiber: '34.4g'
    }
  },
  {
    id: 9,
    name: 'Handmade Sugarcane Jaggery Blocks',
    price: 179,
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&q=80&w=800',
    category: 'Honey & Sweeteners',
    description: 'Delicious, completely unrefined organic sugarcane jaggery prepared in traditional iron cauldrons. Free from artificial sulfur and chemical clarifying agents, it acts as a mineral-rich alternative to refined white sugar.',
    sourcing: 'Sourced from organic sugarcane fields in Maharashtra',
    weight: '500g',
    rating: 4.8,
    reviewsCount: 112,
    nutrition: {
      calories: 383,
      protein: '0.4g',
      carbs: '95g',
      fat: '0.1g',
      fiber: '0g'
    }
  },
  {
    id: 10,
    name: 'Organic Green Cardamom Pods',
    price: 399,
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=800',
    category: 'Spices & Herbs',
    description: 'Premium bold (8mm) Green Cardamom Pods, hand-picked for their vibrant green shade, rich aroma, and natural oils. Completely free from artificial coloring or chemical treatments, it is ideal for chai, biryanis, and traditional Indian sweets.',
    sourcing: 'Harvested from certified organic spice gardens of Idukki, Kerala',
    weight: '100g',
    rating: 4.9,
    reviewsCount: 74,
    nutrition: {
      calories: 311,
      protein: '10.8g',
      carbs: '68.5g',
      fat: '6.7g',
      fiber: '28g'
    }
  }
]

export default products