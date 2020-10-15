import { Chalk } from 'chalk';
import { getRenderColor, RenderColor } from '../cli/renderer/renderer';
import { RatingAverage } from '../types/rating';

const renderStates = {
  [RatingAverage.Above]: getRenderColor(RenderColor.Success),
  [RatingAverage.Neutral]: getRenderColor(RenderColor.Neutral),
  [RatingAverage.Below]: getRenderColor(RenderColor.Error),
};

export const scoreColor = (score: number, average: number): Chalk => {
  let diff;
  const diffThreshold = 0.5;

  if (score < average) {
    diff = average - score;
    return diff > diffThreshold ?
      renderStates[RatingAverage.Below] :
      renderStates[RatingAverage.Neutral];
  }
  diff = score - average;
  return diff > diffThreshold ?
    renderStates[RatingAverage.Above] :
    renderStates[RatingAverage.Neutral];
};
