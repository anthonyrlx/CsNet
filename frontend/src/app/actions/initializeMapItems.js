import api from '../services/api';
import { createEnlaces, createPops } from '../map/map';
import handlePopOptionsClick from '../actions/pops/popAction';

async function fecthPops(){
  try {
    const { data } = await api.get('/pops');
    createPops(data, handlePopOptionsClick);
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

function initializeMapItems(){
  fecthPops();
}

export default initializeMapItems;