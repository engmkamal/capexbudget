// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-horizontalgrid',
//   templateUrl: './horizontalgrid.component.html',
//   styleUrls: ['./horizontalgrid.component.scss']
// })
// export class HorizontalgridComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

//===========================
import { Component, OnInit, Input } from '@angular/core'; 
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ControlContainer, FormGroupDirective } from '@angular/forms';
//import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Column, ColumnApi, GridApi, GridReadyEvent, RowNode } from 'ag-grid-community';
import { FormCellComponent } from '../form-cell/form-cell.component';
import * as moment from 'moment';
//import { BranchService } from '../../branch.service';

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
  selector: 'app-horizontalgrid',
  templateUrl: './horizontalgrid.component.html',
  // styleUrls: ['./horizontalgrid.component.scss']
  //selector: 'horizontal-grid',
  //templateUrl: './horizontal-grid.component.html',
  styles: [
    `
      .container {
        height: 300px;
      }
    `
  ]
})
export class HorizontalgridComponent {
  private api: GridApi;
  private columnApi: ColumnApi;

  // gridForm: FormGroup = new FormGroup({
  //   stock: new FormArray([])
  // });

  columnDefs;
  rowData;

  @Input()
  public requestInfo: any;

  @Input() 
  formGroup: FormGroup;

  @Input() 
  gridControlName: any;
  
  defaultColDef: any;

  isEditableDefaultColDef:boolean = false;

  constructor(
    public controlContainer: ControlContainer,
    parent: FormGroupDirective,
    public snackBar: MatSnackBar,
    private fb: FormBuilder, 
    //private branchService: BranchService
    ) {
      this.formGroup = parent.control;
      this.executeOnInitProcesses();
  }

  async executeOnInitProcesses(){    
    try{  
      this.defaultColDef = {
        flex: 1,
        minWidth: 50,
        resizable: true, //to resize; add resizable: false to any individual column to disable resizingng that col only
        enableValue: true,
        enableRowGroup: true,
        enablePivot: true,
        sortable: true,
        filter: true,
        //editable: this.isEditableDefaultColDef
        editable: true
      };    
      //await this.dashboardGridDef();
      //this.columnDefs = await this.createColDef(this.requestInfo.GridColDef[0].DbViewColDef);
      let i = this.requestInfo.GridColDef[0].DbViewColDef;
      
      this.columnDefs = [];
      this.columnDefs.push({
          headerName: "Sl",
          valueGetter: "node.rowIndex + 1",
          editable: false,
          menuTabs: [],
          minWidth: 100,
        });
        this.columnDefs.push({
          headerName: "action",
          minWidth: 180,
          cellRenderer: actionCellRenderer,
          //cellRenderer: this.requestInfo.actionCellRenderer,
          editable: false,
          colId: "action",
          menuTabs: [],
        });
      await i.forEach(element => {
        this.columnDefs.push({
          headerName: element.headerName,
          field: element.field,
          minWidth: 180,
          editable: true,
          cellRenderer: 'formCell',
        });
      })
      
      
      // this.columnDefs = colsDefs;
      // this.columnDefs = [];
      // this.columnDefs.push({ headerName: 'Order #', field: 'orderNumber', width: 110, suppressSizeToFit: true });
      // this.columnDefs.push({ headerName: 'Make', field: 'make', cellRenderer: 'formCell', editable:true });
      // this.columnDefs.push({ headerName: 'Model', field: 'model', cellRenderer: 'formCell', editable:true });

    // this.columnDefs = [
    //   { headerName: 'Order #', field: 'orderNumber', width: 110, suppressSizeToFit: true },
    //   { headerName: 'ClassCode', field: 'ClassCode', cellRenderer: 'formCell', editable:true },
    //   { headerName: 'ClassDescription', field: 'ClassDescription', cellRenderer: 'formCell', editable:true },
    //   { headerName: 'BusinessArea', field: 'BusinessArea', cellRenderer: 'formCell', editable:true }
    // ];

    // this.rowData = [
    //   {orderNumber: 1, make: "Toyota", model: "Celica", price: 35000},
    //   {orderNumber: 5, make: "Ford", model: "Mondeo", price: 32000},
    //   {orderNumber: 7, make: "Porsche", model: "Boxter", price: 72000},
    //   {orderNumber: 11, make: "Seat", model: "Leon", price: 32000},
    //   {orderNumber: 20, make: "Honda", model: "CRV", price: 35000}
    // ];

      this.rowData = [
        {orderNumber: 1, ClassCode: 'WP-1', ClassDescription: "1270" , BusinessArea: 'Submitted'},
        {orderNumber: 2, ClassCode: 'WP-2', ClassDescription: "1271" , BusinessArea: 'OPMApproved'},
        {orderNumber: 3, ClassCode: 'WP-3', ClassDescription: "1272" , BusinessArea: 'CR'},
        {orderNumber: 4, ClassCode: 'WP-4', ClassDescription: "1273" , BusinessArea: 'Re-Submitted'},
        {orderNumber: 5, ClassCode: 'WP-5', ClassDescription: "1274" , BusinessArea: 'FPMApproved'},
        {orderNumber: 6, ClassCode: 'WP-6', ClassDescription: "1275" , BusinessArea: 'Completed'}
      ]
    } 
    catch(err){
      console.log("Error: " + err)
    }
  }

