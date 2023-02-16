// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-datagridreactiveformhome',
//   templateUrl: './datagridreactiveformhome.component.html',
//   styleUrls: ['./datagridreactiveformhome.component.scss']
// })
// export class DatagridreactiveformhomeComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

//====================================
import {Component, OnInit} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {GridOptions} from '@ag-grid-community/core';
import {AgGridFormControl} from './ag-grid-formcontrol';
//import {REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";

import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    //directives: [AgGridAngular, AgGridFormControl, REACTIVE_FORM_DIRECTIVES],
    providers: [FormBuilder]
})
export class DatagridreactiveformhomeComponent implements OnInit{

    myForm: FormGroup;
    myFormControl: FormControl;

    modules = [ClientSideRowModelModule];

    constructor(builder: FormBuilder) {
        this.myForm = builder.group(
            {myFormControl: new FormControl(null, Validators.required)});
    }

    ngOnInit(): void {
    }

    rowData: any[] = [
        {position: 1, firstName: "Jarryd", lastName: "Hayne"},
        {position: 2, firstName: "Anthony", lastName: "Don"},
        {position: 3, firstName: "Josh", lastName: "Hoffman"},
        {position: 4, firstName: "Konrad", lastName: "Hurrell"},
        {position: 5, firstName: "Nene", lastName: "Macdonald"},
        {position: 6, firstName: "Tyrone", lastName: "Roberts"},
        {position: 7, firstName: "Ashley", lastName: "Taylor"},
        {position: 16, firstName: "Agnatius", lastName: "Paasi"},
        {position: 9, firstName: "Nathan", lastName: "Peats"},
        {position: 10, firstName: "Ryan", lastName: "James"},
        {position: 11, firstName: "Zeb", lastName: "Taia"},
        {position: 12, firstName: "Chris", lastName: "McQueen"},
        {position: 13, firstName: "Greg", lastName: "Bird"}
    ];

    columnDefs: any[] = [
        {headerName: "Position", field: "position", checkboxSelection: true},
        {headerName: "First Name", field: "firstName"},
        {headerName: "Last Name", field: "lastName"}
    ];

    get value(): string {
        var s: string = '';
        s += ' touched: ' + JSON.stringify(this.myForm.touched, null, 2) + '\n';
        s += ' dirty: ' + JSON.stringify(this.myForm.dirty, null, 2) + '\n';
        s += ' invalid: ' + JSON.stringify(this.myForm.invalid, null, 2) + '\n';
        s += ' pending: ' + JSON.stringify(this.myForm.pending, null, 2) + '\n';
        s += ' pristine: ' + JSON.stringify(this.myForm.pristine, null, 2) + '\n';
        s += ' untouched: ' + JSON.stringify(this.myForm.untouched, null, 2) + '\n';
        s += ' errors: ' + JSON.stringify(this.myForm.errors, null, 2) + '\n';
        s += ' valid: ' + JSON.stringify(this.myForm.valid, null, 2) + '\n';
        s += 'value' + JSON.stringify(this.myForm.value, null, 2) + '\n';
        return s;
    }

}
