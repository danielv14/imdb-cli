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
  imdbRating: string;
  imdbId: string;
}

export interface Series {
  title: string;
  totalSeasons: string;
  seasons: Season[];
}
