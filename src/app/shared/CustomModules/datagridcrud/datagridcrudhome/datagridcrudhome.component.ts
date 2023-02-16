import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
//========to covert promise to observer======
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ControlContainer, FormGroupDirective } from '@angular/forms';
import {
  from,
  forkJoin,
  combineLatest,
  Observable,
  Subscription
} from 'rxjs';

import { map, mergeAll } from 'rxjs/operators';

import { Tablegrid } from 'src/app/shared/models/classes/tablegrid';

//===========for date formate ======
import * as moment from 'moment';
//---------date formate ends ---
import { SharepointlistService } from 'src/app/shared/services/sharepointlist.service';
//import { LiactionbtncstmComponent } from 'src/app/shared/components/liactionbtncstm/liactionbtncstm.component';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import { HttpClient } from '@angular/common/http';


import { Module } from '@ag-grid-community/core';



// import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
// import { MenuModule } from '@ag-grid-enterprise/menu';
// import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';


//import { dashboardsListsInfo } from "../listdatainfo";
import { ActivatedRoute } from '@angular/router'; // to read the url route

//=========for voice recognition ===========
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { DIR_DOCUMENT } from '@angular/cdk/bidi';
import { RippleRef } from '@angular/material';
import { SharepointworkflowService } from 'src/app/shared/services/sharepointworkflow.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { io } from 'socket.io-client';
const configKey = makeStateKey('CONFIG');
//------------

//====import data from local storage ==
import * as fs from 'fs';
import * as path from 'path';
import { DatagridcruddetailsComponent } from '../datagridcruddetails/datagridcruddetails.component';
//import { ClientSideRowModelModule, RangeSelectionModule } from '@ag-grid-enterprise/all-modules';

import { AllCommunityModules } from '@ag-grid-community/all-modules';

import { AllModules } from "@ag-grid-enterprise/all-modules";
//import * as recent from "../../../../../businessprocesslocaldata/EmployeeReimbursement/ReimburseMaster/recent.json";

//=============for excel upload ========
import * as XLSX from 'xlsx';
//import { Subject } from 'rxjs/Subject';
import { Subject } from 'rxjs';


import { GridOptions, Column, ColumnApi, GridApi, GridReadyEvent, RowNode, CellClickedEvent, IDatasource } from 'ag-grid-community';
import { FormCellComponent } from '../form-cell/form-cell.component';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { json } from 'express';
const dashboardsListsInfo = []; //should be pass data as input 

declare var webkitSpeechRecognition: any; // for voice recognition

function actionCellRenderer(params) {
  let eGui = document.createElement("div");

  let editingCells = params.api.getEditingCells();
  // checks if the rowIndex matches in at least one of the editing cells
  let isCurrentRowEditing = editingCells.some((cell) => {
    return cell.rowIndex === params.node.rowIndex;
  });

  if (isCurrentRowEditing) {
    eGui.innerHTML = `
      <button  class="action-button update"  data-action="update"> update  </button>
      <button  class="action-button cancel"  data-action="cancel" > cancel </button>
      `;
    } else {
      eGui.innerHTML = `
        <button class="action-button add"  data-action="add" > Add  </button>
        <button class="action-button edit"  data-action="edit" > Edit  </button>
        <button class="action-button delete" data-action="delete" > Delete </button>
        `;
    }
    return eGui;
}


@Component({
  selector: 'app-datagridcrudhome',
  templateUrl: './datagridcrudhome.component.html',
  styleUrls: ['./datagridcrudhome.component.scss']  
})
export class DatagridcrudhomeComponent implements OnInit, AfterViewInit {
  public rowDataCM: string;
  public rowDataWP: any;
  mpTG = new Tablegrid();
  public workflows = [];
  rowData: any;
  public txtOfQuickSearchInpFld;
  public rowHeight;

  public logedInUser = { 
    aDId: "",
    name: "",
    email: "",
    empID: "",
    office: "",
    access: "", 
  };

  public listInfo = {
    name: "",
    query: "",
    expand: "",
    select: "",
    filter: "",
    orderByPrm: "",
    orderByVal: false,
    top: 20,
  };


  public detListInfo = {
    name: "",
    query: "",
    expand: "",
    select: "",
    filter: "",
    top: 200000,
  };

  //=========for infinite scrolling and lazy loading start=========
  public rowBuffer;
  public rowSelection;
  public rowModelType;
  public paginationPageSize;
  public cacheOverflowSize;
  public maxConcurrentDatasourceRequests;
  public infiniteInitialRowCount;
  public maxBlocksInCache;
  public modules: any[] = [ClientSideRowModelModule, AllCommunityModules, AllModules];
  // public modules: Module[] = [
  //   ClientSideRowModelModule,
  //   MenuModule,
  //   ColumnsToolPanelModule,
  // ];
  public components;

  private onGridReadyParamsApi;

  private dbTagUrlInfo ={ 
    titleTag: '',
    urlVoice : '',
    qryStrKeyVal: '',
    qryStrKeyTyp: 'GUID',
    mode1: '',
    mode2: ''
  }



  @ViewChild('filterTextBox') filterTextBox;
  

  public clickedDashboardInfo = { 
    wfName: '',
    acessPermission: '',
    listIndex: 0,
    serviceFnName: 'fetchListItemWithExpStFilOrd',
    config: {},
    mapedData: {d:[]},
    recMstLocDat: {d:[]}
  };

  socket;
  recentMstLocData;

  //###============for bulk upload start ====
  // spinnerEnabled = false;
  // keys: string[];
  // dataSheet = new Subject();
  // @ViewChild('inputFile') inputFile: ElementRef;
  // isExcelFile: boolean;
  //--------------------bulk upload ends ----

  isEditableDefaultColDef:boolean = false;

  @Input()
  public requestInfo: any;

  //======for reactive forms implementation ===
  private mediaSub: Subscription;
  Requestor: FormGroup;
  date = new FormControl(moment());
  

  @Input()
  public requestorsInfo: any;

  @Input() formGroup: FormGroup;

  @Input() 
  gridControlName: any;

  private rowDataAfterCrud =[];

  //-------------------------

  private backupRowData;
  private gridControlsOnInit; //to store gridControlsOnInit for future reset 
  action = "loadOnInit";  
  public renderExcelItems = true;

  validationMessages = 
  { 
    ClassCode: { required: "ClassCode is required !"},
    BusinessArea: { required: "BusinessArea is required !"},
    CostCenter: { required: "CostCenter is required !"}, 
    Justfication: { required: "Justfication is required !"}, 
    CurAvaCapacity: { required: "CurAvaCapacity is required !"},

    // ImportOrLocal: 'Import', Qty: 1, UM: 'NOS', UnitPrice: "", TotalBDT: '', Justfication: '',
    // UserName: '', UserEmpID: '', '5YearPlan': '', CurAvaCapacity: '', ReqProdCapacity: "",
    // SalesForecast: '', ExpectedCapacity: '', ExpComMonth: '', NewOrReplace: '', ExistingAssetID: "", CAPEXStrategy: '', Comments: ''},
  };

  @Output('gridData') outputToParent = new EventEmitter<any>();

  private gridRowItemsToEmit = {
    onInitItems : [],
    newRowData: [],
    deletedRowItems : [],
    updatedRowItems : [],
    addedRowItems : []
  };

  //GridApi:GridApi;
  editType;

  constructor(
    private sharepointlistService: SharepointlistService,
    private sharepointworkflowService: SharepointworkflowService,
    private _actRoute: ActivatedRoute,
    private websocketService: WebsocketService,
    private http: HttpClient,
    public controlContainer: ControlContainer,
    parent: FormGroupDirective, 
    private fb: FormBuilder
    ) { 
      this.formGroup = parent.control;
     }


  updateLocalStorage(){
     //emit recently fetched data from SP list to local server to rewrite local storage 
     let writeToFile = this.clickedDashboardInfo.config['WfName'] +'/'+  this.clickedDashboardInfo.config['MasterListInfo'].name +'/recent.json' ;
     let config ={
      proName: this.clickedDashboardInfo.config['WfName'],
      fileName: writeToFile
     }

     return new Promise((resolve, reject)=>{
      if(this.clickedDashboardInfo.mapedData.d.length >0){     
        
        let emitData:any = new Observable(emitDataOutput =>{ 
          let emitService = this.websocketService.emit('updateData', (this.clickedDashboardInfo.mapedData.d).slice(0, 20), config);         
          emitDataOutput.next(emitService);

          emitDataOutput.next(emitData.unsubscribe());
        })

        emitData.subscribe(res => {
          //res;
        })

        emitData.unsubscribe();
        //this.websocketService.emit('updateData', (this.clickedDashboardInfo.mapedData.d).slice(0, 20), config);
        //resolve("updateData successfull !"); 

        reject("updateData successfull !");
      }else{
         console.log("Mapped Data is not available to update with !")
       }      
    })     
  }

