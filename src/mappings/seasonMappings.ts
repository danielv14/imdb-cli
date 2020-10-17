import { Season } from '../types/series';
import { mapToEpisode } from './episodeMappings';

export const mapToSeason = (data: any): Season => ({
  title: data.Title,
  seasonNumber: data.Season,
  totalSeasons: data.totalSeasons,
  episodes: data.Episodes.map(mapToEpisode),
});
