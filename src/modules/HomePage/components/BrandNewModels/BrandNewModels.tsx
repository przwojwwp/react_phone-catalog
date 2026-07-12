import { ProductCard } from '@/shared/components/ProductCard/ProductCard';
import styles from './BrandNewModels.module.scss';

export const BrandNewModels = ({ products }: { products: Product[] }) => {
  return (
    <section className={styles.brandNewModels}>
      <header>
        <h2>
          Brand new <br />
          models
        </h2>
        <div>left | right</div>
      </header>
      <ProductCard products={products} />
    </section>
  );
};