  getMappedData(){ 
    //========mapping for EmployeeReimbursement===========  
    return new Promise((resolve, reject)=>{
      if(this.clickedDashboardInfo.wfName == 'EmployeeReimbursement'){
        let mapedData = (JSON.parse((JSON.stringify(this.rowData)))).map(e => ({
          Title: e.Title,
          ID: e.ID,
          GUID: e.GUID,
          Modified: e.Modified,
          Created: e.Created,
          Status: e.Status,
          PendingWith: { ID: e.PendingWith.ID, Title: e.PendingWith.Title },
          Author: { ID: e.Author.ID, Title: e.Author.Title, Office: e.Author.Office, JobTitle: e.Author.JobTitle },
          EmployeeId: e.EmployeeId,
          Entitlement: e.Entitlement,
          GLCode: e.GLCode,
          CostCenter: e.CostCenter,
          TotalReimbursementAmount: e.TotalReimbursementAmount,
          ItemName: e.ItemName
        })) 
  
        //update local in memory from storage by recently fetched data from SP list 
        this.clickedDashboardInfo.mapedData.d = mapedData;
  
        setTimeout(function(){ 
          //======performane testing =====
          const startForEach = performance.now()
          mapedData.forEach(x => (x + x) * 10000000000)
          const endForEach = performance.now()
          console.log(`Speed [forEach]: ${endForEach - startForEach} miliseconds`)
  
          const startMap = performance.now()
          mapedData.map(x => (x + x) * 10000000000)
          const endMap = performance.now()
          console.log(`Speed [map]: ${endMap - startMap} miliseconds`)
          //-----------------------  
        }, 1000);

        resolve(mapedData);
        return mapedData;
      }
      
      else if(this.clickedDashboardInfo.wfName == 'MobileHandsetRequests'){
        let mapedData = (JSON.parse((JSON.stringify(this.rowData)))).map(e => ({
          Title: e.Title,
          ID: e.ID,
          GUID: e.GUID,
          Modified: e.Modified,
          Created: e.Created,
          Status: e.Status,
          PendingWith: { ID: e.PendingWith.ID, Title: e.PendingWith.Title },
          Author: { ID: e.Author.ID, Title: e.Author.Title, Office: e.Author.Office, JobTitle: e.Author.JobTitle },
          EmployeeId: e.EmployeeId,
          Justification: e.Justification
        })) 
  
        //update local in memory from storage by recently fetched data from SP list 
        this.clickedDashboardInfo.mapedData.d = mapedData;
  
        setTimeout(function(){ 
          //======performane testing =====
          const startForEach = performance.now()
          mapedData.forEach(x => (x + x) * 10000000000)
          const endForEach = performance.now()
          console.log(`Speed [forEach]: ${endForEach - startForEach} miliseconds`)
  
          const startMap = performance.now()
          mapedData.map(x => (x + x) * 10000000000)
          const endMap = performance.now()
          console.log(`Speed [map]: ${endMap - startMap} miliseconds`)
          //-----------------------  
        }, 1000);

        resolve(mapedData);
        return mapedData;
      }

      else if(this.clickedDashboardInfo.wfName == 'PoolCarRequisition'){
        let mapedData = (JSON.parse((JSON.stringify(this.rowData)))).map(e => ({
          Title: e.Title,
          ID: e.ID,
          GUID: e.GUID,
          Modified: e.Modified,
          Created: e.Created,
          Status: e.Status,
          PendingWith: { ID: e.PendingWith.ID, Title: e.PendingWith.Title },
          Author: { ID: e.Author.ID, Title: e.Author.Title, Office: e.Author.Office, JobTitle: e.Author.JobTitle },
          EmployeeId: e.EmployeeId,
          StartDate: e.StartDate,
          EndDate: e.EndDate,
          NoOfDays: e.NoOfDays,
          StartTime: e.StartTime,
          EndTime: e.EndTime,
          TotalHours: e.TotalHours,
          AccompaniedPersonNo: e.AccompaniedPersonNo,
          AccompaniedPersonsName: e.AccompaniedPersonsName,
          PurposeOfVisit: e.PurposeOfVisit
        })) 
        this.clickedDashboardInfo.mapedData.d = mapedData;     

        resolve(mapedData);
        return mapedData;
      }

      else if(this.clickedDashboardInfo.wfName == 'EmployeeAdvanceRequest'){
        let mapedData = (JSON.parse((JSON.stringify(this.rowData)))).map(e => ({
          Title: e.Title,
          ID: e.ID,
          GUID: e.GUID,
          Modified: e.Modified,
          Created: e.Created,
          Status: e.Status,
          PendingWith: { ID: e.PendingWith.ID, Title: e.PendingWith.Title },
          Author: { ID: e.Author.ID, Title: e.Author.Title, Office: e.Author.Office, JobTitle: e.Author.JobTitle },
          EmployeeId: e.EmployeeId,
          Description: e.Description,
          Amount: e.Amount,
          Date: e.Date,
          PurposeType: e.PurposeType,
          Purpose: e.Purpose,
          Location: e.Location,
          AdjustmentAmount: e.AdjustmentAmount,
          ReasonNotAdjust: e.ReasonNotAdjust,
          ActualExpenditureDate: e.ActualExpenditureDate,
          ActualExpenditureAmount: e.ActualExpenditureAmount,
          ClaimOrRefundAmountDate: e.ClaimOrRefundAmountDate,
          ClaimOrRefundAmount: e.ClaimOrRefundAmount,
          MRNO: e.MRNO,
          IsAdjusted: e.IsAdjusted
        })) 

  
        //update local in memory from storage by recently fetched data from SP list 
        this.clickedDashboardInfo.mapedData.d = mapedData;     

        resolve(mapedData);
        return mapedData;
      }

      else if(this.clickedDashboardInfo.wfName == 'EmployeePaintDiscount'){
        let mapedData = (JSON.parse((JSON.stringify(this.rowData)))).map(e => ({
          Title: e.Title,
          ID: e.ID,
          GUID: e.GUID,
          Modified: e.Modified,
          Created: e.Created,
          Status: e.Status,
          PendingWith: { ID: e.PendingWith.ID, Title: e.PendingWith.Title },
          Author: { ID: e.Author.ID, Title: e.Author.Title, Office: e.Author.Office, JobTitle: e.Author.JobTitle },
          EmployeeId: e.EmployeeId,
          DeliveryOffice: e.DeliveryOffice
        })) 
  
        //update local in memory from storage by recently fetched data from SP list 
        this.clickedDashboardInfo.mapedData.d = mapedData;

        resolve(mapedData);
        return mapedData;
      }

      else if(this.clickedDashboardInfo.wfName == 'HRServices'){
        let mapedData = (JSON.parse((JSON.stringify(this.rowData)))).map(e => ({
          Title: e.Title,
          ID: e.ID,
          GUID: e.GUID,
          Modified: e.Modified,
          Created: e.Created,
          Status: e.Status,
          PendingWith: { ID: e.PendingWith.ID, Title: e.PendingWith.Title },
          Author: { ID: e.Author.ID, Title: e.Author.Title, Office: e.Author.Office, JobTitle: e.Author.JobTitle },
          EmployeeId: e.EmployeeId,
          RequestFor: e.RequestFor,
          VisitPurpose: e.VisitPurpose,
          WhenNeed: e.WhenNeed,
          TaskAssignDate: e.TaskAssignDate,
          RequestedById: e.RequestedById
        })) 
  
        //update local in memory from storage by recently fetched data from SP list 
        this.clickedDashboardInfo.mapedData.d = mapedData;

        resolve(mapedData);
        //return mapedData;
      }
    })
      
     

          
    //------mapping ends---------
  }

  async getGridReadyprocesses(){
    try{
      await this.getSelectedDashboardInfo(this.clickedDashboardInfo);
      await this.getRowData(this.clickedDashboardInfo);
      //await this.getTitleTag(this.rowData);
      // # map data of this dashboard SP list  #
      //await this.getMappedData();
      // # emit to loc Server to strore in loc file #
      //await this.updateLocalStorage();   
      //this.websocketService.subscribe();   
    } 
    catch(err){
      console.log("Error: " + err)
    }
  }

  ngAfterViewInit(){
    // let input = this.requestInfo.GridControlsArray[0].ClassCode;
    // alert("ttttttttttt: "+ input);
    //alert('ngAfterViewInit called before onGridReady() and after ngOnInit() ...............');    
  }



  createFormControls() {
    if(this.action == "addRowData"){
      let columns = this.mpTG.gridColumnApi.getAllColumns();
      const gridFormArray = <FormArray>this.formGroup.controls[this.gridControlName];
      
      // // /*creating form group by parent component controlObject starts*/      
      // if(this.requestInfo.hasOwnProperty('GridControlsArray') && Object.keys(this.requestInfo.GridControlsArray.controls[0].controls).length > 0){        
      //   this.requestInfo['GridControlsArray'].controls.forEach(element => {
      //     gridFormArray.push(element);
      //   });
      // }
      // // /*creating form group by autogenerate and by parent component GridValidationParam starts*/
      // else if(this.requestInfo.hasOwnProperty('GridValidationParam') && this.requestInfo.GridValidationParam){
      //   this.mpTG.gridApi.forEachNode((rowNode: RowNode) => {
      //     const formGroup: FormGroup = this.fb.group({});        
      //     columns
      //     //.filter((column: Column) => column.getColDef().field !== 'Sl')  // //field !== 'Sl'colId !== 'Sl'
      //     .forEach((column: Column) => {
      //       const key = this.createKey(this.mpTG.gridColumnApi, column);
      //       formGroup.setControl(key, new FormControl(rowNode.data[key], this.requestInfo['GridValidationParam'][key] ));
      //     });
      //     gridFormArray.push(formGroup);
      //   });
      // }
      // // /*creating form group dynamically by GridData starts*/
      // else{
        this.mpTG.gridApi.forEachNode((rowNode: RowNode) => {
          const formGroup: FormGroup = this.fb.group({});        
          columns
          //.filter((column: Column) => column.getColDef().field !== 'Sl')  // //field !== 'Sl'colId !== 'Sl'
          .forEach((column: Column) => {
            const key = this.createKey(this.mpTG.gridColumnApi, column);
            formGroup.setControl(key, new FormControl(rowNode.data[key]));
          });
          gridFormArray.push(formGroup);
        });
     // }

    }
    else if(this.action == "removeRowData"){
      // /* creating form group dynamically afterGridReady strat*/
      let columns = this.mpTG.gridColumnApi.getAllColumns();

      let gridFormArray = <FormArray>this.formGroup.controls[this.gridControlName];

      const length = gridFormArray.controls.length;

      for (let i = 0; i < length; i++) gridFormArray.removeAt(i); //removing all the existing formContrls in the Grid
      
      
      // /*creating form group by autogenerate and by parent component GridValidationParam starts*/
      // if(this.requestInfo.hasOwnProperty('GridValidationParam') && Object.keys(this.requestInfo.GridValidationParam).length > 0){
      //   this.mpTG.gridApi.forEachNode((rowNode: RowNode) => {
      //     const formGroup: FormGroup = this.fb.group({});        
      //     columns
      //     //.filter((column: Column) => column.getColDef().field !== 'Sl')  // //field !== 'Sl'colId !== 'Sl'
      //     .forEach((column: Column) => {
      //       const key = this.createKey(this.mpTG.gridColumnApi, column);
      //       formGroup.setControl(key, new FormControl(rowNode.data[key], this.requestInfo['GridValidationParam'][key] ));
      //     });
      //     gridFormArray.push(formGroup);
      //   });
      // }
      // // /*creating form group dynamically by GridData starts*/
      // else{


       
        this.mpTG.gridApi.forEachNode((rowNode: RowNode) => {
          //this.rowDataAfterCrud.forEach((data) => {
          const formGroup: FormGroup = this.fb.group({});        
          columns
          //.filter((column: Column) => column.getColDef().field !== 'Sl')  // //field !== 'Sl'colId !== 'Sl'
          .forEach((column: Column) => {
            const key = this.createKey(this.mpTG.gridColumnApi, column);
            formGroup.setControl(key, new FormControl(rowNode.data[key], this.requestInfo['GridValidationParam'][key]));
          });
          gridFormArray.push(formGroup);
        });

      //}
    } 
    else{
      // /* creating form group dynamically afterGridReady strat*/
      let columns = this.mpTG.gridColumnApi.getAllColumns();

      let gridFormArray = <FormArray>this.formGroup.controls[this.gridControlName];

      const length = gridFormArray.controls.length;

      for (let i = 0; i < length; i++) gridFormArray.removeAt(i); //removing all the existing formContrls in the Grid
      this.mpTG.gridApi.forEachNode((rowNode: RowNode) => {
        const formGroup: FormGroup = this.fb.group({});        
        columns
        //.filter((column: Column) => column.getColDef().field !== 'Sl')  // //field !== 'Sl'colId !== 'Sl'
        .forEach((column: Column) => {
          const key = this.createKey(this.mpTG.gridColumnApi, column);
          formGroup.setControl(key, new FormControl(rowNode.data[key], this.requestInfo['GridValidationParam'][key] ));
        });
        gridFormArray.push(formGroup);
      });

      // // /*creating form group by parent component controlObject starts*/      
      // if(this.requestInfo.hasOwnProperty('GridControlsArray') && Object.keys(this.requestInfo.GridControlsArray.controls[0].controls).length > 0){        
      //   this.requestInfo['GridControlsArray'].controls.forEach(element => {
      //     gridFormArray.push(element);
      //   });
      // }      
      // // /*creating form group by autogenerate and by parent component GridValidationParam starts*/
      // else if(this.requestInfo.hasOwnProperty('GridValidationParam') && Object.keys(this.requestInfo.GridValidationParam).length > 0){
      //   this.mpTG.gridApi.forEachNode((rowNode: RowNode) => {
      //     const formGroup: FormGroup = this.fb.group({});        
      //     columns
      //     //.filter((column: Column) => column.getColDef().field !== 'Sl')  // //field !== 'Sl'colId !== 'Sl'
      //     .forEach((column: Column) => {
      //       const key = this.createKey(this.mpTG.gridColumnApi, column);
      //       formGroup.setControl(key, new FormControl(rowNode.data[key], this.requestInfo['GridValidationParam'][key] ));
      //     });
      //     gridFormArray.push(formGroup);
      //   });
      // }
      // // /*creating form group dynamically by GridData starts*/
      // else{
      //   this.mpTG.gridApi.forEachNode((rowNode: RowNode) => {
      //     const formGroup: FormGroup = this.fb.group({});        
      //     columns
      //     //.filter((column: Column) => column.getColDef().field !== 'Sl')  // //field !== 'Sl'colId !== 'Sl'
      //     .forEach((column: Column) => {
      //       const key = this.createKey(this.mpTG.gridColumnApi, column);
      //       formGroup.setControl(key, new FormControl(rowNode.data[key]));
      //     });
      //     gridFormArray.push(formGroup);
      //   });
      // }

      
    }
  }



