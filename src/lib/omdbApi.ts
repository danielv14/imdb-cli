import { FullItem, Item, SearchResultType } from '../types/searchResult';
import { Season, Series } from '../types/series';
import * as request from './request';

const API_KEY = process.env.API_KEY;
const BASE_URL = `http://www.omdbapi.com`;
const API_PARAM = {
  apikey: API_KEY,
};

interface RequestParams {
  s?: string;
  t?: string;
  type?: SearchResultType;
  i?: string;
  Season?: number;
}

const get = (params: RequestParams) => request.get(BASE_URL, { ...API_PARAM, ...params });

const getNumberOfSeasons = (title: string, amount: number) => {
  const seasonsPromises = [];
  for (let i = 1; i <= amount; i++) {
    seasonsPromises.push(getSeasonFromTitle(title, i));
 }
  return seasonsPromises;
};

const formatSeason = (data: any): Season => ({
  title: data.Title,
  seasonNumber: data.Season,
  totalSeasons: data.totalSeasons,
  episodes: data.Episodes,
});

export const searchByQuery = async (query: string): Promise<Item[]> => {
  const { data } = await get({s: query});
  return data.Search as Item[];
};

export const searchByQueryAndType = async (query: string, type: SearchResultType): Promise<Item[]> => {
  const { data } = await get({s: query, type});
  return data.Search as Item[];
};

export const getItemById = async (id: string): Promise<FullItem> => {
  const { data } = await get({i: id});
  return data as FullItem;
};

export const getItemsByIds = async (ids: string[]): Promise<FullItem[]> => {
  const items = await Promise.all(ids.map((id: string) => getItemById(id)));
  return items as FullItem[];
};

export const getSeasonFromTitle = async (title: string, season: number) => {
  const { data } = await get({t: title, Season: season});
  return formatSeason(data);
};

export const getSeasonFromId = async (id: string, season: number) => {
  const { data } = await get({i: id, Season: season});
  return formatSeason(data);
};

export const getFullSeriesFromId = async (id: string) => {
  const { title } = await getSeasonFromId(id, 1);
  return getFullSeriesFromTitle(title);
};

export const getFullSeriesFromTitle = async (title: string) => {
  const { totalSeasons, title: seriesTitle } = await getSeasonFromTitle(title, 1);
  const seasons = await Promise.all(getNumberOfSeasons(seriesTitle, parseInt(totalSeasons, 10)));
  return {
    title: seriesTitle,
    totalSeasons,
    seasons,
  } as Series;
};
