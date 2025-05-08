
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  colors?: string[];
  sizes?: string[];
  isNewArrival?: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: "product_1",
    name: "Organic Cotton T-Shirt",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop",
    category: "clothing",
    description: "Made from 100% organic cotton, this classic t-shirt features a regular fit and a smooth, soft touch. Ethically produced and environmentally friendly.",
    colors: ["Black", "White", "Sage Green"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNewArrival: true,
    isFeatured: true
  },
  {
    id: "product_2",
    name: "Hemp Relaxed Pants",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop",
    category: "clothing",
    description: "These relaxed hemp pants are lightweight and breathable, perfect for any casual occasion. Features a comfortable elastic waistband and two side pockets.",
    colors: ["Natural", "Navy", "Olive"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isFeatured: true
  },
  {
    id: "product_3",
    name: "Recycled Wool Cardigan",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop",
    category: "clothing",
    description: "Knitted from recycled wool blend, this cardigan offers warmth without sacrificing style. Features a relaxed silhouette and front button closure.",
    colors: ["Oatmeal", "Charcoal", "Forest"],
    sizes: ["S", "M", "L", "XL"],
    isNewArrival: true
  },
  {
    id: "product_4",
    name: "Linen Button-Up Shirt",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1598961942613-ba897716405b?w=800&auto=format&fit=crop",
    category: "clothing",
    description: "Crafted from premium European linen, this button-up shirt offers a breathable, comfortable fit for warm weather. Features a classic collar and relaxed fit.",
    colors: ["White", "Sky Blue", "Terracotta"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    isFeatured: true
  },
  {
    id: "product_5",
    name: "Merino Wool Beanie",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&auto=format&fit=crop",
    category: "accessories",
    description: "Stay warm in sustainable style. This beanie is made from soft, ethically sourced merino wool that's both warm and breathable.",
    colors: ["Black", "Gray", "Burgundy"],
    sizes: ["One Size"],
    isNewArrival: true
  },
  {
    id: "product_6",
    name: "Cork Minimalist Wallet",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop",
    category: "accessories",
    description: "A sustainable alternative to leather, this cork wallet features a slim design with space for essential cards and cash.",
    colors: ["Natural", "Black"],
    isFeatured: true
  },
  {
    id: "product_7",
    name: "Tencel Denim Jacket",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=800&auto=format&fit=crop",
    category: "clothing",
    description: "This modern take on a classic denim jacket is made from Tencel, a sustainable fabric crafted from wood pulp. Features a relaxed fit and front button closure.",
    colors: ["Light Wash", "Medium Wash", "Dark Wash"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNewArrival: true
  },
  {
    id: "product_8",
    name: "Recycled Canvas Tote",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=800&auto=format&fit=crop",
    category: "accessories",
    description: "This durable tote is made from 100% recycled canvas. Perfect for shopping, beach days, or as an everyday carry-all.",
    colors: ["Natural", "Black", "Sage Green"],
    isFeatured: true
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNewArrival);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
