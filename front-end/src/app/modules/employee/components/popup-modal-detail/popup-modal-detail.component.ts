import { Employee } from './../../models/Employee';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup-modal-detail',
  templateUrl: './popup-modal-detail.component.html',
  styleUrls: ['./popup-modal-detail.component.css']
})
export class PopupModalDetailComponent implements OnInit {
  @Output() saveEventOutput: EventEmitter<Employee> = new EventEmitter<Employee>();

  constructor() { }

  ngOnInit() {
  }

  onSaveEvent(employee) {
    console.log('PopupModalDetailComponent event');
    console.log(employee);
    this.saveEventOutput.emit(employee);
  }

}
