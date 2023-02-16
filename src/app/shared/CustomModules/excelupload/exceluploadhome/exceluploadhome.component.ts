import { 
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Input,
  Output,
  EventEmitter } from '@angular/core';
  //=============for excel upload ========
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-exceluploadhome',
  templateUrl: './exceluploadhome.component.html',
  styleUrls: ['./exceluploadhome.component.scss']
})
export class ExceluploadhomeComponent implements OnInit {

    //###============for bulk upload start ====
    spinnerEnabled = false;
    keys: string[];
    dataSheet = new Subject();
    @ViewChild('inputFile') inputFile: ElementRef;
    isExcelFile: boolean;
    //--------------------bulk upload ends ----

    renderExcelItems = false;
    @Input() formGroup: FormGroup;

    @Output('excelDataLoaded') outputToParent = new EventEmitter<any>();

    excelUploadedData;

    //@Output() outputToParent = new EventEmitter<any>();

    @Output() btnClickAction: EventEmitter<any> = new EventEmitter<any>();

  constructor(public controlContainer: ControlContainer, parent: FormGroupDirective) { this.formGroup = parent.control; }

  ngOnInit(): void {
  }

    //===## Bulk upload starts ###====
    onChange(evt) {
    
      let data, header;
      const target: DataTransfer = <DataTransfer>(evt.target);
      this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
      if (target.files.length > 1) {
        this.inputFile.nativeElement.value = '';
      }
      if (this.isExcelFile) {
        this.spinnerEnabled = true;
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
          /* read workbook */
          const bstr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
  
          /* grab first sheet */
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
          /* save data */
          data = XLSX.utils.sheet_to_json(ws);

          //----- populate dataTableGrid with excell data ends ------  
          this.excelUploadedData = data;                
          this.renderExcelItems = true;
          this.outputToParent.emit(data);
          //this.outputToParent.emit(this.excelUploadedData);
          this.btnClickAction.emit('Submitted');
          
          //--------validation starts with if-else looping-------
  
        };
  
        reader.readAsBinaryString(target.files[0]);
  
        // reader.onloadend = (e) => {
        //   this.spinnerEnabled = false;
        //   this.keys = Object.keys(data[0]);
        //   this.dataSheet.next(data);
        //   // /* check velidation start */
        //   let rowSl = 0;
        //   let msg = "";

        //   //----- populate dataTableGrid with excell data ends ------  
        //   this.excelUploadedData = data;                
        //   this.renderExcelItems = true;
        //   this.outputToParent.emit(data);
        //   //this.outputToParent.emit(this.excelUploadedData);
        //   this.btnClickAction.emit('Submitted');
          
        //   //--------validation starts with if-else looping-------
        //   // for(let d=0; d<data.length; d++){
        //   //   if(!data[d].hasOwnProperty("ClassCode")){
        //   //     d=data.length;
        //   //     alert("ClassCode field value is required in row: "+ (d+1));
        //   //     this.renderExcelItems = false;
        //   //     return false;
        //   //   }
        //   //   else if(!data[d].hasOwnProperty("BusinessArea")){
        //   //     alert("BusinessArea field value is required in row: "+ (d+1));
        //   //     d=data.length;
        //   //     this.renderExcelItems = false;
        //   //     return false;
        //   //   }
        //   //   else if(!data[d].hasOwnProperty("CostCenter")){
        //   //     alert("CostCenter field value is required in row: "+ (d+1));
        //   //     d=data.length;
        //   //     this.renderExcelItems = false;
        //   //     return false;
        //   //   }
        //   //   else if(!data[d].hasOwnProperty("BusinessArea")){
        //   //     alert("BusinessArea field value is required in row: "+ (d+1));
        //   //     d=data.length;
        //   //     this.renderExcelItems = false;
        //   //     return false;
        //   //   }
        //   //   else if(!data[d].hasOwnProperty("Justfication")){
        //   //     alert("Justfication field value is required in row: "+ (d+1));
        //   //   }
        //   //   else if(!data[d].hasOwnProperty("CurAvaCapacity")){
        //   //     alert("CurAvaCapacity field value is required in row: "+ (d+1));
        //   //     d=data.length;
        //   //     this.renderExcelItems = false;
        //   //     return false;
        //   //   }
        //   //   else if(!data[d].hasOwnProperty("ReqProdCapacity")){
        //   //     alert("ReqProdCapacity field value is required in row: "+ (d+1));
        //   //     d=data.length;
        //   //     this.renderExcelItems = false;
        //   //     return false;
        //   //   }
  
        //   //   else if(!data[d].hasOwnProperty("SalesForecast")){
        //   //     alert("SalesForecast field value is required in row: "+ (d+1));
        //   //     d=data.length;
        //   //     this.renderExcelItems = false;
        //   //     return false;
        //   //   }
        //   //   else if(!data[d].hasOwnProperty("ExpectedCapacity")){
        //   //     alert("ExpectedCapacity field value is required in row: "+ (d+1));
        //   //     d=data.length;
        //   //     this.renderExcelItems = false;
        //   //     return false;
        //   //   }
        //   //   else if(!data[d].hasOwnProperty("ExpComMonth")){
        //   //     alert("ExpComMonth field value is required in row: "+ (d+1));
        //   //     d=data.length;
        //   //     this.renderExcelItems = false;
        //   //     return false;
        //   //   }  
        //   //   else if(!data[d].hasOwnProperty("NewOrReplace")){
        //   //     alert("NewOrReplace field value is required in row: "+ (d+1));
        //   //     d=data.length;
        //   //     this.renderExcelItems = false;
        //   //     return false;
        //   //   }
        //   //   else if(!data[d].hasOwnProperty("ExistingAssetID")){
        //   //     alert("ExistingAssetID field value is required in row: "+ (d+1));
        //   //     this.renderExcelItems = false;
        //   //     d=data.length;
        //   //     return false;
        //   //   }
        //   //   else if(data[d].hasOwnProperty("ClassCode") && (data[d].ClassCode.length < 4 || data[d].ClassCode.length > 6)){
        //   //     d=data.length;
        //   //     alert("ClassCode field value should be 4-6 charecter in row: "+ (d+1));
        //   //     this.renderExcelItems = false;
        //   //     return false;
        //   //   }
        //   //   else if(data[d].hasOwnProperty("BusinessArea") && (data[d].BusinessArea.length < 4 || data[d].BusinessArea.length > 8)){
        //   //     d=data.length;
        //   //     alert("BusinessArea field value should be 4-8 charecter in row: "+ (d+1));
        //   //     this.renderExcelItems = false;
        //   //     return false;
        //   //   }
        //   //   else if(data[d].hasOwnProperty("CostCenter") && (data[d].CostCenter.length < 4 || data[d].CostCenter.length > 8)){
        //   //     d=data.length;
        //   //     alert("CostCenter field value should be 4-8 charecter in row: "+ (d+1));
        //   //     this.renderExcelItems = false;
        //   //     return false;
        //   //   }
        //   //   else if(!(data[d].ClassCode.toString().match(/^[0-9]+(\.?[0-9]+)?$/))){
        //   //     d=data.length;
        //   //     alert("ClassCode field value should be valid number in row: "+ (d+1));
        //   //     this.renderExcelItems = false;
        //   //     return false;
        //   //   }
        //   //   else if(!(data[d].BusinessArea.toString().match(/^[0-9]+(\.?[0-9]+)?$/))){
        //   //     d=data.length;
        //   //     alert("BusinessArea field value should be valid number in row: "+ (d+1));
        //   //     this.renderExcelItems = false;
        //   //     return false;
        //   //   }
        //   //   else if(!(data[d].CostCenter.toString().match(/^[0-9]+(\.?[0-9]+)?$/))){
        //   //     d=data.length;
        //   //     alert("CostCenter field value should be valid number in row: "+ (d+1));
        //   //     this.renderExcelItems = false;
        //   //     return false;
        //   //   }
        //   //   else{
        //   //       /* mapping renderedGridDataSl column */
        //   //       data = data.map((row, index) => {
        //   //         return { ...row, renderedGridDataSl: index + 1 };
        //   //       });
        //   //       //this.backupRowData = data;
        //   //       //this.rowData = data;
        //   //       //this.mpTG.gridApi.setRowData(data);
        //   //       //----- populate dataTableGrid with excell data ends ------  
        //   //       this.excelUploadedData = data;                
        //   //       this.renderExcelItems = true;
        //   //       this.outputToParent.emit(data);
        //   //       //this.outputToParent.emit(this.excelUploadedData);
        //   //       this.btnClickAction.emit('Submitted');
        //   //   }
        //   // }
        //   //--------validation ends -------
        // }
  
      } else {
        this.inputFile.nativeElement.value = '';
        alert("Please upload a valid excel sheet !");
      }
    }

    // GetOutputVal(valFrmChild: any) {
    //   this.outputToParent.emit(this.excelUploadedData);
  
    // }

    approverAction(action){
      //if(action == "Submitted"){this._form.value.Datagridcrudhomeitems = this.createReqInfoFrmChild}
      this.outputToParent.emit(this.excelUploadedData);
      this.btnClickAction.emit(action);    
    }

}
