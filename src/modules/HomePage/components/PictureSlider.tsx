import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './PictureSlider.module.scss';

const images = [
  '/img/banner-home-page-1.png',
  '/img/cart-is-empty.png',
  '/img/page-not-found.png',
];

type Slide = {
  key: string;
  src: string;
  clone?: 'head' | 'tail';
};

export const PictureSlider = () => {
  const length = images.length;

  const slides: Slide[] = useMemo(() => {
    if (!length) return [];

    return [
      {
        key: `clone-head-${images[images.length - 1]}`,
        src: `${images[images.length - 1]}`,
        clone: 'head',
      },
      ...images.map((src, i) => ({ key: `img-${i}-${src}`, src })),
      {
        key: `clone-tail-${images[0]}`,
        src: `${images[0]}`,
        clone: 'tail',
      },
    ];
  }, [length]);

  const [index, setIndex] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const normalizeIndex = useCallback(() => {
    if (!length) return;

    setWithTransition(false);
    setIndex(prev => {
      const dot = (((prev - 1) % length) + length) % length;
      return dot + 1;
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setWithTransition(true));
    });
  }, [length]);

  useEffect(() => {
    const start = () => {
      if (intervalRef.current !== null) return;
      intervalRef.current = window.setInterval(() => {
        setIndex(prev => prev + 1);
      }, 5000);
    };

    const stop = () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        normalizeIndex();
        start();
      }
    };

    start();
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      stop();
    };
  }, [normalizeIndex]);

  const onTransitionEnd = () => {
    if (!slides.length) return;

    if (index === slides.length - 1) {
      setWithTransition(false);
      setIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setWithTransition(true));
      });
    }

    if (index === 0) {
      setWithTransition(false);
      setIndex(length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setWithTransition(true));
      });
    }
  };

  const goTo = (i: number) => {
    setIndex(i + 1);
  };

  const activeDot = length ? (index - 1 + length) % length : 0;

  return (
    <div className={styles['pictures-slider']}>
      <div
        className={cn(styles['slider-track'], {
          [styles['no-transition']]: !withTransition,
        })}
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTransitionEnd={onTransitionEnd}
      >
        {slides.map((slide, i) => (
          <div key={slide.key} className={styles.slide}>
            <img src={slide.src} alt={`slide=${i}`} />
          </div>
        ))}
      </div>
      <div className={styles.dots}>
        {images.map((src, i) => (
          <span key={`dot-${i}-${src}`} className={styles['dot-container']}>
            <button
              className={cn(styles.dot, { [styles.active]: i === activeDot })}
              onClick={() => goTo(i)}
            />
          </span>
        ))}
      </div>
    </div>
  );
};
