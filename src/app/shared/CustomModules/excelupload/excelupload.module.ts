import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExceluploadhomeComponent } from './exceluploadhome/exceluploadhome.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ExceluploadhomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ExceluploadhomeComponent
  ]
})
export class ExceluploadModule { }
