import { SearchResultSortColumn, SearchResultType } from '../../types/searchResult';

export const cliConfig = {
  // Set default search type
  searchTypeDefault: SearchResultType.All,

  // Set default length to limit movies and series plots
  plotLimitDefault: 40,

  // Set default value if plots should be rendered or not
  showPlotDefault: false,

  // Set default sort order of column
  sortColumnOrderDefault: SearchResultSortColumn.None,

  // Set limit of amount of episodes to render in episode graph
  episodeGraphLimit: 400,

  // Set the available columns that are sortable
  availableColumnsToSort: [SearchResultSortColumn.Year, SearchResultSortColumn.Title],
};
