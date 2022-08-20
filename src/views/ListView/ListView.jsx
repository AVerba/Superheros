import styles from './ListView.module.css';
import { Title } from '../../components/ui/Title';

export const ListView = () => {
  return (
    <>
      <Title
        className={styles.title}
        title={"Here you are! it's your list of Superheroes!"}
      />
    </>
  );
};
