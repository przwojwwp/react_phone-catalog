import { useEffect, useState } from 'react';
import styles from './BrandNewModels.module.scss';

type Phone = {
  id: string;
  name: string;
  images: string[];
  priceDiscount: number;
  priceRegular: number;
  screen: string;
  capacity: string;
  ram: string;
};

export const BrandNewModels = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch('api/phones.json');
        const data = await response.json();

        setPhones(data);
      } catch (error) {
        console.error('Error fetching phones:', error);
      }
    };

    fetchPhones();
  }, []);

  return (
    <section className={styles.brandNewModels}>
      <header>
        <h2>
          Brand new <br />
          models
        </h2>
        <div>left | right</div>
      </header>
      <ul className={styles.list}>
        {phones.slice(0, 5).map(phone => (
          <li
            key={phone.id}
            className={styles.item}
            style={{
              height: 439,
              width: 212,
              listStyle: 'none',
              padding: 32,
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 8,
              borderRadius: 8,
            }}
          >
            <img
              src={`${phone.images[0]}`}
              alt={phone.id}
              style={{
                width: 129,
                height: 148,
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
              {phone.name}
            </h3>
            <p>
              ${phone.priceDiscount} ${phone.priceRegular}
            </p>
            <dl className={styles.specs}>
              <div>
                <dt>Screen</dt>
                <dd>{phone.screen}</dd>
              </div>

              <div>
                <dt>Capacity</dt>
                <dd>{phone.capacity}</dd>
              </div>

              <div>
                <dt>RAM</dt>
                <dd>{phone.ram}</dd>
              </div>
            </dl>
            <footer className={styles.actions}>
              <button type="button">Add to cart</button>
              <button
                type="button"
                aria-label={`Add ${phone.name} to favourites`}
              >
                ♡
              </button>
            </footer>
          </li>
        ))}
      </ul>
    </section>
  );
};
