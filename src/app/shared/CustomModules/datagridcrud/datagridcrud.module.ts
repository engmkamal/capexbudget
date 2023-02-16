import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialmodulesModule } from '../materialmodules/materialmodules.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatagridcrudhomeComponent } from './datagridcrudhome/datagridcrudhome.component';
import { DatagridcruddetailsComponent } from './datagridcruddetails/datagridcruddetails.component';
import { HorizontalgridComponent } from './horizontalgrid/horizontalgrid.component';
import { FormCellComponent } from './form-cell/form-cell.component';
import { VerticalGridComponent } from './vertical-grid/vertical-grid.component';
import { FormTextInputComponent } from './form-text-input/form-text-input.component';
import { DatagridngrxComponent } from './datagridngrx/datagridngrx.component';
import { EditorComponent } from './editor/editor.component';
import { NgrxFormsModule } from 'ngrx-forms';
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/app/modules/workflows/workflowshome/CapexBudgetWF/reducer';



@NgModule({
  declarations: [DatagridcrudhomeComponent, DatagridcruddetailsComponent, HorizontalgridComponent, FormCellComponent, VerticalGridComponent, FormTextInputComponent, DatagridngrxComponent, EditorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    //AgGridModule,
    MaterialmodulesModule,
    FormsModule,
    NgrxFormsModule,
    AgGridModule.withComponents([FormCellComponent, FormTextInputComponent, EditorComponent]),
    StoreModule.forRoot({data: reducer}),
    //MaterialModule,
    // FlexLayoutModule,
    // ReactiveFormsModule,    
    // MaterialModule
  ],
  exports: [
    DatagridcrudhomeComponent, 
    DatagridcruddetailsComponent,
    VerticalGridComponent,
    HorizontalgridComponent,
    DatagridngrxComponent,
    EditorComponent
  ],
  entryComponents: [], 
})
export class DatagridcrudModule { }
