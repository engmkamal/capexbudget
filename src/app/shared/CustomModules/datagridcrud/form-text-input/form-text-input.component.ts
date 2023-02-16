// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-form-text-input',
//   templateUrl: './form-text-input.component.html',
//   styleUrls: ['./form-text-input.component.scss']
// })
// export class FormTextInputComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
//==============================
import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams, ICellRendererParams } from 'ag-grid-community';

/**
 * Text field component for {@link AgFormComponent}
 *
 * Each cell is added under a formGroup object. Identifying the formGroup differs based on vertical/horizontal table.
 *
 * In case of vertical table, we are finding the column index and retrieve the corresponding formGroup from it. And, then
 * we are find the correct key for formControlName based on the name property.
 *
 * In case of horizontal table, key is identified by the col header. And formGroup is identified by row index. In case,
 * any rows are hidden, then we are identifying using the name property.
 *
 *
 */
@Component({
  // selector: 'app-form-text-input',
  // templateUrl: './form-text-input.component.html',
  // styleUrls: ['./form-text-input.component.scss'],
  selector: 'form-textInput',
  template: `
    <div *ngIf="formArray" [formGroup]="formGroup">
      <input type="text" [formControlName]="key" pInputText style="width:100%" />
    </div>
  `
})
export class FormTextInputComponent implements ICellRendererAngularComp {
  formArray: FormArray;
  formGroup: FormGroup;
  key: string;

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {}

  agInit(params: ICellRendererParams) {
    this.formArray = params.context.formArray;

    const colId = params.column.getColDef().field;
    const colIndex = params.columnApi
      .getAllColumns()
      .map(c => c.getColDef().field)
      .findIndex(name => name === colId);

    // Retrieves the form group based on the colIndex;
    this.formGroup = this.formArray.at(colIndex - 1) as FormGroup;

    // Retrieves the form Control
    this.key = params.data['name'];
  }

  refresh(params: any): boolean {
    return true;
  }
}
