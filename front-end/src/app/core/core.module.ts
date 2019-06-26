import { PopupService } from './services/popup/popup.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SearchService } from './services/search/search.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    PopupService,
    SearchService
  ]
})
export class CoreModule { }
