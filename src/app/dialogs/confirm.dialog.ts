import {Component} from '@angular/core'
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Confirmation needed</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times</span>
      </button>
    </div>
    <div class="modal-body">
      <p [innerHTML]="question">_</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close()">Yeah, Sure</button>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.dismiss()">Uh, let me think about this again</button>
    </div>
  `
})
export class ConfirmDialog {
  question: string

  constructor(public activeModal: NgbActiveModal) {
  }
}


