# IMDb-CLI

This is a repo for a Node-CLI that scrapes IMDb for search results and it's primary purpose is to have a fast and easy way to get IMDb-ID's for movies and tv-series.

## Usage
Clone the repo, install it globally with `npm install -g` and then type the following into a terminal
```
$ imdb
```
This will display the CLI-prompt where the user is asked to enter a search query. If search results are found the CLI will display it in table where titles, years and IMDb-ID's are displayed. 

## Current Features
The CLI currently supports the following features:
* Searching IMDb and scraping the website for search results.

## Road Map
Below is a list with currently planned features for the CLI
* Clearer seperation of movies and tv-series when displaying the search result
* Add option to display short descriptions about the movies and tv-series to make it easier to grasp the search results