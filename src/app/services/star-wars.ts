import { Injectable } from '@angular/core';
import { Movie } from '../types/movie';

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

  filterMoviesByUrl(movies: Movie[], movieProps: Exclude<keyof Movie, 'title' | 'opening_crawl'> , matchingUrls: string[]): Movie[] {
    return movies.filter(movie => matchingUrls.some((url) => movie[movieProps].includes(url)))
  }

  private async getResultUrls(baseUrl: string, value: string) {
    const response = await fetch(`${baseUrl}?search=${value}`);
    const data: Promise<{ results: { url: string }[] }> = await response.json();
    return (await data).results.map((result) => result.url);
  }

  async getMoviesWithCharacter(value: string, movies: Movie[]) {
    const characterUrls = await this.getResultUrls(this.charactersBaseUrl, value);
    return this.filterMoviesByUrl(movies, 'characters', characterUrls);
  }

  async getMoviesWithVehicle(value: string, movies: Movie[]) {
    const vehicleUrls = await this.getResultUrls(this.vehiclesBaseUrl, value);
    return this.filterMoviesByUrl(movies, 'vehicles', vehicleUrls);
  }

  async getMoviesWithStarships(value: string, movies: Movie[]) {
    const starshipUrls = await this.getResultUrls(this.starshipsBaseUrl, value);
    return this.filterMoviesByUrl(movies, 'starships', starshipUrls);
  }
}
