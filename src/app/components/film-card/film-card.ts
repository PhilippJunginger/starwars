import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-film-card',
  imports: [CommonModule],
  template: `
    <div class="card" [ngClass]="this.isPartOfSearch() ? 'border border-2 border-warning' : ''"  style="height: 100%;">
      <div class="card-body">
        <h5 class="card-title">{{this.title()}}</h5>
        <h6 class="card-subitle text-secondary">by {{this.director()}}</h6>
        <p class="card-text">{{this.description()}}</p>
      </div>
    </div>
  `,
})
export class FilmCard {
  title = input.required<string>();
  description = input.required<string>();
  director = input.required<string>();
  isPartOfSearch = input.required<boolean>();
}
