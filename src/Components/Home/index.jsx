import React, { useState, useEffect, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Card from "../Card";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?fit=crop",
    alt: "Modern house with books",
  },
  {
    src: "https://images.unsplash.com/photo-1512820790803-83ca734da794?fit=crop",
    alt: "Stack of books on table",
  },
  {
    src: "https://images.unsplash.com/photo-1532012197267-da84d127e765?fit=crop",
    alt: "Open book with glasses",
  },
  {
    src: "https://images.unsplash.com/photo-1526243741027-444d633d7365?fit=crop",
    alt: "Bookshelf in library",
  },
  {
    src: "https://images.unsplash.com/photo-1509266272358-7701da638078?fit=crop",
    alt: "Books with coffee cup",
  },
  {
    src: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?fit=crop",
    alt: "Person reading book",
  },
  {
    src: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?fit=crop",
    alt: "Old books in library",
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlide = true;
  const autoSlideInterval = 5000;
  const slideIntervalRef = useRef(null);

  const goToSlide = (index) => setCurrentIndex(index);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (!autoSlide) return;

    slideIntervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, autoSlideInterval);

    return () => clearInterval(slideIntervalRef.current);
  }, [autoSlide, autoSlideInterval]);

  return (
    <section className="relative w-full flex flex-col items-center justify-center text-white">
      <div className="relative w-full mx-auto overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] shadow-2xl">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center relative"
            >
              <LazyLoadImage
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover opacity-80"
                effect="blur"
                placeholderSrc={`${slide.src}&q=10`}
              />
            </div>
          ))}
        </div>
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-4 sm:left-6 transform -translate-y-1/2 bg-gray-500 text-white p-2 sm:p-3 rounded-full"
          aria-label="Previous slide"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 sm:right-6 transform -translate-y-1/2 bg-gray-500 text-white p-2 sm:p-3 rounded-full"
          aria-label="Next slide"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="mt-6 sm:mt-8">
        <Card />
      </div>
    </section>
  );
};

export default Home;