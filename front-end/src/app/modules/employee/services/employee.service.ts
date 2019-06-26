import { FormGroup } from '@angular/forms';
import { Employee } from '../models/Employee';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:3000/employee';
  private employee = new BehaviorSubject<Employee>(new Employee());
  currentEmployee = this.employee.asObservable();
  constructor(private http: HttpClient) { }

  changeEmployee(employee: Employee) {
    this.employee.next(employee);
  }
  /**
   * Calls the insert employee api
   * @param employee employee to insert
   */
  createEmployee(employee: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`, employee);
  }

  /**
   * Updates an employee
   * @param employee Employee obj
   */
  updateEmployee(employee: object): Observable<object> {
    return this.http.put(`${this.baseUrl}`, employee);
  }

  /**
   * Call the endpoint to delete an employee
   * @param id:
   */
  deleteEmployee(employee: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/delete`, employee);
  }

  /**
   * Request the list of employee from the api
   */
  getEmployeesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  /**
   * Iterates over each form control and marks it as touched (will show error message if empty),
   * @param formGroup Form group to validate
   */
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
