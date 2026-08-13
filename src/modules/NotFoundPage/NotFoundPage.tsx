import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <section className={styles['not-found-page']}>
      <h1>Page not found</h1>
      {/* <img
        className={styles['page-not-found-image']}
        src="public/img/page-not-found.png"
        alt="Page not found"
      /> */}
    </section>
  );
};
