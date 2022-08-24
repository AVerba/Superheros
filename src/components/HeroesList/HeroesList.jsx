import styles from './HeroesList.module.css';
import { HeroItem } from './HeroItem';
import { useSelector } from 'react-redux';
import { useGetHeroesQuery } from '../../redux/heroes/heroesApi';
import { getFilter } from '../../redux/heroes/heroesSlice';
import { Title } from '../ui/Title';

export const HeroesList = () => {
  const { data: heroes, isLoading } = useGetHeroesQuery();
  const { filter } = useSelector(getFilter);

  const filteredHeroes = () => {
    return heroes.filter(hero =>
      hero.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  let renderedData = filter === '' ? heroes : filteredHeroes();
  const renderList = (
    <>
      <Title
        className={styles.title}
        title={"Here you are! It's your superheroes list"}
      />
      <ul className={styles.heroesList}>
        {heroes &&
          renderedData.map(item => (
            <HeroItem
              key={item._id}
              id={item._id}
              name={item.nickname}
              poster={item.imageURL}
            />
          ))}
      </ul>
    </>
  );

  return isLoading ? (
    <Title className={styles.title} title={'Loading...'} />
  ) : heroes.length !== 0 ? (
    renderList
  ) : (
    <Title
      className={styles.title}
      title={'We are sorry but toy have not any heroes'}
    />
  );
};