  ngOnInit(): void {
    this.executeOnInitProcesses();
    //=== ### activate below line if it needs to add formControlName from child component ### ===
    //this.formGroup.addControl(this.gridControlName, this.fb.array([]));
  }



  gridReady(params: GridReadyEvent) {
    this.api = params.api;
    this.columnApi = params.columnApi;

    this.refreshFormControls();

    this.api.sizeColumnsToFit();
  }

  refreshFormControls() {
    if (this.api) {
      this.createFormControls();
      this.api.refreshCells({ force: true });
    }
  }

  private createFormControls() {
    let columns = this.columnApi.getAllColumns();

    const stockFormArray = <FormArray>this.formGroup.controls[this.gridControlName];

    const length = stockFormArray.controls.length;

    for (let i = 0; i < length; i++) stockFormArray.removeAt(i);

    this.api.forEachNode((rowNode: RowNode) => {
      const formGroup: FormGroup = new FormGroup({});
      columns.forEach((column: Column) => {
        const key = this.createKey(this.columnApi, column);
        //formGroup.setControl(key, new FormControl(rowNode.data[key]));
        formGroup.addControl(key, new FormControl(rowNode.data[key]));
      });
      stockFormArray.push(formGroup);
    });
  }

  getRowNodeId(data: any) {
    return data.orderNumber;
  }

  getComponents() {
    return { formCell: FormCellComponent };
  }

  getContext() {
    return {
      formArray: this.formGroup.controls[this.gridControlName],
      //formArray: this.gridForm.controls.stock,
      createKey: this.createKey
    };
  }

  onSubmit() {
   // console.dir(this.gridForm.value);
  }

