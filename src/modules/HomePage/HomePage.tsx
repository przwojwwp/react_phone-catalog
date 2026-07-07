import { PicturesSlider } from './components/PicturesSlider';
import { BrandNewModels } from './components/BrandNewModels/BrandNewModels';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <>
      <h1 className="visually-hidden">Product Catalog</h1>
      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>
      <PicturesSlider />
      <BrandNewModels />
    </>
  );
};
