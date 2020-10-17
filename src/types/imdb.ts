import { FormattedItem, Item } from './item';

interface IMDbCLIProperties {
  query: string;
  showPlot: boolean;
  searchByType: string;
  limitPlot: number;
  sortColumn?: string;
}

export interface IMDbCliInterface extends IMDbCLIProperties {
  searchQuery: (query: any) => void;
  renderSearchResults: (result?: FormattedItem[]) => void;
  getSearchResult: (query: string) => Promise<Item[]>;
  run: () => Promise<void>;
  getSeriesInfo: () => Promise<void>;
  renderEpisodeGraph: () => Promise<void>;
}
