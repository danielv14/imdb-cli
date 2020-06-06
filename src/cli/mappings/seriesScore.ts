import { FormattedAverageSeason } from '../../types/season';
import { SeriesAverageScore } from '../../types/series';
import { calculateAverage } from '../../utils/calculateAverage';
import { scoreColor } from '../../utils/scoreColor';

export const getFormattedSeriesScore = (series: SeriesAverageScore): FormattedAverageSeason[] => {
  const averageSeriesScore = calculateAverage(series.Seasons.map((season) => season.AverageScore));
  const formattedSeriesScore = series.Seasons.map((season) => {
    const color = scoreColor(season.AverageScore, averageSeriesScore);
    return {
      [series.Title]: `Season ${season.SeasonNumber}`,
      'IMDb score': color(season.AverageScore + ''),
    };
  });
  return formattedSeriesScore;
};
