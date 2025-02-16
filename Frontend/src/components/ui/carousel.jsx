import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";

import { cn } from "@/lib/utils";

const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

const Carousel = React.forwardRef(
  ({ opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, loop: true, align: "start" },
      plugins
    );

    React.useEffect(() => {
      if (!api) return;
      setApi?.(api);

      // Auto-slide every 3 seconds
      const autoplay = setInterval(() => {
        api.scrollNext();
      }, 3000);

      return () => clearInterval(autoplay);
    }, [api, setApi]);

    return (
      <CarouselContext.Provider value={{ carouselRef }}>
        <div ref={ref} className={cn("relative w-full", className)} {...props}>
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div ref={ref} className={cn("flex space-x-4", className)} {...props} />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("shrink-0", className)} {...props}/>
));
CarouselItem.displayName = "CarouselItem";

export { Carousel, CarouselContent, CarouselItem };
