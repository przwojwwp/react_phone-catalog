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
        <div>
          {/* <button type="button" aria-label="Previous">
            <LeftIcon />
          </button>
          <button type="button" aria-label="Next">
            <NextIcon />
          </button> */}
        </div>
      </header>
      <ProductCard products={products} />
    </section>
  );
};
