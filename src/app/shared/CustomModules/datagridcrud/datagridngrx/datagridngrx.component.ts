// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-datagridngrx',
//   templateUrl: './datagridngrx.component.html',
//   styleUrls: ['./datagridngrx.component.scss']
// })
// export class DatagridngrxComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

//==============================
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { Store, select } from '@ngrx/store';
import { AppState, getForm } from 'src/app/modules/workflows/workflowshome/CapexBudgetWF/reducer';
import { EditorComponent } from '../editor/editor.component';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ControlContainer, FormGroupDirective } from '@angular/forms';
import { Column, ColumnApi, GridApi, GridReadyEvent, RowNode } from 'ag-grid-community';

@Component({
  selector: 'app-datagridngrx',
  templateUrl: './datagridngrx.component.html',
  styleUrls: ['./datagridngrx.component.scss']
})
export class DatagridngrxComponent implements OnInit {
  gridOptions = <GridOptions>{
    getRowNodeId: data => data.id,
    deltaRowDataMode: true,
    singleClickEdit: true,
    //stopEditingWhenGridLosesFocus: true
  };
  colDefs: ColDef[] = [
    {
      headerName: 'ID',
      field: 'value.ID'
    },
    {
      headerName: 'Value',
      field: 'value.value',
      cellEditorFramework: EditorComponent,
      editable: true
    }
  ];
  form$ = this.store.pipe(
    select(getForm)
  );

  form;

  @ViewChild(AgGridAngular) grid: AgGridAngular;

  //==========implementing reactive form ====
  @Input() formGroup: FormGroup;
  @Input() 
  gridControlName: any;

  @Input()
  public requestInfo: any;

  edit() {
    
    this.grid.api.startEditingCell({
      rowIndex: 0,
      colKey: 'value.value',
    });
  }

  constructor(
    private store: Store<AppState>,
    parent: FormGroupDirective,
    public controlContainer: ControlContainer,
    ) {
    this.form$.subscribe(f => {
      this.form = f;
    });
    //this.formGroup = parent.control;
  }  

  ngOnInit(): void {
  }

  getContext() {
    return {
      formArray: this.formGroup.controls[this.gridControlName],
      //formArray: this.gridForm.controls.stock,
      createKey: this.createKey
    };
  }
  private createKey(columnApi: ColumnApi, column: Column): any {
    return column.getColDef().field;
  }
}

