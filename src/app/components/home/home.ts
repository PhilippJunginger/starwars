import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmCard } from "../film-card/film-card";
import { StarWars } from '../../services/star-wars';
import { Movie } from '../../types/movie';
import { FilterField } from "../filter-field/filter-field";
import { FilterType } from '../../types/filterType';

@Component({
  selector: 'app-home',
  imports: [FilmCard, FilterField, CommonModule],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  readonly FilterType = FilterType;
  starWars = inject(StarWars);
  movies: Movie[] = [];
  selectedType = signal<FilterType | undefined>(undefined);
  searchValue: string = "";
  searchResults: string[] = [];

  hasMinLengthError: boolean = false;
  isNoSelection = computed(() => this.selectedType() === undefined);
  isCharacterFieldRequired = computed(() => this.selectedType() === FilterType.CHAR);
  isVehicleFieldRequired = computed(() => this.selectedType() === FilterType.VEHICLE);
  isStarshipFieldRequired = computed(() => this.selectedType() === FilterType.SHIP);

  async ngOnInit(): Promise<void> {
    this.movies = await this.starWars.getAllStarWarsMovies();
  }

  updateSelectedFilterType(type: FilterType) {
    if (this.selectedType() !== type) {
      this.selectedType.set(type);
      this.searchValue = '';
    }
  }

  updateFilterValue(value: string) {
    this.hasMinLengthError = value.length < 3;
    this.searchValue = value;
  }

  async handleSearch() {
    const selectedType = this.selectedType();

    if (this.hasMinLengthError || selectedType === undefined) {
      return;
    }

    this.searchResults = await this.starWars.getSearchResults(selectedType, this.movies, this.searchValue)    
  }

  isSearchResult(movie: Movie) {
    return this.searchResults.includes(movie.title);
  }
}
