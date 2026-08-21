import styles from './ProductList.module.scss';
import { ProductCard } from './components/ProductCard';
import { useEffect, useRef } from 'react';

interface ProductListProps {
  products: Product[];
  index: number;
  onVisibleCardsChange: (count: number) => void;
}

export const ProductList = ({
  products,
  index,
  onVisibleCardsChange,
}: ProductListProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const gap = 16;
  const cardWidth = 212;

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    const observer = new ResizeObserver(entries => {
      const width = entries[0].contentRect.width;

      const visibleCards = Math.max(1, Math.floor(width / (cardWidth + gap)));

      onVisibleCardsChange(visibleCards);
    });

    observer.observe(wrapper);

    return () => {
      observer.disconnect();
    };
  }, [onVisibleCardsChange]);

  const offset = index * (cardWidth + gap);

  return (
    <div ref={wrapperRef} className={styles['list-wrapper']}>
      <ul
        className={styles.list}
        style={{ transform: `translateX(-${offset}px)` }}
      >
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};
