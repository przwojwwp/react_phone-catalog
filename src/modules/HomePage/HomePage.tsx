import { PicturesSlider } from './components/PicturesSlider';
import { BrandNewModels } from './components/BrandNewModels/BrandNewModels';
import { ShopByCategory } from './components/ShopByCategory/ShopByCategory';

import styles from './HomePage.module.scss';
import { useEffect, useState } from 'react';

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

  return (
    <>
      <h1 className="visually-hidden">Product Catalog</h1>
      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>
      <PicturesSlider />
      <BrandNewModels products={brandNewModels} />
      <ShopByCategory products={products} />
    </>
  );
};
