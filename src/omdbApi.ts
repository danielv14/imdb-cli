const axios = require('axios');
import {FullItem, Item, SearchResultType} from './types/searchResult';

const API_KEY = process.env.API_KEY;
const BASE_URL = `http://www.omdbapi.com?apikey=${API_KEY}`;

export const searchByQuery = async (query: string): Promise<Item[]> => {
  const { data } = await axios.get(`${BASE_URL}&s=${query}`);
  return data.Search as Item[];
};

export const searchByQueryAndType = async (query: string, type: SearchResultType): Promise<Item[]> => {
  const { data } = await axios.get(`${BASE_URL}&s=${query}&type=${type}`);
  return data.Search as Item[];
};

export const getItemById = async (id: string): Promise<FullItem> => {
  const { data } = await axios.get(`${BASE_URL}&i=${id}`);
  return data as FullItem;
};

export const getItemsByIds = async (ids: string[]): Promise<FullItem[]> => {
  const items = await Promise.all(ids.map((id: string) => getItemById(id)));
  return items as FullItem[];
};
