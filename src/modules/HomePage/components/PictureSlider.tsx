import { useEffect, useState } from 'react';

import cn from 'classnames';
import styles from './PictureSlider.module.scss';

const images = [
  '/img/banner-home-page-1.png',
  '/img/cart-is-empty.png',
  '/img/page-not-found.png',
];

const adjustedImages = [...images, '/img/banner-home-page-1.png'];

export const PictureSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % adjustedImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (index !== adjustedImages.length - 1) return;

    const timeout = setTimeout(() => {
      setIndex(0);
    }, 700);

    return () => clearTimeout(timeout);
  }, [index]);

  const goTo = (i: number) => {
    setIndex(i);
  };

  return (
    <div className={styles['pictures-slider']}>
      <div
        className={cn(styles['slider-track'], {
          [styles['no-transition']]: index === 0,
        })}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {adjustedImages.map((src, i) => (
          <div className={styles.slide} key={i}>
            <img src={src} alt={`slide=${i}`} />
          </div>
        ))}
      </div>
      <div className={styles.dots}>
        {images.map((_, i) => (
          <button
            key={i}
            className={cn(styles.dot, {
              [styles.active]:
                i === index || (index === adjustedImages.length - 1 && i === 0),
            })}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
};
