module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
