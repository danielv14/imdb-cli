export interface CommandOption {
  short: string;
  full: string;
  description: string;
}


export const commandOptions: CommandOption[] = [
  {
    short: '-p',
    full: '--plot',
    description: 'Show plot in search result',
  },
  {
    short: '-l',
    full: '--limit-plot [number]',
    description: 'Limit the amount of characters to be displayed for plot text',
  },
  {
    short: '-t',
    full: '--title [title]',
    description: 'Search by a specific title. If omitted the program will prompt you for a title to search for',
  },
  {
    short: '-m',
    full: '--movies',
    description: 'Search by movies only. Cannot be used alongside \'series\' parameter',
  },
  {
    short: '-s',
    full: '--series',
    description: 'Search by series only. Cannot be used alongside \'movie\' parameter',
  },
  {
    short: '-o',
    full: '--order-by [column]',
    description: 'Sort the search result by a column',
  },
  {
    short: '-i',
    full: '--info',
    description: 'Get averege season score for a series. Use this flag alongside --title flag',
  },
];
