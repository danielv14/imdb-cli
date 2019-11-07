export interface IMDbProperties {
  query: string;
  outputColor: (text: string) => string;
  showPlot: boolean;
  searchByType: string;
  limitPlot: number;
  sortColumn?: string;
}
