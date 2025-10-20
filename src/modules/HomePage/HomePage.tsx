import styles from './HomePage.module.scss';

import { PicturesSlider } from './components/PicturesSlider';

export const HomePage = () => {
  return (
    <>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      <h1 className="visually-hidden">Product Catalog</h1>

      <PicturesSlider />
    </>
  );
};
