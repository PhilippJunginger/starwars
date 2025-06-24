import { Injectable } from '@angular/core';
import { Movie, MovieProps } from '../types/movie';
import { FilterType } from '../types/filterType';

@Injectable({
  providedIn: 'root'
})
export class StarWars {
  private readonly filmsBaseUrl = 'https://swapi.py4e.com/api/films'
  private readonly charactersBaseUrl = 'https://swapi.py4e.com/api/people'
  private readonly vehiclesBaseUrl = 'https://swapi.py4e.com/api/vehicles'
  private readonly starshipsBaseUrl = 'https://swapi.py4e.com/api/starships'

  async getAllStarWarsMovies() {
    const response = fetch(this.filmsBaseUrl);
    const data: Promise<{results: Movie[]}> = (await response).json() ?? {results: []};

    return (await data).results
  }

  private async getResultUrls(baseUrl: string, value: string) {
    const response = await fetch(`${baseUrl}?search=${value}`);
    const data: Promise<{ results: { url: string }[] }> = await response.json();
    return (await data).results.map((result) => result.url);
  }

  async getSearchResults(type: FilterType, movies: Movie[], searchValue: string) {
    const characterUrls = await this.getResultUrls(this.charactersBaseUrl, searchValue);
    return this.filterMoviesByUrl(movies, this.getMoviePropForType(type), characterUrls);
  }

  filterMoviesByUrl(movies: Movie[], movieProps: MovieProps , matchingUrls: string[]): string[] {
    return movies.filter(movie => matchingUrls.some((url) => movie[movieProps].includes(url))).map((movie) => movie.title)
  }

  getBaseUrlForFilterType(type: FilterType) {
    switch (type) {
      case FilterType.CHAR:
        return this.charactersBaseUrl;
      case FilterType.VEHICLE:
        return this.vehiclesBaseUrl;
      case FilterType.SHIP:
        return this.starshipsBaseUrl;
    }
  }

  getMoviePropForType(type: FilterType): MovieProps {
     switch (type) {
      case FilterType.CHAR:
        return 'characters';
      case FilterType.VEHICLE:
        return 'vehicles';
      case FilterType.SHIP:
        return 'starships';
    }
  }
}
