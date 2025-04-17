
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { useCart } from '@/context/CartContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { products } from '@/data/products';

const Favorites: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();
  const { addItem } = useCart();

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: product.sizes[0], // Default to first size
        color: product.colors[0], // Default to first color
        quantity: 1
      });
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto bg-card rounded-lg p-8 shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Heart size={32} className="text-muted-foreground" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Your favorites list is empty</h2>
          <p className="text-muted-foreground mb-6">Save some products and they will appear here</p>
          <Link to="/">
            <Button>
              <ArrowLeft size={16} className="mr-2" />
              Explore Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Your Favorites</h1>
      <p className="text-muted-foreground mb-8">Products you've saved for later</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((item) => (
          <Card key={item.id} className="overflow-hidden h-full flex flex-col">
            <div className="relative pt-[100%] overflow-hidden bg-accent">
              <img 
                src={item.image} 
                alt={item.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-2 right-2 z-10">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
                  onClick={() => removeFavorite(item.id)}
                >
                  <Trash2 size={20} className="text-destructive" />
                </Button>
              </div>
            </div>
            <CardContent className="flex-grow p-4 text-left">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-lg">{item.name}</h3>
                <span className="font-semibold">${item.price.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button 
                onClick={() => handleAddToCart(item.id)} 
                className="w-full"
              >
                <ShoppingCart size={16} className="mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft size={16} className="mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Favorites;
