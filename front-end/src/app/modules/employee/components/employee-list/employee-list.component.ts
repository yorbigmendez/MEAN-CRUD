import { EmployeeDetailComponent } from './../employee-detail/employee-detail.component';
import { PopupService } from '../../../../core/services/popup/popup.service';
import { SearchService } from '../../../../core/services/search/search.service';
import { PopupModalDetailComponent } from '../popup-modal-detail/popup-modal-detail.component';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupModalComponent } from '../../../../shared/popup-modal/popup-modal.component';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Observable<Employee[]>; // Observable list of employees
  employeeList: Employee[] = []; // List of employees
  filterData: Employee[] = []; // Filtered data set of employees
  criterias: object[]; // Cirterias to select from
  selectedCriteria: any; // Selected criteria
  searchText: string; // Search text
  constructor(private employeeService: EmployeeService, private modalService: NgbModal, private searchService: SearchService, private popupService: PopupService) { }

  ngOnInit() {
    this.criterias = [{ value: 1, criteria: 'Name' }, { value: 2, criteria: 'ID' }];
    this.selectedCriteria = this.criterias[0];
    this.searchText = '';
    this.loadData();
  }

  /**
   * Loads list of employees
   */
  loadData() {
    // this.employees = this.employeeService.getEmployeesList();
    this.employeeService.getEmployeesList().subscribe(
      res => {
        this.employeeList = res;
        this.filterData = this.employeeList;
        // Sort the list
        this.employeeList.sort((a, b) => {
          return a.name < b.name ? -1 : 1;
        });
      },
      err => {
          this.popupService.showMessage('Employee List Error', `${err.message}`, null);
      });
  }

  /**
   * Deletes an employee
   * @param employee Employee to delete
   */
  deleteEmployee(employee: Employee) {
    const modalRef = this.modalService.open(PopupModalComponent);
    modalRef.componentInstance.title = 'Delete Confirmation';
    modalRef.componentInstance.bodyMessage = `Are you sure you want to delete ${employee.name}
    and id is ${employee.employeeId}`;
    modalRef.componentInstance.submitButtonText = 'Yes, Delete';
    modalRef.componentInstance.cancelButtonText = 'No, Cancel';
    const employeePost = {
      employeeId: employee.employeeId
    };
    modalRef.componentInstance.submitClickEvent.subscribe(($e) => {
      modalRef.close();
      this.employeeService.deleteEmployee(employeePost)
        .subscribe(
          data => {
            this.loadData();
          },
          err => this.popupService.showMessage('Delete Error', `${err.message}`, null));

    });
    modalRef.componentInstance.cancelClickEvent.subscribe( () => {
      modalRef.close();
    });

  }

  /**
   * Show deatils of employee
   * @param employee Employee to show deatils
   */
  showDetails(employee: Employee) {
    this.employeeService.changeEmployee(employee);
    const modalRef = this.modalService.open(EmployeeDetailComponent, { size: 'lg' });
    modalRef.componentInstance.saveEvent.subscribe(res => {
      console.log(res);
      const index = this.employeeList.findIndex(element => element.employeeId === employee.employeeId);
      this.employeeList[index] = res;
    });
    modalRef.componentInstance.employee = employee;
  }

  /**
   * Calls the search service
   */
  search() {
    if (this.selectedCriteria.value === 1) {
      this.filterData = this.searchService.search(this.employeeList, this.searchText, (employee) =>
        employee.name.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));
    } else {
      this.filterData = this.searchService.search(this.employeeList, this.searchText, (employee) =>
        employee.employeeId.toString().includes(this.searchText.toLocaleLowerCase()));
    }
  }

}
