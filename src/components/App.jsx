import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderView } from '../views/HeaderView';
import { ListView } from '../views/ListView';

export const App = () => {
  return (
    <>
      <HeaderView />
      <ListView />
    </>
  );
};
