import styles from './ProductList.module.scss';
import { ProductCard } from './components/ProductCard';
import { useEffect, useRef } from 'react';

interface ProductListProps {
  products: Product[];
  index: number;
  onVisibleCardsChange: (count: number) => void;
  hotPrice?: boolean;
}

export const ProductList = ({
  products,
  index,
  onVisibleCardsChange,
  hotPrice = false,
}: ProductListProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const gap = 16;
  const cardWidth = 212;

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    const observer = new ResizeObserver(entries => {
      const width = entries[0].contentRect.width;

      const visibleCards = Math.max(
        1,
        Math.floor((width + gap) / (cardWidth + gap)),
      );

      onVisibleCardsChange(visibleCards);
    });

    observer.observe(wrapper);

    return () => {
      observer.disconnect();
    };
  }, [onVisibleCardsChange]);

  const wrapperWidth = wrapperRef.current?.offsetWidth || 0;
  const listWidth = listRef.current?.scrollWidth || 0;

  const maxOffset = Math.max(0, listWidth - wrapperWidth);

  const offset = Math.min(index * (cardWidth + gap), maxOffset);

  return (
    <div ref={wrapperRef} className={styles['list-wrapper']}>
      <ul
        ref={listRef}
        className={styles.list}
        style={{ transform: `translateX(-${offset}px)` }}
      >
        {products.map(product => (
          <ProductCard key={product.id} product={product} hotPrice={hotPrice} />
        ))}
      </ul>
    </div>
  );
};
