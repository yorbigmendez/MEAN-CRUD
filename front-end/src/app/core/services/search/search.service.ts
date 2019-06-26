import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  /**
   * Filters an array of elements given a custom search function
   * @param arr Original array of elements
   * @param searchText Search text criteria
   * @param customSearch Custom search function
   */
  search(arr, searchText, customSearch): any[] {
    let filteredData = [];
    // No search text is provided
    if (!searchText) {
      filteredData = arr;
    } else {
      filteredData = arr.filter(employee =>  customSearch(employee) ? employee : null);
    }
    return filteredData;
  }
}
