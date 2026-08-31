import { ArrowButton } from '@/modules/shared/components/ArrowButton';
import { ProductList } from '@/modules/shared/components/ProductList/ProductList';

import styles from './HotPrices.module.scss';
import { useState, useEffect } from 'react';

export const HotPrices = ({ products }: { products: Product[] }) => {
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
        <h2>Hot prices</h2>

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
        hotPrice
      />
    </section>
  );
};
