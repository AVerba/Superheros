import styles from './HeroesList.module.css';
import propTypes from 'prop-types';
import { HeroItem } from './HeroItem';
import { Container } from '../Container';

export const HeroesList = ({ heroes }) => {
  return (
    <Container>
      <ul className={styles.heroesList}>
        {heroes &&
          heroes.map(item => (
            <HeroItem
              key={item._id}
              id={item._id}
              name={item.nickname}
              poster={item.imageURL}
            />
          ))}
      </ul>
    </Container>
  );
};

HeroesList.propTypes = {
  movies: propTypes.arrayOf(
    propTypes.shape({
      item: propTypes.object,
    })
  ),
};
