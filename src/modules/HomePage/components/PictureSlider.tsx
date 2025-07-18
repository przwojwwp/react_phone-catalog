import { useEffect, useState } from 'react';

const images = ['/img/banner-home-page-1.png'];

export const PictureSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goTo = (i: number) => {
    setIndex(i);
  };

  return (
    <div className="pictures-slider">
      <div
        className="slider-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div className="slide" key={i}>
            <img src={src} alt={`slide=${i}`} />
          </div>
        ))}
      </div>
      <div className="dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
};
