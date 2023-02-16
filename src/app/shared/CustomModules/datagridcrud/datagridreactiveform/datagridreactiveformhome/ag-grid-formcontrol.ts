import { AgGridAngular } from 'ag-grid-angular';
import {GridOptions} from '@ag-grid-community/core';
import {Component, Input, Output, EventEmitter, forwardRef, Provider, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';

//any ideas how to replace deprecated Provider?
//const MULTISELECT_VALUE_ACCESSOR: Provider = new Provider(NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => AgGridFormControl),multi: true});

@Component({
    selector: 'ag-grid-formcontrol',
    template: `
         <ag-grid-angular style="height: 400px;" class="ag-fresh"  [gridOptions]="gridOptions">    </ag-grid-angular>
    `,
    //providers: [MULTISELECT_VALUE_ACCESSOR],
    //directives: [AgGridAngular]
})
export class AgGridFormControl implements ControlValueAccessor, OnInit {
    private gridOptions: GridOptions;

    ngOnInit() {
        this.gridOptions = <GridOptions>{};
        this.gridOptions.rowData = this.rowData;
        this.gridOptions.columnDefs = this.columnDefs;
        this.gridOptions.onSelectionChanged = this.onSelectionChanged;
        this.gridOptions.rowSelection = "multiple"
    }

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Input() rowData: any[];

    @Input() columnDefs: any[];

    value: any[];

     onModelChange: Function = (value: any[]) => {
     };

    onModelTouched: Function = (): boolean => {
        return this.touched;
    };

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    touched: boolean = false;

    onSelectionChanged = (params: any): void => {
        let selectedRows: any[]=this.gridOptions.api.getSelectedRows();
        if (selectedRows.length===0){
            //necessary for Validators.required to work
            this.value = null
        } else {
            this.value = this.gridOptions.api.getSelectedRows();
        }
        this.touched = true;
        this.onModelChange(this.value);
        this.onModelTouched();
        this.onChange.emit({originalEvent: event, value: this.value});
    }
}

