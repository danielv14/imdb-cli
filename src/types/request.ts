import { SearchResultType } from './searchResult';

type Query = string;
type Title = string;
type ImdbId = string;
type Season = number;

export interface OmdbRequestParams {
  s?: Query;
  t?: Title;
  type?: SearchResultType;
  i?: ImdbId;
  Season?: Season;
}

export enum QueryParams {
  Query = 's',
  Title = 't',
  Type = 'type',
  Id = 'i',
  Season = 'Season',
}
