import api from './app/services/api';
import './app/map/map';

const pops = [];
const enlaces = [];

async function fecthPops(){
  try {
    const { data } = await api.get('/pops');
    pops.push(...data);

  } catch (error) {
    console.log(error);
  }
}

async function fecthEnlaces(){
  try {
    const { data } = await api.get('/enlaces');
    enlaces.push(...data);
  } catch (error) {
    console.log(error);
  }
}



fecthPops()
fecthEnlaces()
setTimeout(() => console.log(pops, enlaces), 2000)