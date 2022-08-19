import styles from './HeroesList.module.css';
import { Title } from '../ui/Title';

export const HeroesList = () => {
  return (
    <>
      <Title
        className={styles.title}
        title={"Here you are! it's your list of Superheroes!"}
      />
    </>
  );
};
