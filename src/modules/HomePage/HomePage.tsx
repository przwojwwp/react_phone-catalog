// import styles from './HomePage.module.scss';

import { PictureSlider } from './components/Hero/PictureSlider';

export const HomePage = () => {
  return (
    <>
      <h1>Welcome to Nice Gadgets store!</h1>
      <h1 className="visually-hidden">Product Catalog</h1>

      <PictureSlider />
    </>
  );
};
