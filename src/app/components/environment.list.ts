import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'bz-environment-list',
  template: `
    <div class="list-group">
      <span class="list-group-item list-group-item-primary">Known Environments</span>
      <button class="list-group-item list-group-item-action" *ngFor="let environment of environments"
              (click)="environmentSelected.emit(environment)"
      >
        {{environment}}
      </button>
      <button class="list-group-item list-group-item-action list-group-item-secondary text-right">
        Create New Env
      </button>
    </div>
  `
})
export class EnvironmentList {
  @Input()
  environments: string[] = [];
  @Output()
  environmentSelected = new EventEmitter<string>();
}
