import { Link } from 'react-router-dom';

import styles from './ShopByCategory.module.scss';

export const ShopByCategory = ({ products }: { products: Product[] }) => {
  const phoneCount = products.filter(
    product => product.category === 'phones',
  ).length;
  const tabletCount = products.filter(
    product => product.category === 'tablets',
  ).length;
  const accessoryCount = products.filter(
    product => product.category === 'accessories',
  ).length;

  return (
    <section>
      <header className={styles['section-header']}>
        <h2>Shop by category</h2>
      </header>
      <div className={styles['category-container']}>
        <Link to="/category">
          <img
            src="/img/phones.png"
            className={styles['category-image']}
            alt="Phones"
          />
        </Link>
        <h3 className={styles['category-title']}>Phones</h3>
        <p className={styles['product-count']}>{phoneCount} products</p>
      </div>
      <div className={styles['category-container']}>
        <Link to="/category">
          <img
            src="/img/tablets.png"
            className={styles['category-image']}
            alt="Tablets"
          />
        </Link>
        <h3 className={styles['category-title']}>Tablets</h3>
        <p className={styles['product-count']}>{tabletCount} products</p>
      </div>
      <div className={styles['category-container']}>
        <Link to="/category">
          <img
            src="/img/accessories.png"
            className={styles['category-image']}
            alt="Accessories"
          />
        </Link>
        <h3 className={styles['category-title']}>Accessories</h3>
        <p className={styles['product-count']}>{accessoryCount} products</p>
      </div>
    </section>
  );
};
