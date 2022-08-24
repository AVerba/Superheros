import styles from './ModalCard.module.css';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

import ImageLoader from '../ui/Loader/Loader';
import heroesAPI from '../../services/servicesApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteHeroMutation } from '../../redux/heroes/heroesApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { EditForm } from '../Forms/EditForm';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
export const ModalCard = props => {
  const [deleteHero, { isSuccess: successfullyDeleted }] =
    useDeleteHeroMutation();
  const [hero, setHero] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const { id } = props;

  useEffect(() => {
    setDeleteId(hero._id);
  }, [hero]);

  const fetchHeroById = id => {
    if (status === 'idle') {
      setStatus(Status.PENDING);
      heroesAPI
        .fetchHeroById(id)
        .then(results => {
          setHero(results);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    }
  };

  const deleteItem = event => {
    deleteHero(deleteId);
    if (successfullyDeleted) {
      props.onHide();
      Notify.success(`Hero deleted successfully`);
    }
  };

  fetchHeroById(id);
  return (
    <>
      {status === 'pending' ? <ImageLoader /> : null}
      {status === 'rejected' ? Notify.warning(`${error.message}`) : null}
      {status === 'resolved' ? (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <div className={styles.modalHeader}>
              <Modal.Title
                className={styles.modalTitle}
                id="contained-modal-title-vcenter"
              >
                {hero.nickname}
              </Modal.Title>
              <div className={styles.controls}>
                <Button
                  className={styles.edit}
                  onClick={() => {
                    setModalShow(true);
                    props.onHide();
                  }}
                >
                  <EditIcon />
                </Button>
                <Button onClick={event => deleteItem(event)}>
                  <DeleteIcon />
                </Button>
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <div className={styles.img}>
                <img
                  alt={hero.name}
                  src={`https://super-heroes-api-ua.herokuapp.com/${hero.imageURL}`}
                />
              </div>

              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  Name :<p>{hero.name}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  Nick name :<p>{hero.nickname}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description :<p>{hero.description}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  Superpowers :<p>{hero.superpowers}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  Catch phrase :<p>{hero.catchPhrase}</p>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      ) : null}
      <EditForm
        show={modalShow}
        hero={hero}
        id={id}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};
