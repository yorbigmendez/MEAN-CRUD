import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.css']
})
export class PopupModalComponent implements OnInit {
  @Input() title: string; // Header title text
  @Input() bodyMessage: string;
  @Input() cancelButtonText: string; // Cancel button Text
  @Input() submitButtonText: string; // Submit Button Text
  @Output() cancelClickEvent: EventEmitter<void> = new EventEmitter<void>(); // Cancel click event
  @Output() submitClickEvent: EventEmitter<void> = new EventEmitter<void>(); // Submit click event
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  /**
   * Emits the cancel click event
   */
  cancelClickAction() {
    this.cancelClickEvent.emit();
  }

  /**
   * Emits the submit click event
   */
  submitClickAction() {
    this.submitClickEvent.emit();
  }

}
