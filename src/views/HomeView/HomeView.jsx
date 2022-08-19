import styles from './HomeView.module.css';
import { Container } from '../../components/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { HeroesList } from '../../components/HeroesList';

import { useState } from 'react';
import { AddForm } from '../../components/Forms/AddForm';

export const HomeView = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <Container>
          <Button
            variant="primary"
            className={styles.addBtn}
            onClick={() => setModalShow(true)}
          >
            Add hero
          </Button>
          <AddForm show={modalShow} onHide={() => setModalShow(false)} />
        </Container>
      </header>
      <HeroesList />
    </>
  );
};
