import { FormControl, ValidationErrors } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appDateFormatValidation]'
})
export class DateFormatValidationDirective {

  constructor() { }

  static validate(numValue: FormControl) {
    const regex = /^\d{2}\/\d{2}\/\d{4}/;
    if (regex.exec(numValue.value)) {
        if (regex.exec(numValue.value)[0].length === regex.exec(numValue.value).input.length) {
            return null;
        } else {
            return { invalidDateFormat: true };
        }
    } else {
        return { invalidDateFormat: true };
    }
}

validate(control: FormControl): ValidationErrors | null {
    return DateFormatValidationDirective.validate(control);
}

}
