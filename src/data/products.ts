export type ProductCategory =
  | 'Leather Shoes'
  | 'Leather Bags'
  | 'Leather Belts'
  | 'Leather Wallets'
  | 'Leather Accessories'

export type Product = {
  id: string
  name: string
  category: ProductCategory
  shortDescription: string
  details: string
  price: number
  currency: 'USD' | 'EUR' | 'GBP'
  imageUrl: string
  tags?: string[]
}

export const productCategories: ProductCategory[] = [
  'Leather Shoes',
  'Leather Bags',
  'Leather Belts',
  'Leather Wallets',
  'Leather Accessories',
]

export const products: Product[] = [
  {
    id: 'oxford-shoes',
    name: 'Classic Oxford Shoes',
    category: 'Leather Shoes',
    shortDescription: 'Hand-finished leather with a clean, timeless silhouette.',
    details:
      'Crafted for daily elegance with premium grain leather, precise stitching, and a refined profile made to pair with both formal and smart-casual looks.',
    price: 189,
    currency: 'USD',
    imageUrl: '/images/products/shoes-01.svg',
    tags: ['Hand-finished', 'Premium grain'],
  },
  {
    id: 'weekender-bag',
    name: 'Weekender Travel Bag',
    category: 'Leather Bags',
    shortDescription: 'Spacious, structured, and designed for confident travel.',
    details:
      'A balanced blend of capacity and form. Reinforced handles, premium lining, and thoughtful compartments elevate every journey.',
    price: 260,
    currency: 'USD',
    imageUrl: '/images/products/bag-01.svg',
    tags: ['Structured', 'Travel-ready'],
  },
  {
    id: 'heritage-belt',
    name: 'Heritage Leather Belt',
    category: 'Leather Belts',
    shortDescription: 'A muted-gold buckle with a rich brown leather strap.',
    details:
      'Minimal, durable, and elegant. Built to keep its shape, with clean edges and a premium buckle finish for understated luxury.',
    price: 75,
    currency: 'USD',
    imageUrl: '/images/products/belt-01.svg',
    tags: ['Durable', 'Muted gold'],
  },
  {
    id: 'slim-wallet',
    name: 'Slim Bifold Wallet',
    category: 'Leather Wallets',
    shortDescription: 'Refined pockets for essentials—thin, strong, and polished.',
    details:
      'A compact silhouette with carefully placed card slots and an elegant fold—crafted to age beautifully over time.',
    price: 65,
    currency: 'USD',
    imageUrl: '/images/products/wallet-01.svg',
    tags: ['Slim', 'Everyday'],
  },
  {
    id: 'card-holder',
    name: 'Minimal Card Holder',
    category: 'Leather Accessories',
    shortDescription: 'Clean lines, soft edges, and a premium tactile finish.',
    details:
      'Designed for modern carry with a smooth profile, durable stitching, and a refined feel that complements any style.',
    price: 45,
    currency: 'USD',
    imageUrl: '/images/products/accessory-01.svg',
  },
  {
    id: 'crossbody-bag',
    name: 'City Crossbody Bag',
    category: 'Leather Bags',
    shortDescription: 'Elegant proportions with practical organization inside.',
    details:
      'A polished daily companion with premium leather, adjustable strap, and a subtle structure that stays refined all day.',
    price: 185,
    currency: 'USD',
    imageUrl: '/images/products/bag-02.svg',
    tags: ['Daily carry', 'Elegant'],
  },
  {
    id: 'loafer-shoes',
    name: 'Modern Leather Loafers',
    category: 'Leather Shoes',
    shortDescription: 'Comfort-first craftsmanship with a premium finish.',
    details:
      'A modern profile with a softer step—crafted with attention to comfort while keeping a clean, luxury-forward look.',
    price: 165,
    currency: 'USD',
    imageUrl: '/images/products/shoes-02.svg',
  },
  {
    id: 'stitched-belt',
    name: 'Stitched Dress Belt',
    category: 'Leather Belts',
    shortDescription: 'Precision stitching for a sharper, more formal look.',
    details:
      'Subtle stitching details and a refined buckle. Built to elevate formal outfits with reliable durability.',
    price: 85,
    currency: 'USD',
    imageUrl: '/images/products/belt-02.svg',
  },
]
