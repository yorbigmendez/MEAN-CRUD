import { Directive } from '@angular/core';
import { FormControl, Validator, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPhoneValidation]'
})
export class PhoneValidationDirective implements Validator {

  constructor() { }


  static validate(numValue: FormControl) {
    const regex = /^\d{3}-\d{3}-\d{4}/;
    if (regex.exec(numValue.value)) {
        if (regex.exec(numValue.value)[0].length === regex.exec(numValue.value).input.length) {
            return null;
        } else {
            return { invalidPhoneFormat: true };
        }
    } else {
        return { invalidPhoneFormat: true };
    }
}

validate(control: FormControl): ValidationErrors | null {
    return PhoneValidationDirective.validate(control);
}

}
