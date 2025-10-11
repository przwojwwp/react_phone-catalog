import cn from 'classnames';
import styles from './PictureSlider.module.scss';
import { useInfinitySlider } from './hooks/useInfinitySlider';

const images = [
  '/img/banner-home-page-1.png',
  '/img/cart-is-empty.png',
  '/img/page-not-found.png',
];

export const PictureSlider = () => {
  const { slides, index, withTransition, onTransitionEnd, goTo, activeDot } =
    useInfinitySlider({
      images,
      autoplayMs: 5000,
      startDot: 0,
    });

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
