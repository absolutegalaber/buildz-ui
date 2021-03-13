import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IEnvironment} from '../../core/flux-store/model';

@Component({
    selector: 'bz-environment-list',
    template: `
        <div class="list-group">
            <span class="list-group-item list-group-item-primary">Known Environments</span>
            <button class="list-group-item list-group-item-action" *ngFor="let environment of definedEnvironments"
                    (click)="environmentSelected.emit(environment.name)"
            >
                {{environment.name}}
            </button>
            <button class="list-group-item list-group-item-action" *ngFor="let environment of internalEnvironments"
                    (click)="environmentSelected.emit(environment.name)"
            >
                {{environment.name}}
            </button>
            <button class="list-group-item list-group-item-action list-group-item-secondary text-right" (click)="newEnvironment.emit()">
                <fa-icon icon="plus"></fa-icon>
                New Env
            </button>
        </div>
    `
})
export class EnvironmentList {
    @Input()
    definedEnvironments: IEnvironment[] = [];
    @Input()
    internalEnvironments: IEnvironment[] = [];
    @Output()
    environmentSelected = new EventEmitter<string>();
    @Output()
    newEnvironment = new EventEmitter<void>();
}
