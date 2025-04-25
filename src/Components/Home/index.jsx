import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Card from "../Card";

const slides = [
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=400&fit=crop", alt: "Modern house with books" },
  { src: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=400&fit=crop", alt: "Stack of books on table" },
  { src: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=400&fit=crop", alt: "Open book with glasses" },
  { src: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=800&h=400&fit=crop", alt: "Bookshelf in library" },
  { src: "https://images.unsplash.com/photo-1509266272358-7701da638078?w=800&h=400&fit=crop", alt: "Books with coffee cup" },
  { src: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=400&fit=crop", alt: "Person reading book" },
  { src: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=800&h=400&fit=crop", alt: "Old books in library" },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlide = true;
  const autoSlideInterval = 5000;

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  const goToSlide = (index) => setCurrentIndex(index);

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  return (
    <section className="bg-gradient-to-b from-[#1A1A1A] to-[#2E2E2E]">
      <div className="relative w-full mx-auto overflow-hidden h-[250px] sm:h-[350px] lg:h-[450px]">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full h-[197px] sm:h-[350px] lg:h-[450px] flex items-center justify-center"
            >
              <LazyLoadImage
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover"
                effect="blur"
                placeholderSrc={`${slide.src}&q=10`}
              />
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-2 top-[45%] -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800/70 text-white flex items-center justify-center hover:bg-gray-800 transition-all text-lg sm:text-xl"
          aria-label="Previous Slide"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-[45%] -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800/70 text-white flex items-center justify-center hover:bg-gray-800 transition-all text-lg sm:text-xl"
          aria-label="Next Slide"
        >
          ❯
        </button>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5">
        </div>
      </div>
      <div className="mt-6">
        <Card />
      </div>
    </section>
  );
};

export default Home;
