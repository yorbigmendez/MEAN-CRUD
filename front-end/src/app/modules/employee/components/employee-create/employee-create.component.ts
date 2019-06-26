import { DateFormatValidationDirective } from './../../../../shared/directives/date-format/date-format-validation.directive';
import { PhoneValidationDirective } from '../../../../shared/directives/phone-validation/phone-validation.directive';
import { PopupService } from '../../../../core/services/popup/popup.service';
import { PopupModalComponent } from '../../../../shared/popup-modal/popup-modal.component';
import { EmployeeService } from '../../services/employee.service';
import { FileUploadComponent } from '../../../../shared/file-upload/file-upload.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  @ViewChild('imageUpload') fileUploadComponent: FileUploadComponent;
  employeeForm: FormGroup;
  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private popupService: PopupService, private router: Router) { }

  ngOnInit() {
    this.loadEmployeeForm();
  }

  /**
   * Create the employee form
   */
  loadEmployeeForm() {
    this.employeeForm = this.fb.group({
      employeeId: ['', Validators.required],
      name: ['', Validators.required],
      phoneNumber: ['', [
        Validators.required,
        PhoneValidationDirective.validate]],
      picture: [''],
      email: ['', Validators.required],
      hireDate: ['', [
        Validators.required,
        DateFormatValidationDirective.validate]],
      managerId: ['', Validators.required]
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
   * Click action when user hits save button on the create form
   */
  onSubmitClick() {
    if (this.employeeForm.valid && this.fileUploadComponent.imageSrc !== '') {
      const employeePost = {
        employeeId: this.employeeId.value,
        name: this.name.value,
        phoneNumber: this.phoneNumber.value,
        email: this.email.value,
        hireDate: this.hireDate.value,
        managerId: this.managerId.value,
        picture: this.fileUploadComponent.imageSrc
      };
      this.employeeService.createEmployee(employeePost).subscribe(res => {
        this.displaySuccessfulMessage();
      }, err => {
        console.log(err);
      });
    } else {
      this.employeeService.validateAllFormFields(this.employeeForm);
    }
  }

  /**
   * Displays a successful message through popup instance.
   */
  displaySuccessfulMessage() {
    this.popupService.showMessage('Success', 'Employee was added Successfully', null, 'Continue', 'employees');
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
  }*/
}
