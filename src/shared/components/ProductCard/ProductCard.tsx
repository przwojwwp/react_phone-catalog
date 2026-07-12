import styles from './ProductCard.module.scss';

export const ProductCard = ({ products }: { products: Product[] }) => {
  return (
    <ul className={styles.list}>
      {products.slice(0, 5).map(product => (
        <li
          key={product.id}
          className={styles.item}
          style={{
            height: 439,
            width: 212,
            listStyle: 'none',
            padding: 32,
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
            border: '1px solid ${color-light-border}',
            gap: 8,
            borderRadius: 8,
          }}
        >
          <img
            src={`${product.image}`}
            alt={product.name}
            style={{
              width: 148,
              height: 129,
              objectFit: 'contain',
            }}
          />

          <h3
            style={{
              fontFamily: 'Mont',
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '21px',
              letterSpacing: 0,
            }}
          >
            {product.name}
          </h3>

          <p>${product.price}</p>

          <dl className={styles.specs}>
            <div>
              <dt>Screen</dt>
              <dd>{product.screen}</dd>
            </div>

            <div>
              <dt>Capacity</dt>
              <dd>{product.capacity}</dd>
            </div>

            <div>
              <dt>RAM</dt>
              <dd>{product.ram}</dd>
            </div>
          </dl>
          <footer className={styles.actions}>
            <button type="button">Add to cart</button>
            <button
              type="button"
              aria-label={`Add ${product.name} to favourites`}
            >
              ♡
            </button>
          </footer>
        </li>
      ))}
    </ul>
  );
};
