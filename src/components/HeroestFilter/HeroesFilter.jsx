import styles from './HeroesFilter.module.css';
import { useSelector, useDispatch } from 'react-redux';

import { setFilter, getFilter } from '../../redux/heroes/heroesSlice';

import Form from 'react-bootstrap/Form';

export const HeroesFilter = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector(getFilter);

  return (
    <Form className={styles.searchForm}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={e => dispatch(setFilter(e.currentTarget.value))}
        />
      </Form.Group>
    </Form>
  );
};