  refreshFormControls() {
    if (this.mpTG.gridApi) {
      this.createFormControls();
      this.mpTG.gridApi.refreshCells({force: true});
      //if(this.action != "addRowData"){} 
    }
  }

  // refreshFormControls() {
  //   if (this.api) {
  //     this.createFormControls();
  //     this.api.refreshCells({ force: true });
  //   }
  // }

  // private createFormControls() {
  //   let columns = this.columnApi.getAllColumns();

  //   const stockFormArray = <FormArray>this.formGroup.controls[this.gridControlName];

  //   const length = stockFormArray.controls.length;

  //   for (let i = 0; i < length; i++) stockFormArray.removeAt(i);

  //   this.api.forEachNode((rowNode: RowNode) => {
  //     const formGroup: FormGroup = new FormGroup({});
  //     columns.forEach((column: Column) => {
  //       const key = this.createKey(this.columnApi, column);
  //       formGroup.setControl(key, new FormControl(rowNode.data[key]));
  //     });
  //     stockFormArray.push(formGroup);
  //   });
  // }



  onGridReady(params) {
    
    //alert('onGridReady called before ngOnInit() and after ngAfterViewInit()');
    this.mpTG.gridApi = params.api;
    this.mpTG.gridColumnApi = params.columnApi;
    this.mpTG['rowNodeApi'] = params.rowNodeApi;    

    //======= late loading with all row data start ====
    this.listInfo.top = 200000;

    //this.getGridReadyprocesses();
    
    this.onGridReadyParamsApi = this.mpTG.gridApi; //for voice recognition   
    
    // this.mpTG.columnDefs = {      
    //   getRowNodeId: (data) => data.Title    
    // };
    
    //this.refreshFormControls(); //for implementing forms group

    //let receivedData = this.requestInfo;

    //this.api = params.api;
    //this.columnApi = params.columnApi;

   // this.refreshFormControls();

    //this.mpTG.gridApi.sizeColumnsToFit();

    this.editType = 'fullRow';
    
  }

  // gridReady(params: GridReadyEvent) {
  //   this.api = params.api;
  //   this.columnApi = params.columnApi;

  //   this.refreshFormControls();

  //   this.api.sizeColumnsToFit();
  // }

