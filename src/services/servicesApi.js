import { apiSettings } from './settings';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const { BASE_URL } = apiSettings;
axios.defaults.baseURL = BASE_URL;

const fetchHeroes = async () => {
  try {
    const response = await axios.get(`/api/heroes`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addHero = async newHero => {
  try {
    const { data } = axios.post('/api/heroes', newHero);
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteHero = async id => {
  try {
    axios.delete(`/api/heroes/${id}`);
  } catch (error) {
    throw error;
  }
};

const fetchHeroById = async id => {
  try {
    const response = await axios.get(`/api/heroes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const api = {
  fetchHeroes,
  addHero,
  deleteHero,
  fetchHeroById,
};

export default api;
