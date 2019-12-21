const INPUT_ERROR = 'Please enter a query to search for...';

export const inputQuestion = [
  {
    type: 'input',
    name: 'searchString',
    message: 'What do you want to search for?\n',
    validate: (value: string) => (value.length ? true : INPUT_ERROR),
  },
];
