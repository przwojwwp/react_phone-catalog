import styles from './ProductList.module.scss';
import { ProductCard } from './components/ProductCard';

export const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <ul className={styles.list}>
      {products.slice(0, 5).map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
};
