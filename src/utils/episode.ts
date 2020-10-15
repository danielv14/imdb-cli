import { Episode } from '../types/series';

const NOT_RATED = 0;
const NOT_RELEASED = 'N/A';

export const isEpisodeRated = (episode: Episode) => episode.imdbRating > NOT_RATED;

export const isEpisodeReleased = (episode: Episode) => episode.Released !== NOT_RELEASED;
