import styles from './HeaderView.module.css';
import { Container } from '../../components/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { HeroesList } from '../../components/HeroesList';
import heroesAPI from '../../services/servicesApi';

import { useState } from 'react';
import { AddForm } from '../../components/Forms/AddForm';

export const HeaderView = () => {
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
