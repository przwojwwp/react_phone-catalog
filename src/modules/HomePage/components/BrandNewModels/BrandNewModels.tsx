import { ArrowButton } from '@/modules/shared/components/ArrowButton';
import { ProductList } from '@/modules/shared/components/ProductList/ProductList';

import styles from './BrandNewModels.module.scss';
import { useState, useEffect } from 'react';

export const BrandNewModels = ({ products }: { products: Product[] }) => {
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);

  const sortedProducts = [...products].sort((a, b) => a.price - b.price);

  const maxIndex = Math.max(0, sortedProducts.length - visibleCards);

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
        <h2>
          Brand new <br />
          models
        </h2>

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
        products={sortedProducts}
        index={index}
        onVisibleCardsChange={setVisibleCards}
      />
    </section>
  );
};
