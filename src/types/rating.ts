export interface Rating {
  Source: string;
  Value: string;
}

export enum RatingAverage {
  Above = 'above',
  Neutral = 'neutral',
  Below = 'below',
}
