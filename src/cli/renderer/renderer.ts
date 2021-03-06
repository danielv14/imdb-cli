import * as asciichart from 'asciichart';
import chalk from 'chalk';
import figlet from 'figlet';

// eslint-disable-next-line no-unused-vars
const tab = require('table-master');

export const CLI_COLOR = '#f3ce13';

export enum RenderColor {
  Error = 'error',
  Neutral = 'neutral',
  Success = 'success',
}

const renderColors = {
  [RenderColor.Error]: chalk.red,
  [RenderColor.Neutral]: chalk.white,
  [RenderColor.Success]: chalk.green,
};

export const getRenderColor = (renderColor: RenderColor) => renderColors[renderColor];

export const renderErrorString = (text: string) => {
  const color = renderColors[RenderColor.Error];
  console.log(color(text));
};

export const renderCLIHeader = (text: string, hex: string) => {
  const color = hexColor(hex);
  console.log(color(figlet.textSync(text)));
};

export const renderErrorInfo = (info: string, error: string) => {
  const color = renderColors[RenderColor.Error];
  console.log(`${info}: ${color(error)}`);
};

export const renderTable = (text: any) => console.table(text);

export const hexColor = (hex: string) => chalk.hex(hex);

export const renderText = (text: string) => console.log(text);

export const renderAsciiChart = (input: number[]) => console.log(asciichart.plot(input, { height:  15 }));

export const renderWithColor = hexColor(CLI_COLOR);
