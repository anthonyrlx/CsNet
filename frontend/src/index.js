import api from './app/services/api';
import { createPops, createEnlaces } from './app/map/map';

async function fecthPops(){
  try {
    const { data } = await api.get('/pops');
    createPops(data);
    fecthEnlaces(data);
  } catch (error) {
    console.log(error);
  }
}

async function fecthEnlaces(pops){
  try {
    const { data } = await api.get('/enlaces');
    createEnlaces(data, pops);
  } catch (error) {
    console.log(error);
  }
}

fecthPops();