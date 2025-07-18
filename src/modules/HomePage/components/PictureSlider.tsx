import { useEffect, useState } from 'react';

import cn from 'classnames';
import styles from './PictureSlider.module.scss';

const images = [
  '/img/banner-home-page-1.png',
  '/img/banner-home-page-1.png',
  '/img/banner-home-page-1.png',
];

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
    <div className={styles['pictures-slider']}>
      <div
        className={styles['slider-track']}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div className={styles.slide} key={i}>
            <img src={src} alt={`slide=${i}`} />
          </div>
        ))}
      </div>
      <div className={styles.dots}>
        {images.map((_, i) => (
          <button
            key={i}
            className={cn(styles.dot, { [styles.active]: i === index })}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
};