  createColDef(i) {

    return new Promise((resolve, reject)=>{
        function setTitleWithMDField(el) {
          return {
            headerName: el.headerName,
            field: el.field,
            cellRenderer: 'agGroupCellRenderer',
            sortable: true,
            enableRowGroup: false,
            filter: 'agSetColumnFilter',
            filterParams: {
              resetButton: true,
            },
            minWidth: el.minWidth,
            menuTabs: ['filterMenuTab', 'generalMenuTab'],
            cellClass: "titleWithMDFieldClass",
            cellStyle: function (params) {
              if (params.value != '') {
                return {
                  textItems: 'center !important',
                  display: 'flex',
                  alignSelf: 'normal',
                  marginTop: '-8px',
                  marginBottom: '0px',
                  borderBottom: '0px',
                  paddingBottom: '0px'
                };
              } else {
                return {
                  textAlign: 'center',
                }
              }
            }
          };
        }
    
        function setTitleWitouthMDField(el) {
          return {
            headerName: el.headerName,
            field: el.field,
            //cellRenderer: 'agGroupCellRenderer',
            sortable: true,
            enableRowGroup: false,
            filter: 'agSetColumnFilter',
            filterParams: {
              resetButton: true,
            },
            minWidth: el.minWidth,
            menuTabs: ['filterMenuTab', 'generalMenuTab'],
            cellClass: "ag-header-group-cell-label",
            cellStyle: function (params) {
              if (params.value != '') {
                return {
                  textAlign: 'center',
                  display: 'flex',
                };
              } else {
                return {
                  textAlign: 'center',
                }
              }
            },
          };
        }
    
        function setDateField(el) {
          let dtFld = {
            headerName: el.headerName,
            valueGetter: function (params) { if (params.data[el.valueGetter] != null && params.data[el.valueGetter] != undefined) { return moment((params.data[el.valueGetter]).split("T")[0]).format("DD MMM, YYYY"); } },
            //field: el.field,
            sortable: true,
            enableRowGroup: true,
            filter: 'agDateColumnFilter',
            filterParams: {
              comparator: function (filterLocalDateAtMidnight, cellValue) {
                var dateAsString = moment(cellValue).format('DD/MM/YYYY');
                var dateParts = dateAsString.split('/');
                var cellDate = new Date(
                  Number(dateParts[2]),
                  Number(dateParts[1]) - 1,
                  Number(dateParts[0])
                );
                if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                  return 0;
                }
                if (cellDate < filterLocalDateAtMidnight) {
                  return -1;
                }
                if (cellDate > filterLocalDateAtMidnight) {
                  return 1;
                }
              },
              //applyButton: true,
              resetButton: true,
            },
            // valueFormatter: function(params) {
            //     return moment(params.value).format('DD MMM, YYYY');
            // },
            columnGroupShow: 'open',
            cellClass: "ag-header-group-cell-label",
            cellStyle: function (params) {
              if (params.value != '') {
                return {
                  //color: 'red', 
                  //backgroundColor: 'green',
                  textAlign: 'center',
                  display: 'flex',
                };
              } else {
                return {
                  textAlign: 'center',
                }
              }
            },
            minWidth: el.minWidth,
            menuTabs: ['filterMenuTab', 'generalMenuTab'],
          }
    
          return dtFld;
        }
    
        function setTextField(el) {
          let txtFld = {
            headerName: el.headerName,
            field: el.field,
            minWidth: el.minWidth,
            editable: true,
            // sortable: true,
            // enableRowGroup: true,
            // filter: 'agSetColumnFilter',
            // filterParams: {
            //   resetButton: true,
            // },
            //menuTabs: ['filterMenuTab', 'generalMenuTab'],
            menuTabs: [],
            // cellClass: "ag-header-group-cell-label",
            // cellStyle: function (params) {
            //   if (params.value != '') {
            //     return {
            //       textAlign: 'center',
            //       display: 'flex',
            //     };
            //   } else {
            //     return {
            //       textAlign: 'center',
            //     }
            //   }
            // },
          }
    
          return txtFld;
        }
    
        function setNumberField(el) {
          let numFld = {
            headerName: el.headerName,
            field: el.field,
            sortable: true,
            enableRowGroup: true,
            filter: 'agNumberColumnFilter',
            //filter: 'agSetColumnFilter',
            filterParams: {
              resetButton: true,
            },
            minWidth: el.minWidth,
            menuTabs: ['filterMenuTab', 'generalMenuTab'],
            cellClass: "ag-header-group-cell-label",
            cellStyle: function (params) {
              if (params.value != '') {
                return {
                  //color: 'red', 
                  //backgroundColor: 'green',
                  textAlign: 'center',
                  display: 'flex',
                };
              } else {
                return {
                  textAlign: 'center',
                }
              }
            }
          }
          return numFld;
        }
    
        function setViewLinkGuidField(el) {
    
          let vwLnkFld = {
            headerName: el.headerName,
            field: el.field,
            cellRenderer: function (params) {
              return '<a href="https://portal.bergerbd.com/leaveauto/SitePages/' + dashboardsListsInfo[i.listIndex].WfName + '.aspx?UniqueId=' + params.value + '&mode=read" target="_blank">View</a>'
            },
            enableRowGroup: false,
            menuTabs: ['generalMenuTab', 'columnsMenuTab'],
            cellClass: "ag-header-group-cell-label",
            cellStyle: function (params) {
              if (params.value != '') {
                return {
                  textAlign: 'center',
                  display: 'flex',
                };
              } else {
                return {
                  textAlign: 'center',
                }
              }
            },
            minWidth: 85,
          }
    
          return vwLnkFld;
        }
    
        function setViewLinkIdField(el) {
          let vwLnkFld = {
            headerName: el.headerName,
            field: el.field,
            cellRenderer: function (params) {
              let siteUrl = window.location.href + el.siteUrl;
              // let pageUrl = el.pageUrl;
              // let qString = el.qString;
              // let qVal = el.qVal;
              // let mode1 = el.mode1;
    
              if (dashboardsListsInfo[i.listIndex].WfName == 'EmployeeOffBoardingProcess') {
                return '<a href="' + siteUrl + el.pageUrl + '?' + el.qString + '=' + params.data.ID + '&' + el.mode1 + el.mode2 + '" target="_blank">View</a>'
                  + "&nbsp;&nbsp;&nbsp;&nbsp;"
                  + '<a href="' + siteUrl + el.pageUrl + '?' + el.qString + '=' + params.data.ID + '&Mode=Change" target="_blank">Change</a>';
              }
              else {
                return '<a href="' + siteUrl + el.pageUrl + '?' + el.qString + '=' + params.data.ID + '&' + el.mode1 + el.mode2 + '" target="_blank">View</a>';
              }
    
            },
            enableRowGroup: false,
            menuTabs: ['generalMenuTab', 'columnsMenuTab'],
            cellClass: "ag-header-group-cell-label",
            cellStyle: function (params) {
              if (params.value != '') {
                return {
                  textAlign: 'center',
                  display: 'flex',
                };
              } else {
                return {
                  textAlign: 'center',
                }
              }
            },
            minWidth: el.minWidth,
          }
    
          return vwLnkFld;
        }
    
        function setGetSetDateField(el) {
          let dtFld = {
            headerName: el.headerName,
            valueGetter: function (params) { if (params.data[el.valueGetter] != null && params.data[el.valueGetter] != undefined) { return moment((params.data[el.valueGetter]).split("T")[0]).format("DD MMM, YYYY"); } },
            //valueGetter: el.valueGetter,
            //valueGetter: function(params){return moment((params.data.Created).split("T")[0]).format("DD MMM, YYYY")},
            //valueSetter: el.valueSetter,
            sortable: true,
            enableRowGroup: true,
            filter: 'agDateColumnFilter',
            filterParams: {
              comparator: function (filterLocalDateAtMidnight, cellValue) {
                var dateAsString = moment(cellValue).format('DD/MM/YYYY');
                var dateParts = dateAsString.split('/');
                var cellDate = new Date(
                  Number(dateParts[2]),
                  Number(dateParts[1]) - 1,
                  Number(dateParts[0])
                );
                if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                  return 0;
                }
                if (cellDate < filterLocalDateAtMidnight) {
                  return -1;
                }
                if (cellDate > filterLocalDateAtMidnight) {
                  return 1;
                }
              },
              //applyButton: true,
              resetButton: true,
            },
            columnGroupShow: 'open',
            cellClass: "ag-header-group-cell-label",
            cellStyle: function (params) {
              if (params.value != '') {
                return {
                  //color: 'red', 
                  //backgroundColor: 'green',
                  textAlign: 'center',
                  display: 'flex',
                };
              } else {
                return {
                  textAlign: 'center',
                }
              }
            },
            minWidth: el.minWidth,
            menuTabs: ['filterMenuTab', 'generalMenuTab'],
          }
    
          return dtFld;
        }
    
        function setGetSetTextField(el) {
          let txtFld = {
            headerName: el.headerName,
            //field: el.field,
            valueGetter: el.valueGetter,
            //valueGetter: function(params){if(params.data[el.valueGetter] != null && params.data[el.valueGetter] != undefined){console.log(el.valueGetter); return el.valueGetter}},
            //valueSetter: el.valueSetter,
            sortable: true,
            enableRowGroup: true,
            filter: 'agSetColumnFilter',
            filterParams: {
              resetButton: true,
            },
            minWidth: el.minWidth,
            menuTabs: ['filterMenuTab', 'generalMenuTab'],
            cellClass: "ag-header-group-cell-label",
            cellStyle: function (params) {
              if (params.value != '') {
                return {
                  textAlign: 'center',
                  display: 'flex',
                };
              } else {
                return {
                  textAlign: 'center',
                }
              }
            },
          }
    
          return txtFld;
        }
    
        function setGetSetNumberField(el) {
          let numFld = {
            headerName: el.headerName,
            //field: el.field,
            valueGetter: el.valueGetter,
            //valueSetter: el.valueSetter,
            sortable: true,
            enableRowGroup: true,
            filter: 'agNumberColumnFilter',
            //filter: 'agSetColumnFilter',
            filterParams: {
              resetButton: true,
            },
            minWidth: el.minWidth,
            menuTabs: ['filterMenuTab', 'generalMenuTab'],
            cellClass: "ag-header-group-cell-label",
            cellStyle: function (params) {
              if (params.value != '') {
                return {
                  //color: 'red', 
                  //backgroundColor: 'green',
                  textAlign: 'center',
                  display: 'flex',
                };
              } else {
                return {
                  textAlign: 'center',
                }
              }
            }
          }
          return numFld;
        }
    
        function setCustomLinkField(el) {
          let vwLnkFld = {
            headerName: el.headerName,
            field: el.field,
            cellRenderer: function (params) {
              if (el.linkType == 'AssignTask') {
                return '<a href="https://portal.bergerbd.com/leaveauto/SitePages/' + dashboardsListsInfo[i.listIndex].WfName + '.aspx?UniqueId=' + params.data.GUID + '&mode=read" target="_blank">View</a>' + "&nbsp;&nbsp;&nbsp;&nbsp;" + '<a href=' + window.location.href + "/SitePages/" + el.toPageName + "?UniqueId=" + params.data.GUID + "&itemId=" + params.data.Title.replace("HRSR-", "") + "&status=" + params.data.Status + ' target="_blank">AssignTask</a>';
              }
              else {
                return '<a href="https://portal.bergerbd.com/leaveauto/SitePages/' + dashboardsListsInfo[i.listIndex].WfName + '.aspx?UniqueId=' + params.value + '&mode=read" target="_blank">View</a>';
              }
    
            },
            enableRowGroup: false,
            menuTabs: ['generalMenuTab', 'columnsMenuTab'],
            cellClass: "ag-header-group-cell-label",
            cellStyle: function (params) {
              if (params.value != '') {
                return {
                  textAlign: 'center',
                  display: 'flex',
                };
              } else {
                return {
                  textAlign: 'center',
                }
              }
            },
            minWidth: el.minWidth,
          }
    
          return vwLnkFld;
        }
    
        function setGetSetPeopleField(el) {
          let txtFld = {
            headerName: el.headerName,
            //field: el.field,
            valueGetter: function (params) {
              if (typeof params.data[el.valueGetter].results == "object") {
                if (params.data[el.valueGetter].results.length > 0) {
                  let pending = "";
                  for (let i = 0; i < (params.data[el.valueGetter].results.length); i++) {
                    pending += params.data[el.valueGetter].results[i].Title + ';  ';
                  }
                  // (params.data[el.valueGetter].results).forEach(ele => {
                  //   pending += ele.Title + ';  ';
                  //   return pending;
                  // }); 
                  return pending;
                  //return params.data[el.valueGetter].results.length;         
                }
                //return params.data[el.valueGetter].results.length;
                //return params.data[el.valueGetter].results[0].Title;
              }
    
              //return '';
            },
            //valueSetter: el.valueSetter,
            sortable: true,
            enableRowGroup: true,
            filter: 'agSetColumnFilter',
            filterParams: {
              resetButton: true,
            },
            cellStyle: { 'white-space': 'normal', 'line-height': 1.5 },
            autoHeight: true,
            minWidth: el.minWidth,
            menuTabs: ['filterMenuTab', 'generalMenuTab'],
            //cellClass: "ag-header-group-cell-label",
            // cellStyle: function(params) {
            //   if (params.value !='') {
            //       return {
            //       textAlign: 'center', 
            //       display: 'flex',
            //     };
            //   } else {
            //       return {
            //         textAlign: 'center',
            //       }
            //     }
            // },    
          }
    
          return txtFld;
        }
    
        function setGetSetMulLinTextField(el){
          let txtFld = {
            headerName: el.headerName,
            //field: el.field,        
            valueGetter: function (params) {
              return params.data[el.valueGetter];
            },
            //valueSetter: el.valueSetter,
            sortable: true,
            enableRowGroup: true,
            filter: 'agSetColumnFilter',
            filterParams: {
                resetButton: true,
            },
            minWidth: el.minWidth,
            menuTabs: ['filterMenuTab', 'generalMenuTab'],
            cellClass: "ag-header-group-cell-label",
            cellStyle: { 'white-space': 'normal', 'line-height': 1.5 },
            autoHeight: true   
          }
    
          return txtFld;
        }
    
        this.mpTG.columnDefs = [];
        this.mpTG.columnDefs.push({
          headerName: "Sl",
          valueGetter: "node.rowIndex + 1",
          editable: false,
          menuTabs: [],
          minWidth: 50,
        });
        // this.mpTG.columnDefs.push({
        //   headerName: "action",
        //   minWidth: 180,
        //   cellRenderer: actionCellRenderer,
        //   editable: false,
        //   colId: "action",
        //   menuTabs: [],
        // });
    
        //dashboardsListsInfo[i.listIndex].DbViewColDef.forEach(element => {
          i.forEach(element => { 
          
          // const obj = {
          //   "TitleWithMDField": this.mpTG.columnDefs.push(setTitleWithMDField(element)),
          //   "TitleWitouthMDField": this.mpTG.columnDefs.push(setTitleWitouthMDField(element)),
          //   "DateField": this.mpTG.columnDefs.push(setDateField(element)),
          //   "TextField": this.mpTG.columnDefs.push(setTextField(element)),
          //   "NumberField": this.mpTG.columnDefs.push(setNumberField(element)),
          //   "GetSetDateField": this.mpTG.columnDefs.push(setGetSetDateField(element)),
          //   "GetSetTextField": this.mpTG.columnDefs.push(setGetSetTextField(element)),
          //   "GetSetNumberField": this.mpTG.columnDefs.push(setGetSetNumberField(element)),
          //   "CustomLinkField": this.mpTG.columnDefs.push(setCustomLinkField(element)),
          //   "GetSetPeopleField": this.mpTG.columnDefs.push(setGetSetPeopleField(element)),
          //   "GetSetMulLinTextField": this.mpTG.columnDefs.push(setGetSetMulLinTextField(element)),
          //   "ViewLinkGuidField": function(){
          //     this.dbTagUrlInfo.qryStrKeyTyp = 'GUID';
          //     this.dbTagUrlInfo.urlVoice = 'https://portal.bergerbd.com/leaveauto/SitePages/' + dashboardsListsInfo[i.listIndex].WfName + '.aspx?UniqueId=';
          //     return this.mpTG.columnDefs.push(setViewLinkGuidField(element));  
              
          //   },
          //   "ViewLinkIdField": function(){
          //     this.dbTagUrlInfo.qryStrKeyTyp = 'ID';
          //     //this.dbTagUrlInfo.urlVoice = window.location.href + element.pageUrl + '?' + element.qString + '=';
          //     this.dbTagUrlInfo.urlVoice = 'https://portal.bergerbd.com/' + element.siteUrl + element.pageUrl + '?' + element.qString + '=';
          //     this.dbTagUrlInfo.mode1 = element.mode1;
          //     this.dbTagUrlInfo.mode2 = element.mode2;
          //     return this.mpTG.columnDefs.push(setViewLinkIdField(element));
              
          //   }
          // };
    
          // return obj[element.fldType];
    
          if (element.fldType == "TitleWithMDField") {
            this.mpTG.columnDefs.push(setTitleWithMDField(element));
          }
          else if (element.fldType == "TitleWitouthMDField") {
            this.mpTG.columnDefs.push(setTitleWitouthMDField(element));
          }
          else if (element.fldType == "DateField") {
            this.mpTG.columnDefs.push(setDateField(element));
          }
          else if (element.fldType == "TextField") {
            this.mpTG.columnDefs.push(setTextField(element));
          }
          else if (element.fldType == "NumberField") {
            this.mpTG.columnDefs.push(setNumberField(element));
          }
          else if (element.fldType == "ViewLinkGuidField") {
            this.mpTG.columnDefs.push(setViewLinkGuidField(element));  
            this.dbTagUrlInfo.qryStrKeyTyp = 'GUID';
            this.dbTagUrlInfo.urlVoice = 'https://portal.bergerbd.com/leaveauto/SitePages/' + dashboardsListsInfo[i.listIndex].WfName + '.aspx?UniqueId=';
          }
          else if (element.fldType == "ViewLinkIdField") {
            this.mpTG.columnDefs.push(setViewLinkIdField(element));
            this.dbTagUrlInfo.qryStrKeyTyp = 'ID';            
          }
          else if (element.fldType == "GetSetDateField") {
            this.mpTG.columnDefs.push(setGetSetDateField(element));
          }
          else if (element.fldType == "GetSetTextField") {
            this.mpTG.columnDefs.push(setGetSetTextField(element));
          }
          else if (element.fldType == "GetSetNumberField") {
            this.mpTG.columnDefs.push(setGetSetNumberField(element));
          }
          // else if (element.fldType == "GetSetNumberField") {
          //   this.mpTG.columnDefs.push(setGetSetNumberField(element));
          // }
          else if (element.fldType == "CustomLinkField") {
            this.mpTG.columnDefs.push(setCustomLinkField(element));
          }
          else if (element.fldType == "GetSetPeopleField") {
            this.mpTG.columnDefs.push(setGetSetPeopleField(element));
          }
          else if (element.fldType == "GetSetMulLinTextField") {
            this.mpTG.columnDefs.push(setGetSetMulLinTextField(element));
          }
    
        });        

        // this.mpTG.columnDefs = [];

        // this.mpTG.columnDefs.push({
        //   headerName: "Sl",
        //   valueGetter: "node.rowIndex + 1",
        //   editable: false,
        // });
        // this.mpTG.columnDefs.push({
        //   headerName: "action",
        //   minWidth: 180,
        //   cellRenderer: actionCellRenderer,
        //   editable: false,
        //   colId: "action"
        // });

        // this.mpTG.columnDefs.push({
        //   headerName: "ClassCode",
        //   field: 'ClassDescription',
        //   minWidth: 180
        // });
        // this.mpTG.columnDefs.push({
        //   headerName: "ClassDescription",
        //   field: 'ClassDescription',
        //   minWidth: 180,
        // });

        resolve(this.mpTG.columnDefs);
        return this.mpTG.columnDefs;

    })
  }

  importLocalStorageData(){

    return new Promise((resolve, reject)=>{

      //let recMstLocFil = 'src/assets/businessprocesslocaldata/'+ this.clickedDashboardInfo.wfName +'/'+ this.clickedDashboardInfo.config['MasterListInfo'].name +'/recent.json';
      
      let recMstLocFilImport = import('src/assets/businessprocesslocaldata/'+ this.clickedDashboardInfo.wfName +'/'+ this.clickedDashboardInfo.config['MasterListInfo'].name +'/recent.json');
      //let recMstLocFilImport = import('src/assets/businessprocesslocaldata/'+ this.clickedDashboardInfo.wfName +'/'+ this.clickedDashboardInfo.config['MasterListInfo'].name +'/recent.json');

      recMstLocFilImport.then(res => {
        if( res.default.length > 0){ //check wheather target file includes any array with no item
          this.clickedDashboardInfo.recMstLocDat.d = res.default;
          resolve(res.default);
        }else{
          this.getSelectedDashboardInfo(this.clickedDashboardInfo).then(res=>{
            this.getRowData(this.clickedDashboardInfo).then(res =>{
              resolve(res);
            });
          });        
        } 
      })
      
          
     
      // if(this.clickedDashboardInfo.wfName == 'PoolCarRequisition'){
      //   import('src/assets/businessprocesslocaldata/PoolCarRequisition/PoolCarRequisitionInfo/recent.json').then(data => {
      //     if( data.default.length > 0){ //check wheather target file includes any array with no item
      //       this.clickedDashboardInfo.recMstLocDat.d = data.default;
      //       resolve(data.default);
      //     }     
      //   });
      // }

      // else if(this.clickedDashboardInfo.wfName == 'EmployeePaintDiscount'){
      //   import('src/assets/businessprocesslocaldata/EmployeePaintDiscount/EmpPaintDiscountRequest/recent.json').then(data => {
      //     if( data.default.length > 0){ //check wheather target file includes any array with no item
      //       this.clickedDashboardInfo.recMstLocDat.d = data.default;
      //       resolve(data.default);
      //     }else{
      //       this.getSelectedDashboardInfo(this.clickedDashboardInfo).then(res=>{
      //         this.getRowData(this.clickedDashboardInfo).then(res=>{
      //           resolve(res);
      //         });
      //       });        
      //     }      
      //   });
      // }

      // else if(this.clickedDashboardInfo.wfName == 'HRServices'){
      //   import('src/assets/businessprocesslocaldata/HRServices/HRServices/recent.json').then(data => {
      //     if( data.default.length > 0){ //check wheather target file includes any array with no item
      //       this.clickedDashboardInfo.recMstLocDat.d = data.default;
      //       resolve(data.default);
      //     }else{
      //       this.getSelectedDashboardInfo(this.clickedDashboardInfo).then(res=>{
      //         this.getRowData(this.clickedDashboardInfo).then(res=>{
      //           resolve(res);
      //         });
      //       });        
      //     }       
      //   });
      // }
      
      // else if(this.clickedDashboardInfo.wfName == 'EmployeeReimbursement'){
      //   import('src/assets/businessprocesslocaldata/EmployeeReimbursement/ReimburseMaster/recent.json').then(data => {
      //     if( data.default.length > 0){ //check wheather target file includes any array with no item
      //       this.clickedDashboardInfo.recMstLocDat.d = data.default;
      //       resolve(data.default);
      //     }else{
      //       this.getSelectedDashboardInfo(this.clickedDashboardInfo).then(res=>{
      //         this.getRowData(this.clickedDashboardInfo).then(res=>{
      //           resolve(res);
      //         });
      //       });        
      //     }      
      //   });
      // }
      // else if(this.clickedDashboardInfo.wfName == 'MobileHandsetRequests'){
      //   import('src/assets/businessprocesslocaldata/MobileHandsetRequests/MobileHandsetRequests/recent.json').then(data => {
      //     if( data.default.length > 0){ //check wheather target file includes any array with no item
      //       this.clickedDashboardInfo.recMstLocDat.d = data.default;
      //       resolve(data.default);
      //     }else{
      //       this.getSelectedDashboardInfo(this.clickedDashboardInfo).then(res=>{
      //         this.getRowData(this.clickedDashboardInfo).then(res=>{
      //           resolve(res);
      //         });
      //       });        
      //     }       
      //   });
      // }

      // else if(this.clickedDashboardInfo.wfName == 'MobileHandsetRequests'){
      //   import('src/assets/businessprocesslocaldata/MobileHandsetRequests/MobileHandsetRequests/recent.json').then(data => {
      //     if( data.default.length > 0){ //check wheather target file includes any array with no item
      //       this.clickedDashboardInfo.recMstLocDat.d = data.default;
      //       resolve(data.default);
      //     }else{
      //       this.getSelectedDashboardInfo(this.clickedDashboardInfo).then(res=>{
      //         this.getRowData(this.clickedDashboardInfo).then(res=>{
      //           resolve(res);
      //         });
      //       });        
      //     }       
      //   });
      // }

      // else{
      //   this.getSelectedDashboardInfo(this.clickedDashboardInfo).then(res=>{
      //     this.getRowData(this.clickedDashboardInfo).then(res=>{
      //       resolve(res);
      //     });
      //   });        
      // }

       
    })
    
  }

  getRecentMstrLocalData(){
    return new Promise((resolve, reject)=>{
      if(this.clickedDashboardInfo.acessPermission == 'Public'){      
        if( this.clickedDashboardInfo.recMstLocDat.d.length > 0){ //check wheather target file includes any array with no item
          this.rowData = this.clickedDashboardInfo.recMstLocDat.d;
          resolve(this.clickedDashboardInfo.recMstLocDat.d);
        }else{
          this.getRowData(this.clickedDashboardInfo).then(res=>{
            resolve(res);
          });
        } 
      }
      else if(this.clickedDashboardInfo.acessPermission == 'Protected'){      
        if( this.clickedDashboardInfo.recMstLocDat.d.length > 0){ //check wheather target file includes any array with no item
          
          if(this.logedInUser.access == 'FullAccess'){             
            let myLocationData = (this.clickedDashboardInfo.recMstLocDat.d).filter(item =>{
                return item.Author.Office == this.logedInUser.office;
              });
            this.rowData = myLocationData;
            resolve(myLocationData);
          }
        }else{
          this.getRowData(this.clickedDashboardInfo).then(res=>{
            resolve(res);
          });
        } 
      }
      else{
        this.rowData = [];
        resolve('Un authorized access !!');
      }
    })
  }

  getRowData(i) {

    return new Promise((resolve, reject)=>{
      let serviceString = this.sharepointlistService.fetchListItemWithExpStFilOrd(this.listInfo);

      try {
        from(
          serviceString
          //this.sharepointlistService.fetchListItemWithExpStFilOrd(this.listInfo, res)
        ).subscribe(
          (items) => {
            this.rowData = [];
            if (dashboardsListsInfo[i.listIndex].MasterListInfo.hasOwnProperty('jsonStringField') && dashboardsListsInfo[i.listIndex].MasterListInfo.jsonStringField != "") {
              let parsedItems = JSON.parse(items[0][dashboardsListsInfo[i.listIndex].MasterListInfo.jsonStringField]);
              this.rowData = parsedItems[dashboardsListsInfo[i.listIndex].MasterListInfo.parsedFldForDb];

            } else {
            this.rowData = items;
            resolve(items);
            //this.clickedDashboardInfo.mapedData.d.push(items);
            }
          }
        )
      } catch (e) {
        console.log(e);
      }
      
    })

    
  }

  // getRowDataAsPromise(i) {

  //   let serviceString = this.sharepointlistService.fetchListItemWithExpStFilOrd(this.listInfo);

  //   let promise = new Promise((resolve, reject) => {

  //     serviceString
  //       .then(
  //         (items) => {
  //           if (dashboardsListsInfo[i.listIndex].MasterListInfo.hasOwnProperty('jsonStringField') && dashboardsListsInfo[i.listIndex].MasterListInfo.jsonStringField != "") {
  //             let parsedItems = JSON.parse(items[0][dashboardsListsInfo[i.listIndex].MasterListInfo.jsonStringField]);
  //             let rcvUnMapData = parsedItems[dashboardsListsInfo[i.listIndex].MasterListInfo.parsedFldForDb];
  //             resolve(rcvUnMapData);

  //             this.getTitleTag(rcvUnMapData);
  //           } else {
  //             let rcvUnMapData = items;
              
  //             resolve(rcvUnMapData);
  //             this.getTitleTag(rcvUnMapData);
  //             //this.websocketService.emit('chat1', items[0]);
  //           }
            
  //         }
  //       )
  //       .catch(err=>{
  //         console.log("Error: "+ err.message);
  //       });

  //   })

  //   return promise;

  // }

  getSelectedDashboardInfo(i) {
    return new Promise((resolve, reject)=>{
      this.listInfo.name = dashboardsListsInfo[i.listIndex].MasterListInfo.name;
      this.listInfo.select = dashboardsListsInfo[i.listIndex].MasterListInfo.select;
      this.listInfo.expand = dashboardsListsInfo[i.listIndex].MasterListInfo.expand;
      this.listInfo.orderByPrm = dashboardsListsInfo[i.listIndex].MasterListInfo.orderByPrm;
      this.listInfo.orderByVal = dashboardsListsInfo[i.listIndex].MasterListInfo.orderByVal;
      //this.listInfo.top = dashboardsListsInfo[i.listIndex].MasterListInfo.top;

      this.sharepointlistService.getEmpIdNdOffice().then((res) => {
        if (res.Office == "Corporate") {
          this.listInfo.filter = '';
        }
        else {
          this.listInfo.filter = "substringof('" + res.Office + "' ,Author/Office)";
        }     
      });

      resolve(this.listInfo);
    })
    
  }

  ifAuthGroupsMember(i): boolean{
    //should be implemented;
    return false;    
  }

  getSocketConnectionWithSPServer(){ 
    //=============socket.io implementation strat ===========
    let webAbsoluteUrl = window.location.origin;
    //let webAbsoluteUrl = 'https://localhost';
    let serPort = window.location.protocol == "https:" ? 3000 : 8000;
    //let serPort = 3000;
    let serverUrl = webAbsoluteUrl + ":" + serPort;

    // let serPort = 443;
    // let serverUrl = "https://localhost:" + serPort;

    this.socket = io('https://portaldv.bergerbd.com/leaveauto/Lists/ReimburseMaster/AllItems.aspx', {
        // below config is mendatory and should not be changed ---set to false only if you use self-signed certificate !
        transports: ['websocket'],
        rejectUnauthorized: false,
        secure: false,
        withCredentials: false,
        forceNew: true,
        timeout: 5000, //before connect_error and connect_timeout are emitted.
    });     
    
    //======check if connected ===
    this.socket.on("connect", () => {
      if(this.socket.connected){
        console.log(`Connect SP server successfull !`);
      }
      else{console.log(`Unable to connect local server !`);}
    });

    this.socket.on('item:added', (data) => {
      console.log("data.customProperties.id: "+ data.customProperties.id);
    });

    
  }

  //==step 5==

  getSocketConnection(wfName){ 
      //=============socket.io implementation strat ===========
      let webAbsoluteUrl = window.location.origin;
      //let webAbsoluteUrl = 'https://localhost';
      let serPort = window.location.protocol == "https:" ? 3000 : 8000;
      //let serPort = 3000;
      let serverUrl = webAbsoluteUrl + ":" + serPort;

      // let serPort = 443;
      // let serverUrl = "https://localhost:" + serPort;

      this.socket = io( serverUrl, {
          // below config is mendatory and should not be changed ---set to false only if you use self-signed certificate !
          transports: ['websocket'],
          rejectUnauthorized: false,
          secure: false,
          withCredentials: false,
          forceNew: true,
          timeout: 5000, //before connect_error and connect_timeout are emitted.
      });     
      
      //======check if connected ===
      this.socket.on("connect", () => {
        if(this.socket.connected){
          this.websocketService.listen(wfName).subscribe((data)=>{
            console.log(`Auto received data from server with listen event: ${data}`);
          });
        }
        else{console.log(`Unable to connect local server`);}
      });

      this.socket.on(wfName + 'Back', (msg)=>{
        //let ms = JSON.stringify(msg);
        console.log("Back MasterData from Server: " + msg);
      });      

      this.socket.on(wfName + '-updateDataStatus', (msg)=>{
        //let ms = JSON.stringify(msg);
        console.log("Reply of updateDataStatus from Server: " + msg);
      });

      
  }

  //====step 2==
  dashboardGridDef(){   
    return new Promise((resolve, reject)=>{
      this.mpTG.columnDefs = [];
      //=============set column definition start ===========
      this.mpTG.defaultColDef = {
        flex: 1,
        minWidth: 50,
        resizable: true, //to resize; add resizable: false to any individual column to disable resizingng that col only
        enableValue: true,
        enableRowGroup: true,
        enablePivot: true,
        sortable: true,
        filter: true,
        editable: this.isEditableDefaultColDef,
        //editable: true
        //editable: this.isEditableDefaultColDef
      };
      this.mpTG.defaultColDef.editable = this.isEditableDefaultColDef;
      this.mpTG.defaultColDef.singleClickEdit = this.isEditableDefaultColDef;

      //this.mpTG.detailCellRenderer = 'myDetailCellRenderer';
      this.mpTG.frameworkComponents = {         
        formCell: FormCellComponent,
        myDetailCellRenderer: DatagridcruddetailsComponent 
      };
      //--------for action btn link rendering start -------
      this.mpTG.rowGroupPanelShow = 'always';

      //=========for setting features on every subgroup items start=======
      // this.mpTG.autoGroupColumnDef = {
      //   headerName: 'Group',
      //   field: 'RequestStatus',
      //   minWidth: 30,
      //   cellRenderer: 'agGroupCellRenderer',
      //   cellRendererParams: {
      //     //  checkbox: true
      //   },
      // };
      //------------ subitem fetures ends -----------
      this.rowHeight = 45;
      this.components = {
        loadingRenderer: function (params) {
          if (params.value !== undefined) {
            return params.value;
          } else {
            return "<img src=\"https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/images/loading.gif\">";
          }
        },
      };

      this.rowSelection = 'single';
      //this.getRowNodeId = (data) => data.Title;
      //this.getRowNodeId = 1;
      //-------------col def ends -------------------
      resolve(this.mpTG);
    }) 
        
    
  }

  //=======step-1
  checkAuthorization(){
    return new Promise((resolve, reject)=>{
      this._actRoute.paramMap.subscribe(url => {
        //const wfName = url.get('id');
        const wfName = "WorkshopProposal";
        //this.clickedDashboardInfo.wfName = wfName;//uncomment for dynamically detect
        
        if (wfName) { 
          this.clickedDashboardInfo.listIndex = dashboardsListsInfo.findIndex(item => item.WfName === wfName);
          let wfIndex = this.clickedDashboardInfo.listIndex;
          // # pushing clickedDashboardInfo from 'dashboardsListsInfo' file to in memory #
          this.clickedDashboardInfo.config = dashboardsListsInfo[wfIndex];
          // # check dashboard view access is Public or Protected #
          if(dashboardsListsInfo[this.clickedDashboardInfo.listIndex].AcessPermission == 'Public'){
            this.clickedDashboardInfo.acessPermission = 'Public';
            this.logedInUser.access = 'FullAccess';
          } 
          // # check user included in the AuthUsersADId list #
          else if(dashboardsListsInfo[wfIndex].AuthUsersADId.length > 0){
            let auth = this.sharepointworkflowService.getSPLoggedInUser().then((res)=>{
              let id = <never>res;
              if(dashboardsListsInfo[wfIndex].AuthUsersADId.includes(id)){
                return true;
              }
            })
            if(auth){
              this.clickedDashboardInfo.acessPermission = 'Protected';
              this.logedInUser.access = 'FullAccess';
            }
          } 
          // # check user included in the AuthUsersEmpId list #
          else if((dashboardsListsInfo[wfIndex].AuthUsersEmpId).includes((this.sharepointlistService.getEmpIdNdOffice())[0].EmpID)){
            this.clickedDashboardInfo.acessPermission = 'Protected';
            this.logedInUser.access = 'FullAccess';
          }
          // # check user included in the AuthGroups list #
          else if(this.ifAuthGroupsMember(wfIndex)){
            this.clickedDashboardInfo.acessPermission = 'Protected';
            this.logedInUser.access = 'FullAccess';
          }
          else{
            this.clickedDashboardInfo.acessPermission = 'Unauthorized';
            this.logedInUser.access = 'NoAccess';
            alert("Unauthorized Access: You have no permission to get access this page ! Please contact with admin for your access.");
          }

          resolve(this.clickedDashboardInfo);
        }
      })
    })
    
  }

  async executeOnInitProcesses(){    
    try{      
      await this.dashboardGridDef();
      this.mpTG.columnDefs = this.requestInfo.GridColDef[0].GridColDef;
      let rowDataOnInit = this.requestInfo.GridColDef[0].GridColVal;      

      rowDataOnInit = rowDataOnInit.map((row, index) => {
        return { ...row, renderedGridDataSl: index + 1 };
      });

      let rD = [{
        '5YearPlan': "NO",
          AreaDescription: "Dhaka factory",
          BusinessArea: 1000,
          CAPEXStrategy: "Expansion of filling capacity",
          CCDescription: "DF SB",
          ClassCode: 3200,
          ClassDescription: "Plant & Machinery",
          Comments: "Without this new \r\nmachine production will be distorted",
          CostCenter: 10001001,
          CurAvaCapacity: "10000 GLN PER MONTH",
          ExistingAssetID: 20001501,
          ExpComMonth: 44713,
          ExpectedCapacity: "10000 GLN PER MONTH",
          ImportOrLocal: "Import ",
          Justfication: "Our exisiting Machine is out of order. This manchine is malfunctioning. To achive production target we need this new machine  ",
          NewOrReplace: "Replacement",
          PaybackCalculation: "1. Strategic Analysis from FPM\r\n2. User Feedback\r\n3. Here will be an attachment facility",
          ProposedItemDescription: "Lid press Machine",
          Qty: 1,
          ReqProdCapacity: "10000 GLN PER MONTH",
          SalesForecast: "7500 GLN PER MONTH",
          TotalBDT: 800000,
          UM: "NOS",
          UnitPrice: 800000,
          UserEmpID: "E00000",
          UserName: "Mr Amit Sarker",
      }]
      
      this.backupRowData = rowDataOnInit;
      this.rowData = rowDataOnInit;
      //this.rowData = rD;

      this.formGroup.valueChanges.subscribe((value:any)=>{
        console.log(JSON.stringify(value));
      })
      let contr = this.formGroup.controls;
    } 
    catch(err){
      console.log("Error: " + err)
    }
  }

  ngOnInit() {
    this.executeOnInitProcesses();
  }

  getTitleTag(rowData){
    //=========split titleTag =========
    return new Promise((resolve, reject)=>{
      if(rowData != undefined){
        if(rowData[0].hasOwnProperty('Title')){
          if(rowData[0].Title != null && rowData[0].Title != ''){
            this.dbTagUrlInfo.titleTag = rowData[0].Title.split('-')[0] + "-";
          }else if(rowData[5].Title != null && rowData[5].Title != ''){
            this.dbTagUrlInfo.titleTag = rowData[5].Title.split('-')[0] + "-";
          }else {
            this.dbTagUrlInfo.titleTag = rowData[10].Title.split('-')[0] + "-";
          }
        }
        else if(rowData[0].hasOwnProperty('RequestId')){
          if(rowData[0].RequestId != null && rowData[0].RequestId != ''){
            this.dbTagUrlInfo.titleTag = rowData[0].RequestId.split('-')[0] + "-";
          }else if(rowData[5].Title != null && rowData[5].Title != ''){
            this.dbTagUrlInfo.titleTag = rowData[5].RequestId.split('-')[0] + "-";
          }else {
            this.dbTagUrlInfo.titleTag = rowData[10].RequestId.split('-')[0] + "-";
          }
        }
        else if(rowData[0].hasOwnProperty('RequestID')){
          if(rowData[0].RequestID != null && rowData[0].RequestID != ''){
            this.dbTagUrlInfo.titleTag = rowData[0].RequestID.split('-')[0] + "-";
          }else if(rowData[5].Title != null && rowData[5].Title != ''){
            this.dbTagUrlInfo.titleTag = rowData[5].RequestID.split('-')[0] + "-";
          }else {
            this.dbTagUrlInfo.titleTag = rowData[10].RequestID.split('-')[0] + "-";
          }
        }
      }
      resolve(this.dbTagUrlInfo);
    })
    
  }

  async getDbInfoNdData(){
    await this.getSelectedDashboardInfo(this.clickedDashboardInfo);
    //await this.getRowData(this.clickedDashboardInfo);

    await this.getRecentMstrLocalData();
  }

  //===================== Export Table data to Excel start ==============
  onBtnExportDataAsExcel() {
    function rowGroupCallback(params) {
      return params.node.key;
    }

    this.mpTG.gridApi.exportDataAsExcel({
      processRowGroupCallback: rowGroupCallback,
    });
  }
  //===================== Export Table data to Excel end ==============

  //=============== Quick central filter function start ========== 
  //--------method-1: (with angular)--------
  quickSearch() {
    this.mpTG.gridApi.setQuickFilter(this.txtOfQuickSearchInpFld);
  }
  //--------method-2: (with Jquery)--------required to include oninput=onFilterTextBoxChanged() in html file--------
  // onFilterTextBoxChanged(){
  //   this.gridApi.setQuickFilter(document.querySelector('#filter-text-box'));
  // }
  //=============== Quick central filter function ends ==========


  //============= set row height methods starts 100% working ==============
  getRowHeight(params) {
    return groupHeight;
    // if (params.node.group) {
    //   return groupHeight;
    // }
  }

  setGroupHeight(height) {
    groupHeight = height;
    rowHeight = height;
    this.mpTG.gridApi.resetRowHeights();
  }

  setRowHeight(height) {
    // rowHeight = height;
    // this.mpTG.gridApi.resetRowHeights();

    this.mpTG.gridApi.forEachNode(function (rowNode) {
      //if (rowNode.data && rowNode.data.country === 'Russia') {
      // rowHeight = height;
      // this.mpTG.gridApi.resetRowHeights();  
      rowNode.setRowHeight(height);
      //}
    });
    this.mpTG.gridApi.onRowHeightChanged();
  }
  //------- set row height methods ends ---------------

  //=========== voice recognition start ==========  

  voiceSearch(){
    
    alert("Please say any word that you want to search with");

    

    let quickVoiceSearch = (txt) => {
      this.onGridReadyParamsApi.setQuickFilter(txt);
    }

    if('webkitSpeechRecognition' in window){
        const vSearch = new webkitSpeechRecognition();
        vSearch.continuous = false;
        vSearch.interimresults = false;
        vSearch.lang = 'en-US';
        vSearch.start();
        //const voiceSearchForm = this.formSearch.nativeElement;
        //const voiceHandler = this.hiddenSearchHandler.nativeElement;
        //const srcTxtVoiceHandler = this.filterTextBox.nativeElement; // for filter
        //console.log(voiceSearchForm);
        vSearch.onresult = function(e){
          //console.log(voiceSearchForm);
          //voiceHandler.value = e.results[0][0].transcript;
            vSearch.stop();
            //console.log(voiceHandler);
            //alert(e.results[0][0].transcript);
            
            this.txtOfQuickSearchInpFld = e.results[0][0].transcript;
            (document.getElementById('filter-text-box') as HTMLInputElement).value = this.txtOfQuickSearchInpFld;
            quickVoiceSearch(this.txtOfQuickSearchInpFld);

            
            //voiceSearchForm.submit();
        }
  
        vSearch.onerror = function(e){
            console.log(e);
            vSearch.stop();
        }

        
        
    } else {
      alert("webkitSpeechRecognition is not available.");
      //console.log(this.state.get(configKey, undefined as any));
      }
  }

  viewByVoice(){
    
    alert("Please say only the number of your request/application within 2-seconds");

    

    let quickVoiceSearch = (txt) => {
      this.onGridReadyParamsApi.setQuickFilter(txt);

      let itm = [];
      let prKey = '';

      if(dashboardsListsInfo[this.clickedDashboardInfo.listIndex].MasterListInfo.hasOwnProperty('primaryKey')){
        prKey = dashboardsListsInfo[this.clickedDashboardInfo.listIndex].MasterListInfo.primaryKey;
        if(prKey != 'Title'){
          itm = this.rowData.filter(item => item[prKey] == this.dbTagUrlInfo.titleTag + txt);
        }
        else{
          itm = this.rowData.filter(item => item.Title == this.dbTagUrlInfo.titleTag + txt);
        }
      }else{
        itm = this.rowData.filter(item => item.Title == this.dbTagUrlInfo.titleTag + txt);
      }

                
      
        //alert(itm[0].GUID); //this.dbTagUrlInfo.urlVoice  this.dbTagUrlInfo.idOrGuid
        (document.getElementById('viewByVoiceText') as HTMLInputElement).value = '        ' + this.dbTagUrlInfo.titleTag + txt;
        
        if(this.dbTagUrlInfo.qryStrKeyTyp == 'GUID'){
          this.dbTagUrlInfo.qryStrKeyVal = itm[0].GUID;
          let url = this.dbTagUrlInfo.urlVoice + this.dbTagUrlInfo.qryStrKeyVal + '&mode=read';
          window.open(url, "_blank");
        }
        else if(this.dbTagUrlInfo.qryStrKeyTyp == 'ID'){
          this.dbTagUrlInfo.qryStrKeyVal = itm[0].ID;
          let url = this.dbTagUrlInfo.urlVoice + this.dbTagUrlInfo.qryStrKeyVal + '&' + this.dbTagUrlInfo.mode1 + this.dbTagUrlInfo.mode2;
          window.open(url, "_blank");
        }
        
    }

    if('webkitSpeechRecognition' in window){
        const vSearch = new webkitSpeechRecognition();
        vSearch.continuous = false;
        vSearch.interimresults = false;
        vSearch.lang = 'en-US';
        vSearch.start();
        //const voiceSearchForm = this.formSearch.nativeElement;
        //const voiceHandler = this.hiddenSearchHandler.nativeElement;
        //const srcTxtVoiceHandler = this.filterTextBox.nativeElement; // for filter
        //console.log(voiceSearchForm);
        vSearch.onresult = function(e){
          //console.log(voiceSearchForm);
          //voiceHandler.value = e.results[0][0].transcript;
            vSearch.stop();
                        
            this.txtOfQuickSearchInpFld = e.results[0][0].transcript;
            //(document.getElementById('filter-text-box') as HTMLInputElement).value = this.txtOfQuickSearchInpFld;
            quickVoiceSearch(this.txtOfQuickSearchInpFld);

            
            //voiceSearchForm.submit();
        }
  
        vSearch.onerror = function(e){
            console.log(e);
            vSearch.stop();
        }

        
        
    } else {
      alert("webkitSpeechRecognition is not available.");
      //console.log(this.state.get(configKey, undefined as any));
      }
  }

  // //#### CRUD operation starts #### ===========
  // onCellClicked(params) {
  //   // Handle click event for action cells
  //   if (params.column.colId === "action" && params.event.target.dataset.action) {
  //     let action = params.event.target.dataset.action;

  //     if (action === "add") {
  //       let rowIndex = 1+ params.node.rowIndex;

  //       //this insert a new FormControl in an Array of FormControls
  //       const gridFormArray = <FormArray>this.formGroup.controls[this.gridControlName];

  //       // this.mpTG.columnDefs = [
  //       //   {
  //       //     headerName: "Sl#",
  //       //     valueGetter: "node.rowIndex + 1",
  //       //     editable: false,
  //       //   },
  //       //   {
  //       //     headerName: "action",
  //       //     minWidth: 150,
  //       //     cellRenderer: actionCellRenderer,
  //       //     editable: false,
  //       //     colId: "action"
  //       //   },
  //       //   { headerName: 'Order #', field: 'orderNumber', width: 110, suppressSizeToFit: true },
  //       //   { headerName: 'ClassCode', field: 'ClassCode', cellRenderer: 'formCell', editable:true },
  //       //   { headerName: 'ClassDescription', field: 'ClassDescription', cellRenderer: 'formCell', editable:true },
  //       //   { headerName: 'BusinessArea', field: 'BusinessArea', cellRenderer: 'formCell', editable:true }
  //       // ];
           
  //       // gridFormArray.insert(rowIndex,this.fb.group({
  //       //   orderNumber:[],
  //       //   ClassCode:[],
  //       //   ClassDescription:[],
  //       //   BusinessArea:[]
  //       // }))

  //       // const newItems = [
  //       //   //createNewRowData(),
  //       //   {Title: "New Title", EmployeeID: "New emmp ID", Status: "Added"}
  //       // ];

  //       let rowDataOnAdd = this.formGroup.get(this.gridControlName).value;
  //       // [

  //       //   {orderNumber: 1, ClassCode: 'WP-1', ClassDescription: "1270" , BusinessArea: 'Submitted'},
  //       //   {orderNumber: 2, ClassCode: 'WP-2', ClassDescription: "1271" , BusinessArea: 'OPMApproved'},
  //       //   {orderNumber: 3, ClassCode: 'WP-3', ClassDescription: "1272" , BusinessArea: 'CR'},
  //       //   {orderNumber: 4, ClassCode: 'WP-4', ClassDescription: "1273" , BusinessArea: 'Re-Submitted'},
  //       //   {orderNumber: 5, ClassCode: 'WP-5', ClassDescription: "1274" , BusinessArea: 'FPMApproved'},
  //       //   {orderNumber: 6, ClassCode: 'WP-6', ClassDescription: "1275" , BusinessArea: 'Completed'}
  //       // ];
        
  //       rowDataOnAdd.splice(rowIndex, 0, {undefined: null, orderNumber: "##", ClassCode: "", ClassDescription: "", BusinessArea: ""});
  
  //       rowDataOnAdd = rowDataOnAdd.map((row, index) => {
  //         return { ...row, renderedGridDataSl: index + 1 };
  //       });

  //       this.rowData = [];
  //       this.rowData = rowDataOnAdd;
        
  //       this.mpTG.gridApi.setRowData(rowDataOnAdd);
        
  //     }
  //     else if (action === "edit") {
  //       this.mpTG.defaultColDef.editable = true;
  //       params.api.startEditingCell({
  //         rowIndex: params.node.rowIndex,
  //         // gets the first columnKey
  //         colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
  //       });
  //     }
  //     else if (action === "delete") {
  //       params.api.applyTransaction({
  //         remove: [params.node.data]
  //       });
  //     }
  //     else if (action === "update") {
  //       params.api.stopEditing(false);
  //       //this.mpTG.gridApi.stopEditing(false);
  //     }
  //     else if (action === "cancel") {
  //       params.api.stopEditing(true);
  //     }
  //   }
  // }

  onRowEditingStarted(params) {
    //this.mpTG.gridApi.refreshCells({force: true});
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true
    });
  }

  onRowEditingStopped(params) {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true
    });
    this.formGroup.get(this.gridControlName)['controls'][params.rowIndex].patchValue(params.data);    
  }

  addItems(addIndex) {
    let api = this.mpTG.gridApi;
    const newItems = [
      //createNewRowData(),
      {Title: "New Title", EmployeeID: "New emmp ID", Status: "Added"},
    ];
    api.applyTransaction({
      add: newItems,
      addIndex: addIndex,
    });
    //printResult(res);
  }

  clearData() {
    this.mpTG.gridApi.setRowData([{Title: "New Title", EmployeeID: "New emmp ID", Status: "Added"}]);
  }

  

  // ------#### CRUD ends #### ---------------

  




  // removeData() {
  //   this.inputFile.nativeElement.value = '';
  //   this.dataSheet.next(null);
  //   this.keys = null;
  // }

  //-----------bulk upload ends ---
  private createKey(columnApi: ColumnApi, column: Column): any {
    return column.getColDef().field;
  }

  // private createKey(columnApi, column): any {
  //   return columnApi.getAllColumns().indexOf(column) - 1;
  // }

  getContext() {
    let context = {
      formArray: this.formGroup.controls[this.gridControlName],
      createKey: this.createKey
    }
    return context;
    // return {
    //   formArray: this.formGroup.controls[this.gridControlName],
    //   //formArray: this.gridForm.controls.stock,
    //   createKey: this.createKey
    // };
  }

  getRowNodeId(data: any) {
    //return data.renderedGridDataSl;
    return data.renderedGridDataSl;
    //return data.orderNumber;//renderedGridDataSl
  }

  getComponents() {
    return { formCell: FormCellComponent };
  }

  // refreshFormControls() {
  //   if (this.api) {
  //     this.createFormControls();
  //     this.api.refreshCells({ force: true });
  //   }
  // }

  // ## === for reset all data as it was onInit state === ##
  resetRowData = () => {
    const gridFormArray = <FormArray>this.formGroup.controls[this.gridControlName];
    const length = gridFormArray.controls.length;
    for (let i = 0; i < length; i++) gridFormArray.removeAt(i); //removing all existing form controls

    gridFormArray.push(this.gridControlsOnInit); //rendering with gridControlsOnInit
    this.formGroup.get('Datagridcrudhomeitems').patchValue(this.backupRowData); // rendering with data gridControlsOnInit
       
    //this.rowData = this.backupRowData;
    //this.formGroup.value.Datagridcrudhomeitems = this.backupRowData;
  };

  addRowData = () => {
    this.action = "addRowData";
    let newRowData = this.rowData.slice();
    this.rowData = [];
    let newRow = this.requestInfo.GridColDef[0].GridColValOnAdd;
    newRow = newRow.map((row, index) => {
      return { ...row, renderedGridDataSl: this.rowData.length + 1 };
    });

    newRowData.push(newRow);

    this.rowData = newRowData;

    this.outputToParent.emit(newRowData);
  };

  updateEvenRowData = () => {
    let newRowData = this.rowData.map((row, index) => {
      if (index % 2 === 0) {
        return { ...row, athlete: "Even Row" };
      }
      return row;
    });
    this.rowData = newRowData;
  };

  updateOddRowData = () => {
    let newRowData = this.rowData.map((row, index) => {
      if (index % 2 !== 0) {
        return { ...row, athlete: "Odd Row" };
      }
      return row;
    });
    this.rowData = newRowData;
  };

  removeRowData = () => {
    this.action = "removeRowData";
    let focusedNode = this.mpTG.gridApi.getSelectedRows()[0];
    
    let newRowData = this.rowData.filter(row => {
      return row !== focusedNode;
    });
    newRowData = newRowData.map((row, index) => {
      return { ...row, renderedGridDataSl: newRowData.length + 1 };
    });
    //this.mpTG.gridApi.rowModel.rowsToDisplay = [];
    this.rowData = [];
    this.formGroup.value.Datagridcrudhomeitems = [];
    this.rowData = newRowData;
    this.rowDataAfterCrud = newRowData;
    //this.outputToParent.emit(newRowData);

    this.gridRowItemsToEmit.deletedRowItems.push(focusedNode); //preserve deleted items
    this.gridRowItemsToEmit.newRowData.push(newRowData); //preserve newRowItems    
    this.outputToParent.emit(this.gridRowItemsToEmit);

  };

  //==========last=====
  GetOutputVal(valFrmChild: any) {
    // if (this.uId == "") {
    //   this.createReqInfoFrmChild = valFrmChild;
    // }
    // else {
    //   this.emitedDataFrmChild = valFrmChild;
    // }

  }

  
  excelDataLoadedInChild(valFrmChild: any) {
    // if (this.uId == "") {
    //   this.dataFrmExcelUpload = valFrmChild;
    //   this.populateGridData(this.dataFrmExcelUpload);
    // }
    // else {
    //   this.dataFrmExcelUpload = valFrmChild;
    //   //this.populateGridData(this.dataFrmExcelUpload);
    // }

  }

  ////-ends ---------

  onSelectionChanged(params){
    let focusedNode = this.mpTG.gridApi.getSelectedRows()[0];
    this.mpTG.gridApi = params.api;
    this.mpTG.gridColumnApi = params.columnApi;
    this.mpTG['rowNodeApi'] = params.rowNodeApi;
  }

  onCellClicked($event: CellClickedEvent) {
    if ($event.colDef.field === 'salary') {
      // const person: Person = Object.assign($event.data, {
      //   salary: $event.data.salary + 100
      // }) as Person;

      // this.dataSourceService.update(person);
    }
  }

  onCellValueChanged(event) {
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }

  onRowValueChanged(event) {
    var data = event.data;
    console.log(
      'onRowValueChanged: (' +
        data.ClassCode +
        ', ' +
        data.ClassDescription +
        ')'
    );
  }


}

var rowHeight, groupHeight;

function printResult(res) {
  console.log('---------------------------------------');
  if (res.add) {
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
  }
  if (res.remove) {
    res.remove.forEach(function (rowNode) {
      console.log('Removed Row Node', rowNode);
    });
  }
  if (res.update) {
    res.update.forEach(function (rowNode) {
      console.log('Updated Row Node', rowNode);
    });
  }
}

