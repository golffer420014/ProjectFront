import { useState, useEffect } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export default function Carousel({ slides }) {
  let [current, setCurrent] = useState(0);
  const delay = 5000;
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prevCurrent) =>
        prevCurrent === slides.length - 1 ? 0 : prevCurrent + 1
      );
    }, delay);
    return () => clearInterval(timer); // This is the cleanup function to clear the interval when the component unmounts
  }, [slides.length]);

  let previousSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  let nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition ease-out duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex-none w-full relative">
            <img src={slide.image} alt="" className="w-full" />
            {/* Adjust the following line as needed */}
            <div className="absolute inset-0 flex items-center justify-start ml-64 mb-64">
              <div className="bg-white p-2 border border-gray-200 rounded-lg">
                <p className="text-gray-800 text-xl lg:text-2xl">
                  <span className="block">{slide.header}</span>
                  <span className="block">{slide.desc}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-0 h-full w-full flex justify-between items-center px-10 text-white text-3xl">
        <button onClick={previousSlide}>
          <BsFillArrowLeftCircleFill />
        </button>
        <button onClick={nextSlide}>
          <BsFillArrowRightCircleFill />
        </button>
      </div>

      {/* <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {slides.map((_, index) => (
          <div
            onClick={() => setCurrent(index)}
            key={`circle${index}`}
            className={`rounded-full w-5 h-5 cursor-pointer ${
              index === current ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div> */}
    </div>
  );
}
