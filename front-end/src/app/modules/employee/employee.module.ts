import { EmployeeService } from './services/employee.service';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { PopupModalDetailComponent } from './components/popup-modal-detail/popup-modal-detail.component';

@NgModule({
  declarations: [
      EmployeeCreateComponent,
      EmployeeListComponent,
      EmployeeDetailComponent,
      PopupModalDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule.forRoot()
  ], providers: [
    EmployeeService
  ], entryComponents: [
    EmployeeDetailComponent,
    PopupModalDetailComponent
  ]
})
export class EmployeeModule { }
