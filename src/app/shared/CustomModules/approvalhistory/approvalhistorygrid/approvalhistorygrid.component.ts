// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-approvalhistorygrid',
//   templateUrl: './approvalhistorygrid.component.html',
//   styleUrls: ['./approvalhistorygrid.component.scss']
// })
// export class ApprovalhistorygridComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
//============================
import { Component, OnInit, Input } from '@angular/core'; 
//import { FormGroup, ControlContainer, FormGroupDirective } from '@angular/forms';
//import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { GridReadyEvent, GridApi, ColumnApi } from 'ag-grid-community';
import * as moment from 'moment';
//import { BranchService } from '../../branch.service

@Component({
  selector: 'app-approvalhistorygrid',
  templateUrl: './approvalhistorygrid.component.html',
  styleUrls: ['./approvalhistorygrid.component.scss']
})
export class ApprovalhistorygridComponent implements OnInit{
  defaultColDef: any;
  columnDefs: any;
  rowData: any;

  @Input()
  public requestInfo: any;

  private api: GridApi;
  private columnApi: ColumnApi;  
  
  constructor() {
      //this.executeOnInitProcesses();
  }

  async executeOnInitProcesses(){    
    try{  
      this.defaultColDef = {
        flex: 1,
        minWidth: 50,
        resizable: true, //to resize; add resizable: false to any individual column to disable resizingng that col only
        enableValue: true,       
        sortable: true,
        editable: false
      };   

      if(this.requestInfo.hasOwnProperty('GridColDef') && this.requestInfo.hasOwnProperty('GridColVal')){
        this.columnDefs = this.requestInfo.GridColDef;
        this.rowData = this.requestInfo.GridColVal;
      }else{
        this.columnDefs = [
          { headerName: "Sl", valueGetter: "node.rowIndex + 1", editable: false, menuTabs: [], minWidth: 50,  maxWidth: 80 },
          //{ headerName: 'Date', field: 'Date', editable:false, menuTabs: [], minWidth: 100 },
          {
            headerName:"Date",
              //valueGetter: function (params) { if (params.data[el.valueGetter] != null && params.data[el.valueGetter] != undefined) { return moment((params.data[el.valueGetter]).split("T")[0]).format("DD MMM, YYYY"); } },
              field: "Date",
              valueFormatter: function(params) {
                  return moment(params.value).format('DD MMM, YYYY');
              },
              editable:false,
              minWidth: 200,
              menuTabs: [],
          },
          { headerName: 'Action By', field: 'ActionBy', editable:false, menuTabs: [], minWidth: 200 },
          { headerName: 'Comments', field: 'Comments', editable:false, menuTabs: [], minWidth: 200 }
        ];
  
        this.rowData = this.requestInfo;
      }
      
      // [
      //   {orderNumber: 1, Date: 'Date', ActionBy: "ActionBy" , Comments: 'Comments'}
      // ]
    } 
    catch(err){
      console.log("Error: " + err)
    }
  }

  ngOnInit(): void {
    this.executeOnInitProcesses();
  }

  gridReady(params: GridReadyEvent) {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }

}

