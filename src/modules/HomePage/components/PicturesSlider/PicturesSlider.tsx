import cn from 'classnames';
import styles from './PicturesSlider.module.scss';
import { useInfinitySlider } from './hooks/useInfinitySlider';

const images = [
  '/img/banner-home-page-1.png',
  '/img/cart-is-empty.png',
  '/img/page-not-found.png',
];

export const PicturesSlider = () => {
  const {
    slides,
    index,
    withTransition,
    onTransitionEnd,
    goTo,
    activeDot,
    containerRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    dragOffset,
  } = useInfinitySlider({
    images,
    autoplayMs: 5000,
    startDot: 0,
  });

  return (
    <div
      ref={containerRef}
      className={styles['pictures-slider']}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      <div
        className={cn(styles['slider-track'], {
          [styles['no-transition']]: !withTransition,
        })}
        style={{
          transform: `translateX(calc(-${index * 100}% + ${dragOffset}px))`,
        }}
        onTransitionEnd={onTransitionEnd}
      >
        {slides.map((slide, i) => (
          <div key={slide.key} className={styles.slide}>
            <img src={slide.src} alt={`slide=${i}`} draggable={false} />
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
