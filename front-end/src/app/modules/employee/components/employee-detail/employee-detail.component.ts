import { DateFormatValidationDirective } from './../../../../shared/directives/date-format/date-format-validation.directive';
import { PhoneValidationDirective } from './../../../../shared/directives/phone-validation/phone-validation.directive';
import { FileUploadComponent } from '../../../../shared/file-upload/file-upload.component';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';
import { Component, OnInit, Input, AfterViewInit, ViewChild, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PopupService } from '../../../../core/services/popup/popup.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  @Output() saveEvent: EventEmitter<Employee> = new EventEmitter<Employee>();
  @ViewChild('imageUpload') fileUploadComponent: FileUploadComponent;
  employee: Employee;
  totalMonths: number;
  employeeForm: FormGroup;
  imgSrc = '';
  isViewMode = true;
  constructor(public employeeService: EmployeeService, private fb: FormBuilder, private popupService: PopupService) { }

  ngOnInit() {
    this.loadEmployeeForm();
    this.employeeService.currentEmployee.subscribe(currentEmployee => {
      // console.log(currentEmployee);
      this.employee = currentEmployee;
      this.imgSrc = this.employee.picture;
      this.loadFormContent();
      this.totalMonths = this.monthsDifference(new Date(), new Date(this.employee.hireDate));
    });
  }

  /**
   * Calculate the difference between two months
   * @param date1 First date
   * @param date2 Second date
   */
  monthsDifference(date2, date1) {
    let months = (date2.getFullYear() - date1.getFullYear()) * 12;
    months += date2.getMonth() - date1.getMonth();
    if (date2.getDate() < date1.getDate()) {
      months--;
    }
    return months;
  }

  /**
   * Loads the form with the employee information
   */
  loadFormContent() {
    console.log('Going to load form content');
    this.employeeForm.patchValue({
      employeeId: this.employee.employeeId,
      name: this.employee.name,
      phoneNumber: this.employee.phoneNumber,
      picture: this.employee.picture,
      email: this.employee.email,
      hireDate: this.employee.hireDate,
      managerId: this.employee.managerId
    });
  }

  /**
   * Create the employee form
   */
  loadEmployeeForm() {
    this.employeeForm = this.fb.group({
      employeeId: new FormControl({ value: '', disabled: this.isViewMode }, Validators.required),
      name: new FormControl({ value: '', disabled: this.isViewMode }, Validators.required),
      phoneNumber: new FormControl({ value: '', disabled: this.isViewMode }, [
        Validators.required,
        PhoneValidationDirective.validate
      ]),
      picture: new FormControl({ value: '', disabled: this.isViewMode }, Validators.required),
      email: new FormControl({ value: '', disabled: this.isViewMode }, Validators.required),
      hireDate: new FormControl({ value: '', disabled: this.isViewMode }, [
        Validators.required,
        DateFormatValidationDirective.validate
      ]),
      managerId: new FormControl({ value: '', disabled: this.isViewMode }, Validators.required),
    });
  }

  get employeeId() {
    return this.employeeForm.get('employeeId');
  }

  get name() {
    return this.employeeForm.get('name');
  }

  get phoneNumber() {
    return this.employeeForm.get('phoneNumber');
  }

  get email() {
    return this.employeeForm.get('email');
  }

  get hireDate() {
    return this.employeeForm.get('hireDate');
  }

  get managerId() {
    return this.employeeForm.get('managerId');
  }

  /**
   * Enables all of the editable inputs
   */
  editClickAction() {
    this.name.enable();
    this.phoneNumber.enable();
    this.email.enable();
    this.hireDate.enable();
    this.managerId.enable();
    this.isViewMode = false;
  }

  /**
   * Discards the changes, disables everything and return from back to initial state
   */
  discardChangesAction() {
    this.name.disable();
    this.phoneNumber.disable();
    this.email.disable();
    this.hireDate.disable();
    this.managerId.disable();
    this.loadFormContent();
    this.isViewMode = true;
  }

  /**
   * Action to update the employee
   */
  saveClickAction() {
    if (this.employeeForm.valid && this.fileUploadComponent.imageSrc !== '') {
      const employeeObj = {
        employeeId: this.employeeId.value,
        name: this.name.value,
        phoneNumber: this.phoneNumber.value,
        email: this.email.value,
        hireDate: this.hireDate.value,
        managerId: this.managerId.value,
        picture: this.fileUploadComponent.imageSrc
      };
      this.employeeService.updateEmployee(employeeObj).subscribe(res => {
        this.employeeService.changeEmployee(employeeObj);
        this.saveEvent.emit(employeeObj);
        this.discardChangesAction();
        this.popupService.showMessage('Success', 'Employee has been updated with success.', null, 'Continue', 'employees');
      }, err => {
        this.popupService.showMessage('Error', `${err.message}`, null);
      });
    } else {
      this.employeeService.validateAllFormFields(this.employeeForm);
    }
  }

  /**
   * Iterates over each form control and marks it as touched (will show error message if empty),
   * @param formGroup Form group to validate
   */
  /*
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  } */
}
