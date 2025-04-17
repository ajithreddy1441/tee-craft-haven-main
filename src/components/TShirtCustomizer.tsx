
import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { 
  Upload, 
  Type, 
  Image as ImageIcon, 
  Trash2, 
  ShoppingCart,
  RotateCcw
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';

const colorOptions = [
  { name: 'White', value: 'white', bgColor: 'bg-white', textColor: 'text-black' },
  { name: 'Black', value: 'black', bgColor: 'bg-black', textColor: 'text-white' },
  { name: 'Navy', value: 'navy', bgColor: 'bg-blue-900', textColor: 'text-white' },
  { name: 'Red', value: 'red', bgColor: 'bg-red-600', textColor: 'text-white' },
  { name: 'Green', value: 'green', bgColor: 'bg-green-600', textColor: 'text-white' },
  { name: 'Gray', value: 'gray', bgColor: 'bg-gray-400', textColor: 'text-black' },
];

const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];

const TShirtCustomizer: React.FC = () => {
  const { toast } = useToast();
  const { addItem } = useCart();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // T-Shirt state
  const [color, setColor] = useState('white');
  const [size, setSize] = useState('L');
  
  // Text state
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState([24]);
  
  // Image state
  const [image, setImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState([50]);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB.",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleReset = () => {
    setText('');
    setTextColor('#000000');
    setFontSize([24]);
    removeImage();
    setImageSize([50]);
    setColor('white');
    setSize('L');
    
    toast({
      title: "Design reset",
      description: "Your custom design has been reset."
    });
  };
  
  const handleAddToCart = () => {
    // In a real app, you'd generate a preview image of the design
    // and handle custom t-shirt creation properly
    addItem({
      id: `custom-${Date.now()}`,
      name: "Custom Designed T-Shirt",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", // Placeholder
      size: size,
      color: color,
      quantity: 1
    });
    
    toast({
      title: "Added to cart",
      description: "Your custom design has been added to your cart!"
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Custom T-Shirt Designer</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview area */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Card className="overflow-hidden h-full">
            <CardContent className="p-0">
              <div className={`aspect-square relative flex items-center justify-center ${color === 'white' ? 'bg-gray-100' : 'bg-white'}`}>
                {/* T-shirt with selected color */}
                <div className={`w-3/4 h-4/5 relative flex items-center justify-center ${color === 'white' ? 'border border-gray-200' : ''}`}
                  style={{ backgroundColor: color }}>
                  
                  {/* Display uploaded image if exists */}
                  {image && (
                    <div 
                      style={{ 
                        maxWidth: `${imageSize[0]}%`,
                        maxHeight: `${imageSize[0]}%`
                      }}
                      className="absolute flex items-center justify-center"
                    >
                      <img 
                        src={image} 
                        alt="Uploaded design" 
                        className="max-w-full max-h-full" 
                      />
                    </div>
                  )}
                  
                  {/* Display custom text if exists */}
                  {text && (
                    <div className="absolute">
                      <p
                        style={{ 
                          color: textColor,
                          fontSize: `${fontSize[0]}px`,
                        }}
                        className="whitespace-pre-wrap text-center font-bold"
                      >
                        {text}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Design tools */}
        <div>
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="image">Image</TabsTrigger>
                  <TabsTrigger value="shirt">T-Shirt</TabsTrigger>
                </TabsList>
                
                {/* Text customization */}
                <TabsContent value="text">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="text-input">Your Text</Label>
                      <Textarea 
                        id="text-input"
                        placeholder="Enter your text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="text-color">Text Color</Label>
                      <div className="flex">
                        <input
                          id="text-color"
                          type="color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="w-12 h-10 rounded-l-md border border-r-0"
                        />
                        <Input
                          type="text"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="flex-1 rounded-l-none"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="font-size">Font Size</Label>
                        <span>{fontSize[0]}px</span>
                      </div>
                      <Slider
                        id="font-size"
                        value={fontSize}
                        min={12}
                        max={72}
                        step={1}
                        onValueChange={setFontSize}
                      />
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setText('')}
                      disabled={!text}
                    >
                      <Trash2 size={16} className="mr-2" />
                      Clear Text
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Image upload */}
                <TabsContent value="image">
                  <div className="space-y-4">
                    {!image ? (
                      <div className="border-2 border-dashed rounded-md p-6 text-center">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <div className="space-y-2">
                          <div className="flex justify-center">
                            <ImageIcon size={48} className="text-muted-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            PNG, JPG or GIF (max. 5MB)
                          </p>
                          <Label htmlFor="image-upload" className="cursor-pointer">
                            <Button>
                              <Upload size={16} className="mr-2" />
                              Upload Image
                            </Button>
                          </Label>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="border rounded-md p-4 text-center">
                          <img 
                            src={image} 
                            alt="Uploaded design" 
                            className="max-h-40 mx-auto mb-4" 
                          />
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={removeImage}
                          >
                            <Trash2 size={16} className="mr-2" />
                            Remove Image
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="image-size">Image Size</Label>
                            <span>{imageSize[0]}%</span>
                          </div>
                          <Slider
                            id="image-size"
                            value={imageSize}
                            min={10}
                            max={90}
                            step={1}
                            onValueChange={setImageSize}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                {/* T-shirt options */}
                <TabsContent value="shirt">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Color</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {colorOptions.map((option) => (
                          <Button
                            key={option.value}
                            type="button"
                            variant={color === option.value ? "default" : "outline"}
                            className={`h-auto py-2 ${option.bgColor} ${option.textColor}`}
                            onClick={() => setColor(option.value)}
                          >
                            {option.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Size</Label>
                      <div className="grid grid-cols-5 gap-2">
                        {sizeOptions.map((sizeOption) => (
                          <Button
                            key={sizeOption}
                            type="button"
                            variant={size === sizeOption ? "default" : "outline"}
                            onClick={() => setSize(sizeOption)}
                          >
                            {sizeOption}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <Separator className="my-6" />
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleReset}
                >
                  <RotateCcw size={16} className="mr-2" />
                  Reset Design
                </Button>
                <Button 
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={16} className="mr-2" />
                  Add to Cart
                </Button>
              </div>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Custom designed t-shirts are $39.99 each
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Text area component for the customizer
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

// Helper function from utils.ts
function cn(...inputs: (string | undefined)[]) {
  return inputs.filter(Boolean).join(" ");
}

export default TShirtCustomizer;
