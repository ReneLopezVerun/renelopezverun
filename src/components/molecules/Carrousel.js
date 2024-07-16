import React, { useState } from "react";

const Carrousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"];

    const handlePrev = () => {
        setIsTransitioning(true);
        setTimeout(() => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? colors.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        setIsTransitioning(false);
        }, 500); // La duración de la transición
    };

    const handleNext = () => {
        setIsTransitioning(true);
        setTimeout(() => {
        const isLastSlide = currentIndex === colors.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setIsTransitioning(false);
        }, 500); // La duración de la transición
    };

  return (
        <div className="relative w-full h-screen overflow-hidden">
        {colors.map((color, index) => (
            <div
            key={index}
            className={`absolute w-full h-full ${color} ${isTransitioning ? "transition-transform duration-500" : ""}`}
            style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
            ></div>
        ))}
        <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md"
        >
            Prev
        </button>
        <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md"
        >
            Next
        </button>
        </div>
  );
};

export default Carrousel;
