import { DigitOnlyDirective } from './directives/digit-only/digit-only.directive';
import { PhoneValidationDirective } from './directives/phone-validation/phone-validation.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateFormatValidationDirective } from './directives/date-format/date-format-validation.directive';

@NgModule({
  declarations: [
      FileUploadComponent,
      PopupModalComponent,
      PhoneValidationDirective,
      DigitOnlyDirective,
      DateFormatValidationDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  exports: [
    PopupModalComponent,
    FileUploadComponent,
    FormsModule,
    ReactiveFormsModule,
    PhoneValidationDirective,
    DigitOnlyDirective,
    DateFormatValidationDirective
  ],
  entryComponents: [PopupModalComponent]
})
export class SharedModule { }
