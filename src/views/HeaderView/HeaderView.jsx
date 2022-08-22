import styles from './HeaderView.module.css';
import { Container } from '../../components/Container';
import Button from 'react-bootstrap/Button';

import { useState } from 'react';
import { AddForm } from '../../components/Forms/AddForm';
import { HeroesFilter } from '../../components/HeroestFilter';

export const HeaderView = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <Container>
          <div className={styles.headerRow}>
            <Button
              variant="primary"
              className={styles.addBtn}
              onClick={() => setModalShow(true)}
            >
              Add hero
            </Button>
            <AddForm show={modalShow} onHide={() => setModalShow(false)} />
            <HeroesFilter />
          </div>
        </Container>
      </header>
    </>
  );
};
