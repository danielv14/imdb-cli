import { SearchResultType } from './searchResult';

type Query = string;
type Title = string;
type ImdbId = string;
type Season = number;

export interface RequestParams {
  s?: Query;
  t?: Title;
  type?: SearchResultType;
  i?: ImdbId;
  Season?: Season;
}
