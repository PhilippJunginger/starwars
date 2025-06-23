import { Component } from '@angular/core';
import { Home } from "./components/home/home";

@Component({
  selector: 'app-root',
  imports: [Home],
  template: `<app-home></app-home>`,
})
export class App {
  protected title = 'vattenfall-starwars';
}
