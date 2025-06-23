import { Component, input } from '@angular/core';

@Component({
  selector: 'app-film-card',
  imports: [],
  template: `
    <div class="card" style="height: 100%;">
      <div class="card-body">
        <h5 class="card-title">{{this.title()}}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">by George Lucas, 25 May 1977</h6>

        <p class="card-text">{{this.description()}}</p>
      </div>
    </div>
  `,
})
export class FilmCard {
  title = input("");
  description = input("");
}
