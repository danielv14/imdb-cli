# IMDb-CLI

This is a repo for a Node-CLI that Searches IMDb for and it's primary purpose is to have a fast and easy way to get IMDb-ID's for movies and tv-series.

## Prerequisites

The IMDB-CLI needs an api key from OMDb to work properly. You can easily get your own API key from the site.

Once you have your api key you need to create a `config.json` file in the project root folder with the following content:

```json
{
  "apikey": "YOUR-API-KEY"
}
```

## Usage
Clone the repo, install it globally with `npm install -g` and then type the following into a terminal
```
$ imdb
```
This will display the CLI-prompt where the user is asked to enter a search query. If search results are found the CLI will display it in table where titles, years and IMDb-ID's are displayed. 

## Current Features
The CLI currently supports the following features:
* Searching movies and series to get their imdb id's.
* Use parameters when starting the application to display plot and search for either movies or series only

## Road Map
Below is a list with currently planned features for the CLI
- [x] Clearer seperation of movies and tv-series when displaying the search result
- [x] Add option to display short descriptions about the movies and tv-series to make it easier to grasp the search results
- [x] Make CLI more flexible by passing flags (-m --movies or -s --series) to only fetch movies or tv series as search result. Building a good flexible base for passing other flags aswell.