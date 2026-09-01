import { useEffect, useState } from 'react';
import { ArrowButton } from '../ArrowButton';
import { ProductList } from '../ProductList';
import styles from './ProductSlider.module.scss';

type ProductSliderProps = {
  title: React.ReactNode;
  products: Product[];
  hotPrice?: boolean;
};

export const ProductSlider = ({
  title,
  products,
  hotPrice,
}: ProductSliderProps) => {
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);

  const maxIndex = Math.max(0, products.length - visibleCards);

  useEffect(() => {
    setIndex(current => Math.min(current, maxIndex));
  }, [maxIndex]);

  const handlePrev = () => {
    setIndex(current => Math.max(0, current - visibleCards));
  };

  const handleNext = () => {
    setIndex(current => Math.min(maxIndex, current + visibleCards));
  };

  return (
    <section>
      <header className={styles['section-header']}>
        <h2>{title}</h2>

        <div className={styles.controls}>
          <ArrowButton
            direction="left"
            ariaLabel="Previous products"
            disabled={index === 0}
            onClick={handlePrev}
          />

          <ArrowButton
            direction="right"
            ariaLabel="Next products"
            disabled={index >= maxIndex}
            onClick={handleNext}
          />
        </div>
      </header>

      <ProductList
        products={products}
        index={index}
        onVisibleCardsChange={setVisibleCards}
        hotPrice={hotPrice}
      />
    </section>
  );
};
