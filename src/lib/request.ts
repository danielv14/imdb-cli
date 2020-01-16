import axios from 'axios';
import querystringify from 'querystringify';

export const get = (url: string, params: object) =>
  axios.get(`${url}${querystringify.stringify(params, true)}`);
