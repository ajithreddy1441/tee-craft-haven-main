
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  ShoppingCart, 
  Eye,
  Star,
  StarHalf
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={16} className="fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf size={16} className="fill-yellow-400 text-yellow-400" />}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={`empty-${i}`} size={16} className="text-gray-300" />
        ))}
      </div>
    );
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity: 1
    });
  };

  const handleFavoriteToggle = () => {
    toggleFavorite({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <Card className="product-card overflow-hidden h-full flex flex-col">
      <div className="relative pt-[100%] overflow-hidden bg-accent">
        <img 
          src={product.image} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={handleFavoriteToggle}
          >
            <Heart 
              size={20} 
              className={cn(
                "transition-colors",
                isFavorite(product.id) ? "fill-red-500 text-red-500" : "text-foreground"
              )} 
            />
          </Button>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 quick-view transition-opacity">
          <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" className="rounded-full px-4 py-2 bg-background/80 backdrop-blur-sm hover:bg-background/90">
                <Eye size={16} className="mr-2" />
                Quick View
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{product.name}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="col-span-4 w-full h-60 object-cover rounded-md"
                  />
                </div>
                <div className="text-left">
                  <p className="text-muted-foreground mb-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-bold text-xl">${product.price.toFixed(2)}</p>
                    <div className="flex items-center gap-1">
                      {renderRatingStars(product.rating)}
                      <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium leading-none">Size</label>
                      <Select value={selectedSize} onValueChange={setSelectedSize}>
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select a size" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.sizes.map(size => (
                            <SelectItem key={size} value={size}>{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium leading-none">Color</label>
                      <Select value={selectedColor} onValueChange={setSelectedColor}>
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select a color" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.colors.map(color => (
                            <SelectItem key={color} value={color}>
                              <div className="flex items-center">
                                <div 
                                  className="w-4 h-4 rounded-full mr-2" 
                                  style={{ backgroundColor: color }}
                                />
                                <span className="capitalize">{color}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleFavoriteToggle}
                >
                  <Heart 
                    size={16} 
                    className={cn(
                      "mr-2",
                      isFavorite(product.id) ? "fill-red-500 text-red-500" : ""
                    )} 
                  />
                  {isFavorite(product.id) ? 'Saved' : 'Save'}
                </Button>
                <Button onClick={() => {
                  handleAddToCart();
                  setIsQuickViewOpen(false);
                }}>
                  <ShoppingCart size={16} className="mr-2" />
                  Add to Cart
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <CardContent className="flex-grow p-4 text-left">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
          <span className="font-semibold">${product.price.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-1 mb-2">
          {renderRatingStars(product.rating)}
          <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full"
        >
          <ShoppingCart size={16} className="mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
