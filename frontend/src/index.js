import api from './app/services/api';
import { createPops } from './app/map/map';

async function fecthPops(){
  try {
    const { data } = await api.get('/pops');
    createPops(data);
  } catch (error) {
    console.log(error);
  }
}

async function fecthEnlaces(){
  try {
    const { data } = await api.get('/enlaces');
    console.log(data)
  } catch (error) {
    console.log(error);
  }
}

fecthPops()
fecthEnlaces()