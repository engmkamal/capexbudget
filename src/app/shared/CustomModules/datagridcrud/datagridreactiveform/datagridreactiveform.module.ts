import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { DatagridreactiveformhomeComponent } from './datagridreactiveformhome/datagridreactiveformhome.component';




@NgModule({
  declarations: [DatagridreactiveformhomeComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([])
  ]
})
export class DatagridreactiveformModule { }
