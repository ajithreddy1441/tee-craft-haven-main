
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  colors: string[];
  sizes: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Classic White Tee",
    description: "Simple, clean and versatile white t-shirt made from 100% organic cotton.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    colors: ["white", "black", "gray"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "2",
    name: "Urban Graphic Tee",
    description: "Express yourself with this bold graphic design printed on premium fabric.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.2,
    colors: ["black", "navy", "burgundy"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "3",
    name: "Vintage Logo Tee",
    description: "Retro design with our classic logo, perfect for casual everyday wear.",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    colors: ["gray", "blue", "green"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: "4",
    name: "Minimalist Pocket Tee",
    description: "Clean design with a subtle pocket detail for understated style.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.1,
    colors: ["white", "beige", "light blue"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "5",
    name: "Sports Performance Tee",
    description: "Breathable, moisture-wicking fabric designed for active lifestyles.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    colors: ["black", "red", "blue"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "6",
    name: "Artist Collaboration Tee",
    description: "Limited edition design created in collaboration with local artists.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    colors: ["white", "black"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "7",
    name: "Long Sleeve Basic Tee",
    description: "Comfortable long sleeve option for cooler weather.",
    price: 27.99,
    image: "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.3,
    colors: ["black", "white", "navy"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "8",
    name: "Striped Summer Tee",
    description: "Classic striped pattern perfect for summer days.",
    price: 25.99,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.4,
    colors: ["blue/white", "black/white", "red/white"],
    sizes: ["S", "M", "L", "XL"]
  }
];
