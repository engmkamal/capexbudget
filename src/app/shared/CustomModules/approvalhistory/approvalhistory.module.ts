import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalhistorygridComponent } from './approvalhistorygrid/approvalhistorygrid.component';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [ApprovalhistorygridComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
  ],
  exports: [
    ApprovalhistorygridComponent
  ]
})
export class ApprovalhistoryModule { }
