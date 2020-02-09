import * as seriesMock from '../mock/seriesMock';
import { Season } from '../types/series';
import { hasSeasonStarted } from './hasSeasonStarted';

describe('utils/hasSeasonStarted', () => {
  it('should return true if one or more episode is released', () => {
    const season = {
      ...seriesMock.SEASON1,
      episodes: [...seriesMock.SEASON1.episodes, seriesMock.EPISODE_NOT_RELEASED],
    };
    expect(hasSeasonStarted(season)).toBeTruthy();
  });
  it('should return false if all episodes has not released yet', () => {
    const season = { ...seriesMock.SEASON1, episodes: [seriesMock.EPISODE_NOT_RELEASED] } as Season;
    expect(hasSeasonStarted(season)).toBeFalsy();
  });
});
