import { Episode, Season, Series } from '../types/series';

export const SCORE_S01 = 5.3;
export const SCORE_S02 = 4.6;

export const EPISODES_S01 = [
  {
    Title: 'Series',
    Released: '',
    Episode: 'Episode 1',
    imdbRating: 5.5,
    imdbId: '1234',
  },
  {
    Title: 'Series',
    Released: '',
    Episode: 'Episode 2',
    imdbRating: 7.3,
    imdbId: '1234',
  },
  {
    Title: 'Series',
    Released: '',
    Episode: 'Episode 3',
    imdbRating: 3.2,
    imdbId: '1234',
  },
] as Episode[];

export const EPISODES_S02 = [
  {
    Title: 'Series 2',
    Released: '',
    Episode: 'Episode 1',
    imdbRating: 7.2,
    imdbId: '1234',
  },
  {
    Title: 'Series 2',
    Released: '',
    Episode: 'Episode 2',
    imdbRating: 2.3,
    imdbId: '1234',
  },
  {
    Title: 'Series 3',
    Released: '',
    Episode: 'Episode 3',
    imdbRating: 4.2,
    imdbId: '1234',
  },
] as Episode[];

export const EPISODES_S01_INVALID = [...EPISODES_S01, {
  Title: 'Series',
  Released: '',
  Episode: 'Episode 1',
  imdbRating: 'N/A',
  imdbId: '1234',
}];

export const EPISODE_NOT_RELEASED = {
  Title: 'Series',
  Released: 'N/A',
  Episode: 'Episode 1',
  imdbRating: 'N/A',
  imdbId: '1234',
};

export const SEASON1 = {
  title: 'game of thrones',
  seasonNumber: 'Season 1',
  totalSeasons: '8',
  episodes: EPISODES_S01,
} as Season;

export const SEASON2 = {
  title: 'game of thrones',
  seasonNumber: 'Season 2',
  totalSeasons: '8',
  episodes: EPISODES_S02,
} as Season;

export const SEASON1_NON_RELEASED_EPISODES = {
  title: 'game of thrones',
  seasonNumber: 'Season 1',
  totalSeasons: '8',
  episodes: EPISODES_S01_INVALID,
} as Season;

export const SERIES = {
  title: SEASON1.title,
  totalSeasons: SEASON1.totalSeasons,
  seasons: [SEASON1, SEASON2],
} as Series;
