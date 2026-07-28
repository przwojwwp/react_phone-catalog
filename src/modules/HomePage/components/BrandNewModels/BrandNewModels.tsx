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
        <div aria-hidden="true" />
      </header>
      <ProductCard products={products} />
    </section>
  );
};
