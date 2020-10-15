import { Episode } from '../types/series';

const NOT_RATED = 'N/A';
const NOT_RELEASED = 'N/A';

export const isEpisodeRated = (episode: Episode) => episode.imdbRating !== NOT_RATED;

export const isEpisodeReleased = (episode: Episode) => episode.Released !== NOT_RELEASED;

export const episodeRatingAsNumber = (episode: Episode) => parseFloat(episode.imdbRating);
