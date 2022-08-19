import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import styles from './App.module.css';
import { HomeView } from '../views/HomeView/HomeView';
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  return (
    <>
      <HomeView />
    </>
  );
};
