import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-filter-field',
  imports: [],
  template: `
    <div class="form-group">
      <label for={{this.label()}} >{{this.label()}}{{this.isRequired() ? '*' : ''}}</label>
      <input id={{this.label()}} required={{this.isRequired()}} minlength="3" type="text" class="form-control" (input)="handleFieldInput($event)" value="{{this.value()}}"/>

      @if (this.hasMinLengthError()) {
        <div style="color: red;">
          You need to enter at least 3 characters.
        </div>
      }
    </div>
  `,
})
export class FilterField {
  label = input.required<string>();
  value = input.required<string>();
  isRequired = input.required<boolean>();
  onValueChange = output<string>();
  hasMinLengthError = input.required<boolean>();

  handleFieldInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onValueChange.emit(value);
  }
}
