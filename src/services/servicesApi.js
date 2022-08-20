import { apiSettings } from './settings';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const { BASE_URL } = apiSettings;
axios.defaults.baseURL = BASE_URL;

async function fetchHeroes() {
  try {
    const { data } = await axios.get(`/api/heroes`);
    return data;
  } catch (error) {
    throw error;
  }
}

async function addHero(newHero) {
  for (let pair of newHero.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
  }
  try {
    const { data } = axios.post('/api/heroes', newHero);
    return data;
  } catch (error) {
    throw error;
  }
}

async function deleteHero(id) {
  try {
    const { data } = axios.delete(`/api/heroes/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

const api = {
  fetchHeroes,
  addHero,
  deleteHero,
};

export default api;
