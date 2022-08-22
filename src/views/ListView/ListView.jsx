import styles from './ListView.module.css';
import { HeroesList } from '../../components/HeroesList';
import { Container } from '../../components/Container';

export const ListView = () => {
  return (
    <Container>
      <HeroesList />
    </Container>
  );
};