  private createKey(columnApi: ColumnApi, column: Column): any {
    return column.getColDef().field;
  }




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
            //minWidth: el.minWidth,
            editable: true,
            menuTabs: [],
            // sortable: true,
            // enableRowGroup: true,
            // filter: 'agSetColumnFilter',
            // filterParams: {
            //   resetButton: true,
            // },
            //menuTabs: ['filterMenuTab', 'generalMenuTab'],
            
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
            //minWidth: el.minWidth,
            menuTabs: []
          }
          return numFld;
        }
    
        function setViewLinkGuidField(el) {
    
          let vwLnkFld = {
            headerName: el.headerName,
            field: el.field,
            cellRenderer: function (params) {
              //return '<a href="https://portal.bergerbd.com/leaveauto/SitePages/' + dashboardsListsInfo[i.listIndex].WfName + '.aspx?UniqueId=' + params.value + '&mode=read" target="_blank">View</a>'
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
                return "";
               // return '<a href="https://portal.bergerbd.com/leaveauto/SitePages/' + dashboardsListsInfo[i.listIndex].WfName + '.aspx?UniqueId=' + params.data.GUID + '&mode=read" target="_blank">View</a>' + "&nbsp;&nbsp;&nbsp;&nbsp;" + '<a href=' + window.location.href + "/SitePages/" + el.toPageName + "?UniqueId=" + params.data.GUID + "&itemId=" + params.data.Title.replace("HRSR-", "") + "&status=" + params.data.Status + ' target="_blank">AssignTask</a>';
              }
              else {
                //return '<a href="https://portal.bergerbd.com/leaveauto/SitePages/' + dashboardsListsInfo[i.listIndex].WfName + '.aspx?UniqueId=' + params.value + '&mode=read" target="_blank">View</a>';
                return "";
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

        this.columnDefs = [];
      

        // colDefs.push({
        //   headerName: "Sl",
        //   valueGetter: "node.rowIndex + 1",
        //   editable: false,
        //   menuTabs: [],
        //   minWidth: 50,
        // });
        // colDefs.push({
        //   headerName: "action",
        //   minWidth: 180,
        //   //cellRenderer: this.requestInfo.actionCellRenderer,
        //   editable: false,
        //   colId: "action",
        //   menuTabs: [],
        // });
    
        //dashboardsListsInfo[i.listIndex].DbViewColDef.forEach(element => {
          i.forEach(element => { 
          
          // const obj = {
          //   "TitleWithMDField": colDefs.push(setTitleWithMDField(element)),
          //   "TitleWitouthMDField": colDefs.push(setTitleWitouthMDField(element)),
          //   "DateField": colDefs.push(setDateField(element)),
          //   "TextField": colDefs.push(setTextField(element)),
          //   "NumberField": colDefs.push(setNumberField(element)),
          //   "GetSetDateField": colDefs.push(setGetSetDateField(element)),
          //   "GetSetTextField": colDefs.push(setGetSetTextField(element)),
          //   "GetSetNumberField": colDefs.push(setGetSetNumberField(element)),
          //   "CustomLinkField": colDefs.push(setCustomLinkField(element)),
          //   "GetSetPeopleField": colDefs.push(setGetSetPeopleField(element)),
          //   "GetSetMulLinTextField": colDefs.push(setGetSetMulLinTextField(element)),
          //   "ViewLinkGuidField": function(){
          //     this.dbTagUrlInfo.qryStrKeyTyp = 'GUID';
          //     this.dbTagUrlInfo.urlVoice = 'https://portal.bergerbd.com/leaveauto/SitePages/' + dashboardsListsInfo[i.listIndex].WfName + '.aspx?UniqueId=';
          //     return colDefs.push(setViewLinkGuidField(element));  
              
          //   },
          //   "ViewLinkIdField": function(){
          //     this.dbTagUrlInfo.qryStrKeyTyp = 'ID';
          //     //this.dbTagUrlInfo.urlVoice = window.location.href + element.pageUrl + '?' + element.qString + '=';
          //     this.dbTagUrlInfo.urlVoice = 'https://portal.bergerbd.com/' + element.siteUrl + element.pageUrl + '?' + element.qString + '=';
          //     this.dbTagUrlInfo.mode1 = element.mode1;
          //     this.dbTagUrlInfo.mode2 = element.mode2;
          //     return colDefs.push(setViewLinkIdField(element));
              
          //   }
          // };
    
          // return obj[element.fldType];

          
          this.columnDefs.push({
            headerName: element.headerName,
            field: element.field,
            minWidth: 180,
          });
          // if (element.fldType == "TitleWithMDField") {
          //   this.columnDefs.push(setTitleWithMDField(element));
          // }
          // else if (element.fldType == "TitleWitouthMDField") {
          //   this.columnDefs.push(setTitleWitouthMDField(element));
          // }
          // else if (element.fldType == "DateField") {
          //   this.columnDefs.push(setDateField(element));
          // }
          // else if (element.fldType == "TextField") {
          //   this.columnDefs.push(setTextField(element));
          // }
          // else if (element.fldType == "NumberField") {
          //   this.columnDefs.push(setNumberField(element));
          // }
          // else if (element.fldType == "ViewLinkGuidField") {
          //   this.columnDefs.push(setViewLinkGuidField(element));
          // }
          // else if (element.fldType == "ViewLinkIdField") {
          //   this.columnDefs.push(setViewLinkIdField(element));        
          // }
          // else if (element.fldType == "GetSetDateField") {
          //   this.columnDefs.push(setGetSetDateField(element));
          // }
          // else if (element.fldType == "GetSetTextField") {
          //   this.columnDefs.push(setGetSetTextField(element));
          // }
          // else if (element.fldType == "GetSetNumberField") {
          //   this.columnDefs.push(setGetSetNumberField(element));
          // }
          // else if (element.fldType == "CustomLinkField") {
          //   this.columnDefs.push(setCustomLinkField(element));
          // }
          // else if (element.fldType == "GetSetPeopleField") {
          //   this.columnDefs.push(setGetSetPeopleField(element));
          // }
          // else if (element.fldType == "GetSetMulLinTextField") {
          //   this.columnDefs.push(setGetSetMulLinTextField(element));
          // }
          resolve(this.columnDefs);
        });        

        // colDefs = [];

        // colDefs.push({
        //   headerName: "Sl",
        //   valueGetter: "node.rowIndex + 1",
        //   editable: false,
        // });
        // colDefs.push({
        //   headerName: "action",
        //   minWidth: 180,
        //   cellRenderer: actionCellRenderer,
        //   editable: false,
        //   colId: "action"
        // });

        // colDefs.push({
        //   headerName: "ClassCode",
        //   field: 'ClassDescription',
        //   minWidth: 180
        // });
      

        

        
       // return this.columnDefs;
       resolve(this.columnDefs);
    })
  }

    //#### CRUD operation starts #### ===========
    onCellClicked(params) {
      // Handle click event for action cells
      if (params.column.colId === "action" && params.event.target.dataset.action) {
        let action = params.event.target.dataset.action;
  
        if (action === "add") {
          let rowIndex= 1+ params.node.rowIndex;
          const newItems = [
            //createNewRowData(),
            {Title: "New Title", EmployeeID: "New emmp ID", Status: "Added"}
          ];
  
          this.rowData.splice(rowIndex, 0, {Title: "New Title", EmployeeID: "New emmp ID", Status: "Added"});
          
          //this.mpTG.gridOptions.api.setRowData(this.rowData);
          this.api.setRowData(this.rowData);
          
          
          //this.rowData = [];
          //this.mpTG.gridOptions.api.resetRowData(newData);
          //this.rowData = [{Title: "New Title", EmployeeID: "New emmp ID"}];       
  
            //this.mpTG.gridApi.applyTransaction({ add: [{Title: "My Title", EmployeeID: "New emmp ID"}] });
  
          // const res = this.mpTG.gridApi.applyTransaction({
          //   add: newItems,
          //   addIndex: params.node.rowIndex,
          // });
  
          // printResult(res);
          
        }
        else if (action === "edit") {
          this.defaultColDef.editable = true;
          params.api.startEditingCell({
            rowIndex: params.node.rowIndex,
            // gets the first columnKey
            colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
          });
        }
        else if (action === "delete") {
          params.api.applyTransaction({
            remove: [params.node.data]
          });
        }
        else if (action === "update") {
          params.api.stopEditing(false);
        }
        else if (action === "cancel") {
          params.api.stopEditing(true);
        }
      }
    }
  

  onRowEditingStarted(params) {
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
  }
}
