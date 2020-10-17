import * as seriesMock from '../mock/seriesMock';
import { getAllEpisodeScores } from './getAllEpisodeScores';

describe('utils/getAllEpisodeScores', () => {

  it('should get all episodes as numbers for a given series', () => {
    const allEpisodes = getAllEpisodeScores(seriesMock.SERIES);
    expect(allEpisodes).toEqual([5.5, 7.3, 3.2, 7.2, 2.3, 4.2]);
  });

  it('should filter out non-released episode scores', () => {
    const allEpisodes = getAllEpisodeScores({
      ...seriesMock.SERIES,
      seasons: [seriesMock.SEASON1_NON_RELEASED_EPISODES],
    });
    expect(allEpisodes.length).not.toEqual(seriesMock.SEASON1_NON_RELEASED_EPISODES.episodes.length);
  });
});
