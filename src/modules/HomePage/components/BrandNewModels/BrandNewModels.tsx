import { ArrowButton } from '@/shared/components/ArrowButton';
import { ProductCard } from '@/shared/components/ProductCard/ProductCard';

import styles from './BrandNewModels.module.scss';

export const BrandNewModels = ({ products }: { products: Product[] }) => {
  return (
    <section className={styles.brandNewModels}>
      <header className={styles['section-header']}>
        <h2>
          Brand new <br />
          models
        </h2>

        <div className={styles.controls}>
          <ArrowButton
            direction="left"
            ariaLabel="Previous products"
            disabled
          />

          <ArrowButton direction="right" ariaLabel="Next products" />
        </div>
      </header>

      <ProductCard products={products} />
    </section>
  );
};
