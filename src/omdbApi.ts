const axios = require('axios');
import { FullItem, Item, SearchResultType } from './types/searchResult';
import { Season, Series } from './types/series';

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

export const getSeasonFromTitle = async (title: string, season: number) => {
  const { data } = await axios.get(`${BASE_URL}&t=${title}&Season=${season}`);
  return {
    title: data.Title,
    seasonNumber: data.Season,
    totalSeasons: data.totalSeasons,
    episodes: data.Episodes,
  } as Season;
};

export const getSeasonFromId = async (id: string, season: number) => {
  const { data } = await axios.get(`${BASE_URL}&i=${id}&Season=${season}`);
  return {
    title: data.Title,
    seasonNumber: data.Season,
    totalSeasons: data.totalSeasons,
    episodes: data.Episodes,
  } as Season;
};

export const getFullSeriesFromId = async (id: string) => {
    const { totalSeasons, title } = await getSeasonFromId(id, 1);
    const seasonAmount = parseInt(totalSeasons, 10);
    const seasonsPromises = [];
    for (let i = 1; i <= seasonAmount; i++) {
      seasonsPromises.push(getSeasonFromId(id, i));
   }
    const seasons = await Promise.all(seasonsPromises);
    return {
      title,
      totalSeasons,
      seasons,
    } as Series;
};

export const getFullSeriesFromTitle = async (title: string) => {
  const { totalSeasons, title: seriesTitle } = await getSeasonFromTitle(title, 1);
  const seasonAmount = parseInt(totalSeasons, 10);
  const seasonsPromises = [];
  for (let i = 1; i <= seasonAmount; i++) {
    seasonsPromises.push(getSeasonFromTitle(title, i));
 }
  const seasons = await Promise.all(seasonsPromises);
  return {
    title: seriesTitle,
    totalSeasons,
    seasons,
  } as Series;
};
