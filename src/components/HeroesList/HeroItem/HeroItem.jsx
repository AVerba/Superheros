import styles from './HeroItem.module.css';
import propTypes from 'prop-types';
import commonImage from '../../ui/images/commonImage.png';
import { ReactComponent as HeroItemLogo } from '../../ui/images/hero.svg';
import { useState } from 'react';
import { ModalCard } from '../../Modal';

export const HeroItem = ({ id, poster: imageURL, name }) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <li className={styles.item} key={id}>
      <div className={styles.image}>
        {imageURL !== null ? (
          <img
            alt={name}
            className={styles.itemImage}
            loading="lazy"
            src={`https://super-heroes-api-ua.herokuapp.com/${imageURL}`}
          />
        ) : (
          <img
            className={styles.itemImage}
            src={commonImage}
            alt="no poster"
            loading="lazy"
          />
        )}
        <div
          className={styles.overlay}
          onClick={() => {
            setModalShow(true);
          }}
        >
          <p className={styles.overlayTitle}>Show more details</p>
          <div className={styles.icon}>
            <HeroItemLogo fill="#00000" />
          </div>
        </div>
      </div>
      <div className={styles.name}>
        <h3 className={styles.name}>{name}</h3>
      </div>
      <ModalCard show={modalShow} id={id} onHide={() => setModalShow(false)} />
    </li>
  );
};

HeroItem.propTypes = {
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  imageURL: propTypes.string,
};
