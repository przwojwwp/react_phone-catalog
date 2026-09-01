import { PicturesSlider } from './components/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory';

import styles from './HomePage.module.scss';
import { useEffect, useState } from 'react';
import { ProductSlider } from '../shared/components/ProductSlider';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('api/products.json');
        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const latestYear = Math.max(...products.map(product => product.year));

  const brandNewModels = [...products].filter(
    product => product.year === latestYear,
  );

  // prettier-ignore
  const hotPrices = [...products].sort(
    (a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price),
  );

  return (
    <>
      <h1 className="visually-hidden">Product Catalog</h1>
      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>
      <PicturesSlider />
      <ProductSlider
        title={
          <>
            Brand New <br /> Models
          </>
        }
        products={brandNewModels}
      />
      <ShopByCategory products={products} />
      <ProductSlider title={<>Hot Prices</>} products={hotPrices} hotPrice />
    </>
  );
};
