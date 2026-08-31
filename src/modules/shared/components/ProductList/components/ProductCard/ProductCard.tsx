import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import HeartIcon from '@/assets/icons/heart.svg?react';

type ProductCardProps = {
  product: Product;
  hotPrice?: boolean;
};

export const ProductCard = ({
  product,
  hotPrice = false,
}: ProductCardProps) => {
  return (
    <li key={product.id} className={styles.item}>
      <Link to={`/products/${product.itemId}`}>
        <img
          src={`${product.image}`}
          alt={product.name}
          className={styles.image}
        />
      </Link>
      <h3 className={styles.name}>{product.name}</h3>

      <div className={styles.prices}>
        <span className={styles.price}>${product.price}</span>
        {hotPrice && (
          <span className={`${styles.price} ${styles['full-price']}`}>
            ${product.fullPrice}
          </span>
        )}
      </div>
      <hr className={styles.divider} aria-hidden="true" />

      <dl className={styles.specs}>
        <div className={styles.spec}>
          <dt>Screen</dt>
          <dd>{product.screen}</dd>
        </div>

        <div className={styles.spec}>
          <dt>Capacity</dt>
          <dd>{product.capacity}</dd>
        </div>

        <div className={styles.spec}>
          <dt>RAM</dt>
          <dd>{product.ram}</dd>
        </div>
      </dl>
      <footer className={styles.actions}>
        <button type="button" className={styles['add-to-cart-button']}>
          Add to cart
        </button>
        <button
          type="button"
          aria-label={`Add ${product.name} to favourites`}
          className={styles['favourite-button']}
        >
          <HeartIcon />
        </button>
      </footer>
    </li>
  );
};
