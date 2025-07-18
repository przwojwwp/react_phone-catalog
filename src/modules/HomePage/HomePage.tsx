// import styles from './HomePage.module.scss';

import { PictureSlider } from './components/PictureSlider';

export const HomePage = () => {
  return (
    <>
      <h1>Welcome to Nice Gadgets store!</h1>
      <h1 className="visually-hidden">Product Catalog</h1>

      <PictureSlider />

      {/* <div className={styles['banner-carousel-container']}>
        <div className={styles['banner-carousel-track']}>
          <div className={styles['banner-carousel-cell']}>1</div>
          <div className={styles['banner-carousel-cell']}>2</div>
          <div className={styles['banner-carousel-cell']}>3</div>
        </div>
        <button className={styles['banner-carousel-button prev']}>←</button>
        <button className={styles['banner-carousel-button next']}>→</button>
      </div> */}
    </>
  );
};
