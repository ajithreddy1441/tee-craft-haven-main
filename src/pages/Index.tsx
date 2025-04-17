
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/ProductGrid';
import { Palette, Paintbrush, ShoppingBag, Phone } from 'lucide-react';

const Index = () => {
  return (
    <div>
      {/* Hero section */}
      <section className="relative">
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Design Your Perfect T-Shirt</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Create custom designs or choose from our collection. Premium quality t-shirts delivered to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/customize">
                <Button size="lg" className="w-full sm:w-auto">
                  <Paintbrush size={18} className="mr-2" />
                  Design Your Own
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <a href="#products">
                  <ShoppingBag size={18} className="mr-2" />
                  Shop Collection
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Designs</h3>
              <p className="text-muted-foreground">
                Create your own unique t-shirt with our easy-to-use design tool.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">
                Soft, durable fabrics that feel great and last longer.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">
                Our team is always available to help with your orders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products section */}
      <section id="products" className="py-12">
        <ProductGrid />
      </section>

      {/* CTA section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to create your unique design?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-primary-foreground/80">
            Express your creativity with our easy-to-use customization tool.
            Perfect for individuals, teams, events, or gifts!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/customize">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Start Designing Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card text-card-foreground py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">sr</span>
                </div>
                <span className="font-bold text-xl ml-2">ssr prints</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Premium custom t-shirts for any occasion. Design your own or shop our collection.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><a href="#products" className="text-muted-foreground hover:text-foreground">All Products</a></li>
                <li><Link to="/customize" className="text-muted-foreground hover:text-foreground">Custom Design</Link></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Bulk Orders</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Gift Cards</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About Us</a></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Shipping Info</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Returns & Exchanges</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Size Guide</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2025 ssr prints. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
