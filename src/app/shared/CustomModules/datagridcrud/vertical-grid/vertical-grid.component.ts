// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-vertical-grid',
//   templateUrl: './vertical-grid.component.html',
//   styleUrls: ['./vertical-grid.component.scss']
// })
// export class VerticalGridComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

//===================================
import { Component, OnInit, Input } from '@angular/core';
import { GridReadyEvent, GridApi, ColumnApi, ColDef } from 'ag-grid-community';
//import { EmployeeService, Employee } from '../../employee.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Utils } from '../util';
import { FormTextInputComponent } from '../form-text-input/form-text-input.component';

export interface Employee {
  name?: string;
  age?: number;
  phone?: string;
}



@Component({
  selector: 'app-vertical-grid',
  templateUrl: './vertical-grid.component.html',
  styleUrls: ['./vertical-grid.component.scss']
})
export class VerticalGridComponent implements OnInit {
  form: FormGroup;
  name: string;
  private api: GridApi;
  private columnApi: ColumnApi;
  rowData: any[];
  columnDefs: ColDef[];

  get employeesFormArray(): FormArray {
    return this.form.get('employees') as FormArray;
  }

  frameworkComponents = {
    formTextInput: FormTextInputComponent
  };

  employeeData: Employee[] = [
    {
      name: 'Susanne',
      age: 26,
      phone: '+1 (891) 532-2146'
    },
    {
      name: 'Gaines',
      age: 29,
      phone: '+1 (971) 438-3239'
    },
    {
      name: 'Gonzalez',
      age: 35,
      phone: '+1 (896) 482-3953'
    },
    {
      name: 'Knight',
      age: 37,
      phone: '+1 (978) 597-3997'
    },
    {
      name: 'Jackson',
      age: 26,
      phone: '+1 (910) 522-3671'
    },
    {
      name: 'Allison',
      age: 29,
      phone: '+1 (849) 596-2631'
    },
    {
      name: 'Alexander',
      age: 39,
      phone: '+1 (876) 546-2970'
    }
  ];

  @Input()
  public requestInfo: any;

  @Input() 
  formGroup: FormGroup;

  constructor(
    //private service: EmployeeService, 
    private fb: FormBuilder
    ) {}

  ngOnInit() {
    // //const employeeData = this.service.getEmployees();
    const employeeData = this.employeeData;
    this.rowData = Utils.transposeData(employeeData, 'name');

    

    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'name',
        pinned: 'left',
        editable: true
      }
    ];

    const employeeName = employeeData.map(e => e.name);
    employeeName.forEach(eName => this.columnDefs.push(this.newColDef(eName)));

    this.form = this.fb.group({
      employees: this.fb.array(this.getEmployeeFormArray(employeeData))
    });

    this.formGroup.addControl('Requestor', this.fb.group(this.form));
  }

  deleteName() {
    const allRecords: Employee[] = this.employeesFormArray.value;
    const index = allRecords.findIndex(e => e.name === this.name);

    const formArray = this.employeesFormArray as FormArray;
    formArray.removeAt(index);

    const columnDefs = this.columnDefs.filter(def => def.field !== this.name);
    this.columnDefs = columnDefs;
  }

  addNewName() {
    const newEmployeeFG = this.fb.group({
      name: this.name,
      age: 0,
      phone: ''
    });

    const newEmployeeColDef = this.newColDef(this.name);

    const formArray = this.employeesFormArray as FormArray;
    formArray.push(newEmployeeFG);

    const columnDefs = this.columnApi.getAllColumns().map(col => col.getColDef());
    columnDefs.push(newEmployeeColDef);

    this.columnDefs = columnDefs;
  }

  getContext() {
    let fa = this.employeesFormArray;
    return {
      formArray: this.employeesFormArray
    };
  }
  getEmployeeFormArray(data: Employee[]): any {
    return data.map(d =>
      this.fb.group({
        name: d.name,
        age: d.age,
        phone: d.phone
      })
    );
  }

  gridReady(params: GridReadyEvent) {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }

  private newColDef(langName: string): ColDef {
    return {
      headerName: langName,
      field: langName,
      cellRenderer: 'formTextInput',
      suppressSorting: true
    };
  }
}
