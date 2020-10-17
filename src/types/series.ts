export interface Season {
  title: string;
  seasonNumber: string;
  totalSeasons: string;
  episodes: Episode[];
 }

export interface Episode {
  Title: string;
  Released: string;
  Episode: string;
  imdbRating: number;
  imdbId: string;
}

export interface Series {
  title: string;
  totalSeasons: string;
  seasons: Season[];
}

export interface SeasonAverageScore {
  SeasonNumber: string;
  AverageScore: number;
}

export interface SeriesAverageScore {
  Title: string;
  Seasons: SeasonAverageScore[];
}
