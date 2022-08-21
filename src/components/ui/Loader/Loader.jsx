import React from 'react';

import BounceLoader from 'react-spinners/BounceLoader';
import styles from './Loader.module.css';

function ImageLoader() {
  return (
    <div className={styles.spinner}>
      <div className={styles.loader}>
        <BounceLoader color={'#23967F'} loading={styles.loading} size={100} />
      </div>
    </div>
  );
}

export default ImageLoader;
