import { ArrowButton } from '@/modules/shared/components/ArrowButton';
import { ProductList } from '@/modules/shared/components/ProductList/ProductList';

import styles from './BrandNewModels.module.scss';

export const BrandNewModels = ({ products }: { products: Product[] }) => {
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
            disabled
          />

          <ArrowButton direction="right" ariaLabel="Next products" />
        </div>
      </header>

      <ProductList products={products} />
    </section>
  );
};
