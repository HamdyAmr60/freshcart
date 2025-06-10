
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ProductCard from './ProductCard';

const ProductCarousel = ({ products, title = "Featured Products" }) => {
  return (
    <div className="w-full">
      {title && (
        <div className="flex justify-between items-baseline mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        </div>
      )}
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {products.map((product, index) => (
            <CarouselItem 
              key={product.id} 
              className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="animate-fade-in-up">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="btn-icon-enhanced -left-6 bg-white/90 hover:bg-white shadow-lg border-0 h-12 w-12">
          <ChevronLeft className="h-5 w-5" />
        </CarouselPrevious>
        
        <CarouselNext className="btn-icon-enhanced -right-6 bg-white/90 hover:bg-white shadow-lg border-0 h-12 w-12">
          <ChevronRight className="h-5 w-5" />
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
