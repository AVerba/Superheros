import styles from './ListView.module.css';
import { Title } from '../../components/ui/Title';
import { HeroesList } from '../../components/HeroesList';
import { useEffect, useState } from 'react';
import ImageLoader from '../../components/ui/Loader/Loader';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import heroesAPI from '../../services/servicesApi';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const ListView = () => {
  const [heroes, setHeroes] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

  const searchHeroes = () => {
    if (status === 'idle') {
      setStatus(Status.PENDING);
      const heroesRequest = heroesAPI.fetchHeroes();
      heroesRequest
        .then(data => {
          setHeroes(heroes => [...heroes, ...data]);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    }
  };

  useEffect(() => {
    searchHeroes();
  });

  return (
    <>
      <div className={styles.heroes}>
        {status === 'idle' ? (
          <Title
            className={styles.title}
            title={'We are sorry but toy have not any heroes'}
          />
        ) : null}

        {status === 'pending' ? <ImageLoader /> : null}

        {status === 'rejected' ? Notify.warning(`${error.message}`) : null}

        {status === 'resolved' ? (
          heroes.length > 0 ? (
            <>
              <Title
                className={styles.title}
                title={"Here you are! it's your list of Superheroes!"}
              />
              <HeroesList heroes={heroes} />
            </>
          ) : (
            <Title
              className={styles.title}
              title={'We are sorry but toy have not any heroes'}
            />
          )
        ) : null}
      </div>
    </>
  );
};
