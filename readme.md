# IMDb-CLI

This is a repo for a Node-CLI that Searches IMDb for and it's primary purpose is to have a fast and easy way to get IMDb-ID's for movies and tv-series.

## Prerequisites

The IMDB-CLI needs an api key from OMDb to work properly. You can easily get your own API key from the site.

Once you have your api key you need to create a `.env` file in the project root folder with the following content:

```
API_KEY=YOUR-API-KEY
```

## Usage

Once you have cloned the repo start by installing all the dependencies with `npm install`.

Since the source code in `src/` folder uses TypeScript the CLI has to by built before usage. Run `npm run build` to build the CLI to target `dist/` folder.

Once the CLI has been built to `dist/` folder install the CLI globally with `npm install -g`. CLI is now globally available. Type the following into a terminal
```
$ imdb
```
This will display the CLI-prompt where the user is asked to enter a search query. Type `imdb --help` to get more info about how the CLI can be used.

## Current Features
The CLI currently supports the following features:
* Searching movies and series to get their imdb id's.
* Use parameters when starting the application to display plot and search for either movies or series only

## Development

Since this project uses typescript the cli will have to be built, even when developing new features of fixing new bugs. 

* `npm run build` will build the current state of the `src/` to `dist/`
* `npm run build:watch` will watch for changes in the `src/` folder and build on demand.

CLI is tested with Jest and the following npm commands is available

* `npm run test` will run the test suite
* `npm run test:watch` will run the test suite and watch for changes and re-run on demand.

## Road Map
Below is a list with currently planned features for the CLI
- [x] Clearer seperation of movies and tv-series when displaying the search result
- [x] Add option to display short descriptions about the movies and tv-series to make it easier to grasp the search results
- [x] Make CLI more flexible by passing flags (-m --movies or -s --series) to only fetch movies or tv series as search result. Building a good flexible base for passing other flags aswell.