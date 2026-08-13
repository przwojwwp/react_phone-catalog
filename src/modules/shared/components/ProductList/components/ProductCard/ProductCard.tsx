import styles from './ProductCard.module.scss';
import HeartIcon from '@/assets/icons/heart.svg?react';

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <li key={product.id} className={styles.item}>
      <img
        src={`${product.image}`}
        alt={product.name}
        className={styles.image}
      />
      <h3 className={styles.name}>{product.name}</h3>

      <p className={styles.price}>${product.price}</p>

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
