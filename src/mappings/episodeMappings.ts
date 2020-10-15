import { Episode } from '../types/series';

const isNumber = (input: any) => !isNaN(input);

export const mapToEpisode = (data: any): Episode => ({
  Title: data.Title,
  Released: data.Released,
  Episode: data.Episode,
  imdbId: data.imdbID,
  imdbRating: isNumber(data.imdbRating) ? parseFloat(data.imdbRating) : 0,
});
