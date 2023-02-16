// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-form-cell',
//   templateUrl: './form-cell.component.html',
//   styleUrls: ['./form-cell.component.scss']
// })
// export class FormCellComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

///////////////////============================


import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cell',
  template: `
    <div *ngIf="formArray" [formGroup]="formGroup">
        <input type="text" [formControlName]="key" pInputText style="width:100%" [ngClass]="{'invalid' : formErrors[key]}"/> 
    </div>
  `,
  styleUrls: ['./form-cell.component.scss']
})
export class FormCellComponent {
  formArray: FormArray;
  formGroup: FormGroup;

  key: string;
  index: number;
  columnName: string;

  validationMessages= 
  { 
    ClassCode: { required: "ClassCode is required !", minlength: "ClassCode must be greater than 2 charecters !", maxlength: "ClassCode must be less than 8 charecters !"}, 
    ClassDescription: '', 
    BusinessArea: { required: "BusinessArea is required !", minlength: "BusinessArea must be greater than 2 charecters !", maxlength: "BusinessArea must be less than 8 charecters !"}, 
    AreaDescription: '', 
    CostCenter: { required: "CostCenter is required !", minlength: "CostCenter must be greater than 4 charecters !", maxlength: "CostCenter must be less than 8 charecters !"}, 
    CCDescription: "", 
    ProposedItemDescription: '',
    ImportOrLocal: { required: "ImportOrLocal is required !", minlength: "ImportOrLocal must be greater than 5 charecters !", maxlength: "ImportOrLocal must be less than 50 charecters !"}, 
    Qty: 1, 
    UM: 'NOS', 
    UnitPrice: "", 
    TotalBDT: '', 
    Justfication: { required: "Justfication is required !", minlength: "Justfication must be greater than 5 charecters !", maxlength: "Justfication must be less than 50 charecters !"},
    UserName: '', 
    UserEmpID: '', 
    '5YearPlan': { required: "5YearPlan is required !", minlength: "5YearPlan must be greater than 2 charecters !", maxlength: "5YearPlan must be less than 3 charecters !"}, 
    CurAvaCapacity: { required: "CurAvaCapacity is required !", minlength: "CurAvaCapacity must be greater than 5 charecters !", maxlength: "CurAvaCapacity must be less than 50 charecters !"}, 
    ReqProdCapacity: { required: "ReqProdCapacity is required !", minlength: "ReqProdCapacity must be greater than 5 charecters !", maxlength: "ReqProdCapacity must be less than 50 charecters !"},
    SalesForecast: { required: "SalesForecast is required !", minlength: "SalesForecast must be greater than 5 charecters !", maxlength: "SalesForecast must be less than 50 charecters !"}, 
    ExpectedCapacity: '', 
    ExpComMonth: { required: "ExpComMonth is required !", minlength: "ExpComMonth must be greater than 5 charecters !", maxlength: "ExpComMonth must be less than 50 charecters !"}, 
    NewOrReplace: { required: "NewOrReplace is required !", minlength: "NewOrReplace must be greater than 5 charecters !", maxlength: "NewOrReplace must be less than 50 charecters !"}, 
    ExistingAssetID: "", 
    CAPEXStrategy: '', 
    Comments: ''
  };

  formErrors =
  { 
    ClassCode: "", ClassDescription: '', BusinessArea: "", AreaDescription: '', CostCenter: '', CCDescription: "", ProposedItemDescription: '',
    ImportOrLocal: "", Qty: "", UM: "", UnitPrice: "", TotalBDT: '', Justfication: '',
    UserName: '', UserEmpID: '', '5YearPlan': '', CurAvaCapacity: '', ReqProdCapacity: "",
    SalesForecast: '', ExpectedCapacity: '', ExpComMonth: '', NewOrReplace: '', ExistingAssetID: "", CAPEXStrategy: '', Comments: ''
  };
  

  agInit(params: any) {
    this.formArray = params.context.formArray;
    this.columnName = params.column.colDef.headerName;
    this.key = params.context.createKey(params.columnApi, params.column);
    this.index = params.rowIndex;
    this.formGroup = this.formArray.at(params.rowIndex) as FormGroup;

    this.formGroup.valueChanges.subscribe((value:any)=>{
      this.logValidationErrors(this.formGroup);
    })

    this.logValidationErrors(this.formGroup);

  }

  //logValidationErrors(group: FormGroup = this.formGroup): void {
    logValidationErrors(group: FormGroup = this.formGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid) {
          //if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  refresh(params: any): boolean {
    return true;
  }
}
