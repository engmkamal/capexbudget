// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-capexbudgetparent',
//   templateUrl: './capexbudgetparent.component.html',
//   styleUrls: ['./capexbudgetparent.component.scss']
// })
// export class CapexbudgetparentComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

//========================

import { AfterViewInit, Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, VERSION, ViewEncapsulation, ViewChild, ViewContainerRef, AfterContentInit, Compiler, Injector, NgModuleFactory, Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from "@angular/forms";
import { from } from "rxjs";
import { SharepointworkflowService } from "src/app/shared/services/sharepointworkflow.service";
//import { data } from "../data";

import { IItem} from "src/app/shared/models/interfaces/isplist";
import { IWorkflowrequestor } from "src/app/shared/models/interfaces/iworkflowrequestor";

import pnp, { sp, Item, ItemAddResult, ItemUpdateResult } from "sp-pnp-js";
import * as moment from 'moment';
import { DatagridcrudhomeComponent } from "src/app/shared/CustomModules/datagridcrud/datagridcrudhome/datagridcrudhome.component";
import { Container } from "@angular/compiler/src/i18n/i18n_ast";
import { CommentfieldhomeComponent } from "src/app/shared/CustomModules/commentfield/commentfieldhome/commentfieldhome.component";
import { DisplayanyinfohomeComponent } from "src/app/shared/CustomModules/displayanyinfo/displayanyinfohome/displayanyinfohome.component";
//import { DisplayanyinfoModule } from "src/app/shared/CustomModules/displayanyinfo/displayanyinfo.module";
import { ComponentdatabindingService } from "src/app/shared/services/componentdatabinding.service";
//import { RequestorhomeComponent } from "src/app/shared/CustomModules/requestor/requestorhome/requestorhome.component";
import { EmpInfoBindingService } from "src/app/shared/services/emp-info-binding.service";
import { RequestoronbehalfofhomeComponent } from "src/app/shared/CustomModules/requestoronbehalfof/requestoronbehalfofhome/requestoronbehalfofhome.component";
//import { RequestorparentComponent } from "src/app/shared/CustomModules/requestor/requestorparent/requestorparent.component";

//import { DisplayanyinfoModule } from "../../../../../shared/CustomModules/displayanyinfo/displayanyinfo.module";
//=========== data grid info can be imported from outside file as well ========
export const dashboardsListsInfo =   
[
    {
        WfName: 'capexbudget',
        AcessPermission: 'Protected',
        AuthGroups: [],
        AuthUsersADId: [208, 296, 350, 21, 1026],  //208-A M M Fazlur Rashid, [296, Tanzina Ahmed], [350, Muntasir Zaman], [21, "SHOAB MAHMOOD AL NAOSHAD"], [47, "MD. ARIFUR RAHMAN TALUKDER"], [450, "TANVIR AHMED"], [447, "MD SAKIBUR RAHMAN"],[222, "HASIM UDDIN"], [194, "NAWSHAR AHAMMED"]
        AuthUsersEmpId: ['334', '1270'],  //[Mahbubur Rahman: empId-232, adid-129], [38, H M Rakib Ullah Bashar], [empId-334, adid-21, "SHOAB MAHMOOD AL NAOSHAD"], [47, "MD. ARIFUR RAHMAN TALUKDER"], [450, "TANVIR AHMED"], [447, "MD SAKIBUR RAHMAN"],[222, "HASIM UDDIN"], [194, "NAWSHAR AHAMMED"], 
        DisplayTxt: 'Capex Budget Proposal',
        MasterListInfo: { name: 'CapexBudgetMaster', select: 'Status , EmployeeID , GUID , Modified , Created , PendingWith/ID , PendingWith/Title , Author/ID , Author/Title , ID , Title , Author/Office , Author/JobTitle , TotalEstimatedAmount', expand: 'Author , PendingWith', orderByPrm: 'Created', orderByVal: false, top: 100000, jsonStringField: '', parsedFldForDb: ''},
        RenderDetListInfo: [{ name: 'CapexBudgetMaster', select: 'ExpectedDate, Author/ID, Author/Office, WorkshopLocation, ExpectedParticipant, Purpose, TotalAmount, Title, GLCode, CostCenter, IONumber, FoodCost, HallOrVenueRent, PromotionalItem, DecorationCost, OtherCost, BudgetedExpenditure, ActualLocation, ActualParticipant, ActualFoodCost, ActualDecorationCost, ActualHallOrVenueRent, ActualPromotionalItem, ActualExpenditure, ActualOtherCost', expand: 'Author', filterBy: 'Title', filterWith: 'Title', top: 100000, jsonStringField: '', parsedFldForDb: ''}],
        DetailsListInfo: [{ name: 'CapexBudgetMaster', select: 'ExpectedDate, Author/ID, Author/Office, WorkshopLocation, ExpectedParticipant, Purpose, TotalAmount, Title, GLCode, CostCenter, IONumber, FoodCost, HallOrVenueRent, PromotionalItem, DecorationCost, OtherCost, BudgetedExpenditure, ActualLocation, ActualParticipant, ActualFoodCost, ActualDecorationCost, ActualHallOrVenueRent, ActualPromotionalItem, ActualExpenditure, ActualOtherCost', expand: 'Author', orderByPrm: 'Created', orderByVal: false, top: 100000, jsonStringField: '', parsedFldForDb: ''}],
        ServiceFunction: { masterList: 'fetchListItemWithExpStFilOrd', renderDetList: 'fetchListItemsWithFilterExpand', DetailList: 'fetchListItemsWithFilterExpand' },
        DbViewColDef: [
            { fldType: 'TextField', headerName: 'ClassCode', field: 'ClassCode', minWidth: 165, hide: true},
            { fldType: 'TextField', headerName: 'ClassDescription', field: 'ClassDescription', minWidth: 150},
            { fldType: 'TextField', headerName: 'BusinessArea', field: 'BusinessArea', minWidth: 150,},
            { fldType: 'TextField', headerName: 'AreaDescription', field: 'AreaDescription', minWidth: 165,},
            { fldType: 'TextField', headerName: 'CostCenter', field: 'CostCenter', minWidth: 165,},
            { fldType: 'TextField', headerName: 'CCDescription', field: 'CCDescription', viewLink: '', minWidth: 120},
            { fldType: 'TextField', headerName: 'Proposed Item Description', field: 'ProposedItemDescription', minWidth: 165},
            { fldType: 'TextField', headerName: 'Import or Local', field: 'ImportOrLocal', minWidth: 120, hide: true},
            { fldType: 'NumberField', headerName: 'Qty', field: 'Qty', minWidth: 165, hide: true},
            { fldType: 'TextField', headerName: 'UM', field: 'UM', minWidth: 150},
            { fldType: 'TextField', headerName: 'Unit Price (BDT)', field: 'UnitPrice', minWidth: 150,},
            { fldType: 'TextField', headerName: 'Total (BDT)', field: 'TotalBDT', minWidth: 165,},
            { fldType: 'TextField', headerName: 'Justfication for CAPEX Requirement', field: 'Justfication', minWidth: 165,},
            { fldType: 'TextField', headerName: 'UserName', field: 'UserName', viewLink: '', minWidth: 120},
            { fldType: 'TextField', headerName: 'UserEmpID', field: 'UserEmpID', minWidth: 165},
            { fldType: 'TextField', headerName: '5YearPlan', field: '5YearPlan', minWidth: 120, hide: true},
            { fldType: 'TextField', headerName: 'CurAvaCapacity', field: 'CurAvaCapacity', minWidth: 165, hide: true},
            { fldType: 'TextField', headerName: 'ReqProdCapacity', field: 'ReqProdCapacity', minWidth: 150},
            { fldType: 'TextField', headerName: 'SalesForecast', field: 'SalesForecast', minWidth: 150,},
            { fldType: 'TextField', headerName: 'ExpectedCapacity', field: 'ExpectedCapacity', minWidth: 165,},
            { fldType: 'TextField', headerName: 'ExpComMonth', field: 'ExpComMonth', minWidth: 165,},
            { fldType: 'TextField', headerName: 'NewOrReplace', field: 'NewOrReplace', viewLink: '', minWidth: 120},
            { fldType: 'TextField', headerName: 'ExistingAssetID', field: 'ExistingAssetID', minWidth: 150,},
            { fldType: 'TextField', headerName: 'CAPEXStrategy', field: 'CAPEXStrategy', minWidth: 165,},
            { fldType: 'TextField', headerName: 'Comments', field: 'Comments', minWidth: 165,}


        ],
        RenderViewColDef: [
            { fldType: 'DateField', headerName: 'Date', field: 'ExpectedDate', valueGetter: 'ExpectedDate', minWidth: 120},
            { fldType: 'TextField', headerName: 'Location', field: 'WorkshopLocation', minWidth: 220},
            { fldType: 'TextField', headerName: 'PromotionalItem', field: 'PromotionalItem', minWidth: 165},
            { fldType: 'NumberField', headerName: 'Ex.Participant', field: 'ExpectedParticipant', minWidth: 120, hide: true},
            { fldType: 'NumberField', headerName: 'Ac.Participant',field: 'ActualParticipant', minWidth: 165, hide: true},
            { fldType: 'TextField', headerName: 'Purpose', field: 'Purpose', minWidth: 150},
            { fldType: 'NumberField', headerName: 'TotalAmount', field: 'TotalAmount', minWidth: 150,},
            { fldType: 'NumberField', headerName: 'ActualExpenditure', field: 'ActualExpenditure', minWidth: 165,},
            

        ],
        GridColDef: [
          { headerName: "Sl", field: 'Sl', valueGetter: "node.rowIndex + 1", editable: false, minWidth: 80, colId: "Sl", menuTabs: [], checkboxSelection: true  },
          { headerName: 'ClassCode', field: 'ClassCode', minWidth: 120, editable: false, colId: "ClassCode", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'ClassDescription', field: 'ClassDescription', minWidth: 180, editable: false, colId: "ClasClassDescriptionsCode", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'BusinessArea', field: 'BusinessArea', minWidth: 140, editable: false, colId: "BusinessArea", menuTabs: [], cellRenderer: 'formCell' },
          { headerName: 'AreaDescription', field: 'AreaDescription', minWidth: 165, editable: false, colId: "AreaDescription", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'CostCenter', field: 'CostCenter', minWidth: 120, editable: false, colId: "CostCenter", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'CCDescription', field: 'CCDescription', minWidth: 140, editable: false, colId: "CCDescription", menuTabs: [], cellRenderer: 'formCell' },
          { headerName: 'Proposed Item Description', field: 'ProposedItemDescription', minWidth: 250, editable: false, colId: "ProposedItemDescription", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'Import or Local', field: 'ImportOrLocal', minWidth: 140, editable: false, colId: "ImportOrLocal", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'Qty', field: 'Qty', minWidth: 80, editable: false, colId: "Qty", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'UM', field: 'UM', minWidth: 80, editable: false, colId: "UM", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'Unit Price(BDT)', field: 'UnitPrice', minWidth: 160, editable: false, colId: "UnitPrice", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'Total (BDT)', field: 'TotalBDT', minWidth: 150, editable: false, colId: "TotalBDT", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'CAPEX Requirement Justfication', field: 'Justfication', minWidth: 250, editable: false, colId: "Justfication", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'UserName', field: 'UserName', minWidth: 180, editable: false, colId: "UserName", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'UserEmpID', field: 'UserEmpID', minWidth: 120, editable: false, colId: "UserEmpID", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: '5YearPlan', field: '5YearPlan', minWidth: 160, editable: false, colId: "5YearPlan", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'CurAvaCapacity', field: 'CurAvaCapacity', minWidth: 180, editable: false, colId: "CurAvaCapacity", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'ReqProdCapacity', field: 'ReqProdCapacity', minWidth: 180, editable: false, colId: "ReqProdCapacity", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'SalesForecast', field: 'SalesForecast', minWidth: 150, editable: false, colId: "SalesForecast", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'ExpectedCapacity', field: 'ExpectedCapacity', minWidth: 165, editable: false, colId: "ExpectedCapacity", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'ExpComMonth', field: 'ExpComMonth', minWidth: 150, editable: false, colId: "ExpComMonth", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'NewOrReplace', field: 'NewOrReplace', minWidth: 130, editable: false, colId: "NewOrReplace", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'ExistingAssetID', field: 'ExistingAssetID', minWidth: 150, editable: false, colId: "ExistingAssetID", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'CAPEXStrategy', field: 'CAPEXStrategy', minWidth: 200, editable: false, colId: "CAPEXStrategy", menuTabs: [], cellRenderer: 'formCell'},
          { headerName: 'Comments', field: 'Comments', minWidth: 165, editable: false, colId: "Comments", menuTabs: [], cellRenderer: 'formCell' }
        ],
        GridColDefWithoutControl: [          
          { headerName: "Sl", field: 'Sl', valueGetter: "node.rowIndex + 1", editable: false, minWidth: 80, colId: "Sl", menuTabs: [] },
          { headerName: 'ClassCode', field: 'ClassCode', minWidth: 120, editable: true, colId: "ClassCode", menuTabs: [], },
          { headerName: 'ClassDescription', field: 'ClassDescription', minWidth: 180, editable: true, colId: "ClasClassDescriptionsCode", menuTabs: [],},
          { headerName: 'BusinessArea', field: 'BusinessArea', minWidth: 140, editable: true, colId: "BusinessArea", menuTabs: [], },
          { headerName: 'AreaDescription', field: 'AreaDescription', minWidth: 165, editable: true, colId: "AreaDescription", menuTabs: [],},
          { headerName: 'CostCenter', field: 'CostCenter', minWidth: 120, editable: true, colId: "CostCenter", menuTabs: [],},
          { headerName: 'CCDescription', field: 'CCDescription', minWidth: 140, editable: true, colId: "CCDescription", menuTabs: [], },
          { headerName: 'Proposed Item Description', field: 'ProposedItemDescription', minWidth: 250, editable: true, colId: "ProposedItemDescription", menuTabs: [],},
          { headerName: 'Import or Local', field: 'ImportOrLocal', minWidth: 200, editable: true, colId: "ImportOrLocal", menuTabs: [],},
          { headerName: 'Qty', field: 'Qty', minWidth: 80, editable: true, colId: "Qty", menuTabs: [],},
          { headerName: 'UM', field: 'UM', minWidth: 80, editable: true, colId: "UM", menuTabs: [],},
          { headerName: 'Unit Price(BDT)', field: 'UnitPrice', minWidth: 160, editable: true, colId: "UnitPrice", menuTabs: [],},
          { headerName: 'Total (BDT)', field: 'TotalBDT', minWidth: 150, editable: true, colId: "TotalBDT", menuTabs: [],},
          { headerName: 'CAPEX Requirement Justfication', field: 'Justfication', minWidth: 250, editable: true, colId: "Justfication", menuTabs: [],},
          { headerName: 'UserName', field: 'UserName', minWidth: 130, editable: true, colId: "UserName", menuTabs: [],},
          { headerName: 'UserEmpID', field: 'UserEmpID', minWidth: 120, editable: true, colId: "UserEmpID", menuTabs: [],},
          { headerName: '5YearPlan', field: '5YearPlan', minWidth: 160, editable: true, colId: "5YearPlan", menuTabs: [],},
          { headerName: 'CurAvaCapacity', field: 'CurAvaCapacity', minWidth: 180, editable: true, colId: "CurAvaCapacity", menuTabs: [],},
          { headerName: 'ReqProdCapacity', field: 'ReqProdCapacity', minWidth: 180, editable: true, colId: "ReqProdCapacity", menuTabs: [],},
          { headerName: 'SalesForecast', field: 'SalesForecast', minWidth: 150, editable: true, colId: "SalesForecast", menuTabs: [],},
          { headerName: 'ExpectedCapacity', field: 'ExpectedCapacity', minWidth: 165, editable: true, colId: "ExpectedCapacity", menuTabs: [],},
          { headerName: 'ExpComMonth', field: 'ExpComMonth', minWidth: 150, editable: true, colId: "ExpComMonth", menuTabs: [],},
          { headerName: 'NewOrReplace', field: 'NewOrReplace', minWidth: 130, editable: true, colId: "NewOrReplace", menuTabs: [],},
          { headerName: 'ExistingAssetID', field: 'ExistingAssetID', minWidth: 150, editable: true, colId: "ExistingAssetID", menuTabs: [],},
          { headerName: 'CAPEXStrategy', field: 'CAPEXStrategy', minWidth: 200, editable: true, colId: "CAPEXStrategy", menuTabs: [],},
          { headerName: 'Comments', field: 'Comments', minWidth: 165, editable: true, colId: "Comments", menuTabs: [], }
        ],
        GridColVal: [
          { ClassCode: "", ClassDescription: '', BusinessArea: "", AreaDescription: '', CostCenter: '', CCDescription: "", ProposedItemDescription: '',
            ImportOrLocal: 'Import', Qty: 1, UM: 'NOS', UnitPrice: "", TotalBDT: '', Justfication: '',
            UserName: '', UserEmpID: '', '5YearPlan': '', CurAvaCapacity: '', ReqProdCapacity: "",
            SalesForecast: '', ExpectedCapacity: '', ExpComMonth: '', NewOrReplace: '', ExistingAssetID: "", CAPEXStrategy: '', Comments: ''},
        ],
        validationMessages: 
          { 
            ClassCode: { required: "ClassCode is required !", minlength: "ClassCode must be greater than 2 charecters !", maxlength: "ClassCode must be less than 8 charecters !"}, 
            ClassDescription: '', 
            BusinessArea: { required: "BusinessArea is required !", minlength: "BusinessArea must be greater than 2 charecters !", maxlength: "BusinessArea must be less than 8 charecters !"}, 
            AreaDescription: '', 
            CostCenter: { required: "CostCenter is required !", minlength: "CostCenter must be greater than 8 charecters !", maxlength: "CostCenter must be less than 8 charecters !"}, 
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
        },
        gridValidationParam:          
        { 
          ClassCode: [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
          ClassDescription: [Validators.maxLength(50)], 
          BusinessArea: [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
          AreaDescription: [Validators.maxLength(50)], 
          CostCenter: [Validators.required, Validators.minLength(8), Validators.maxLength(10)], 
          CCDescription: [Validators.maxLength(20)], 
          ProposedItemDescription: [Validators.maxLength(100)],
          ImportOrLocal: [Validators.required, Validators.maxLength(10)], 
          Qty: [Validators.required, Validators.maxLength(3)], 
          UM: [Validators.required, Validators.minLength(1), Validators.maxLength(6)], 
          UnitPrice: [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
          TotalBDT: [Validators.required, Validators.minLength(1), Validators.maxLength(11)], 
          Justfication: [Validators.required, Validators.minLength(4), Validators.maxLength(150)],
          UserName: [Validators.required, Validators.minLength(4), Validators.maxLength(40)], 
          UserEmpID: [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
          '5YearPlan': [Validators.minLength(0), Validators.maxLength(6)], 
          CurAvaCapacity: [Validators.minLength(4), Validators.maxLength(20)], 
          ReqProdCapacity: [Validators.minLength(4), Validators.maxLength(20)],
          SalesForecast: [Validators.minLength(4), Validators.maxLength(25)], 
          ExpectedCapacity: [Validators.minLength(4), Validators.maxLength(25)], 
          ExpComMonth: [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
          NewOrReplace: [Validators.required, Validators.minLength(3), Validators.maxLength(11)], 
          ExistingAssetID: [Validators.required, Validators.minLength(4), Validators.maxLength(10)], 
          CAPEXStrategy: [Validators.minLength(0), Validators.maxLength(30)], 
          Comments: [Validators.minLength(0), Validators.maxLength(100)]
        },

          
    }
];

export const dashboardsListsInfo2 =   
[
    {
        WfName: 'WorkshopProposal',
        AcessPermission: 'Protected',
        AuthGroups: [],
        AuthUsersADId: [208, 296, 350, 21, 1026],  //208-A M M Fazlur Rashid, [296, Tanzina Ahmed], [350, Muntasir Zaman], [21, "SHOAB MAHMOOD AL NAOSHAD"], [47, "MD. ARIFUR RAHMAN TALUKDER"], [450, "TANVIR AHMED"], [447, "MD SAKIBUR RAHMAN"],[222, "HASIM UDDIN"], [194, "NAWSHAR AHAMMED"]
        AuthUsersEmpId: ['334', '1270'],  //[Mahbubur Rahman: empId-232, adid-129], [38, H M Rakib Ullah Bashar], [empId-334, adid-21, "SHOAB MAHMOOD AL NAOSHAD"], [47, "MD. ARIFUR RAHMAN TALUKDER"], [450, "TANVIR AHMED"], [447, "MD SAKIBUR RAHMAN"],[222, "HASIM UDDIN"], [194, "NAWSHAR AHAMMED"], 
        DisplayTxt: 'Workshop Proposal Dashboard',
        MasterListInfo: { name: 'WorkshopProposalMaster', select: 'Status , EmployeeID , GUID , Modified , Created , PendingWith/ID , PendingWith/Title , Author/ID , Author/Title , ID , Title , Author/Office , Author/JobTitle , TotalEstimatedAmount', expand: 'Author , PendingWith', orderByPrm: 'Created', orderByVal: false, top: 100000, jsonStringField: '', parsedFldForDb: ''},
        RenderDetListInfo: [{ name: 'WorkshopProposalInfo', select: 'ExpectedDate, Author/ID, Author/Office, WorkshopLocation, ExpectedParticipant, Purpose, TotalAmount, Title, GLCode, CostCenter, IONumber, FoodCost, HallOrVenueRent, PromotionalItem, DecorationCost, OtherCost, BudgetedExpenditure, ActualLocation, ActualParticipant, ActualFoodCost, ActualDecorationCost, ActualHallOrVenueRent, ActualPromotionalItem, ActualExpenditure, ActualOtherCost', expand: 'Author', filterBy: 'Title', filterWith: 'Title', top: 100000, jsonStringField: '', parsedFldForDb: ''}],
        DetailsListInfo: [{ name: 'WorkshopProposalInfo', select: 'ExpectedDate, Author/ID, Author/Office, WorkshopLocation, ExpectedParticipant, Purpose, TotalAmount, Title, GLCode, CostCenter, IONumber, FoodCost, HallOrVenueRent, PromotionalItem, DecorationCost, OtherCost, BudgetedExpenditure, ActualLocation, ActualParticipant, ActualFoodCost, ActualDecorationCost, ActualHallOrVenueRent, ActualPromotionalItem, ActualExpenditure, ActualOtherCost', expand: 'Author', orderByPrm: 'Created', orderByVal: false, top: 100000, jsonStringField: '', parsedFldForDb: ''}],
        ServiceFunction: { masterList: 'fetchListItemWithExpStFilOrd', renderDetList: 'fetchListItemsWithFilterExpand', DetailList: 'fetchListItemsWithFilterExpand' },
        DbViewColDef: [
            { fldType: 'TextField', headerName: 'ClassCode', field: 'ClassCode', minWidth: 165, hide: true},
            { fldType: 'TextField', headerName: 'ClassDescription', field: 'ClassDescription', minWidth: 150},
            { fldType: 'TextField', headerName: 'BusinessArea', field: 'BusinessArea', minWidth: 150,},
            { fldType: 'TextField', headerName: 'AreaDescription', field: 'AreaDescription', minWidth: 165,},
            { fldType: 'TextField', headerName: 'CostCenter', field: 'CostCenter', minWidth: 165,},
            { fldType: 'TextField', headerName: 'CCDescription', field: 'CCDescription', viewLink: '', minWidth: 120},
            { fldType: 'TextField', headerName: 'Proposed Item Description', field: 'ProposedItemDescription', minWidth: 165},
            { fldType: 'TextField', headerName: 'Import or Local', field: 'ImportOrLocal', minWidth: 120, hide: true},
            { fldType: 'NumberField', headerName: 'Qty', field: 'Qty', minWidth: 165, hide: true},
            { fldType: 'TextField', headerName: 'UM', field: 'UM', minWidth: 150},
            { fldType: 'TextField', headerName: 'Unit Price (BDT)', field: 'UnitPrice', minWidth: 150,},
            { fldType: 'TextField', headerName: 'Total (BDT)', field: 'TotalBDT', minWidth: 165,},
            { fldType: 'TextField', headerName: 'Justfication for CAPEX Requirement', field: 'Justfication', minWidth: 165,},
            { fldType: 'TextField', headerName: 'UserName', field: 'UserName', viewLink: '', minWidth: 120},
            { fldType: 'TextField', headerName: 'UserEmpID', field: 'UserEmpID', minWidth: 165},
            { fldType: 'TextField', headerName: '5YearPlan', field: '5YearPlan', minWidth: 120, hide: true},
            { fldType: 'TextField', headerName: 'CurAvaCapacity', field: 'CurAvaCapacity', minWidth: 165, hide: true},
            { fldType: 'TextField', headerName: 'ReqProdCapacity', field: 'ReqProdCapacity', minWidth: 150},
            { fldType: 'TextField', headerName: 'SalesForecast', field: 'SalesForecast', minWidth: 150,},
            { fldType: 'TextField', headerName: 'ExpectedCapacity', field: 'ExpectedCapacity', minWidth: 165,},
            { fldType: 'TextField', headerName: 'ExpComMonth', field: 'ExpComMonth', minWidth: 165,},
            { fldType: 'TextField', headerName: 'NewOrReplace', field: 'NewOrReplace', viewLink: '', minWidth: 120},
            { fldType: 'TextField', headerName: 'ExistingAssetID', field: 'ExistingAssetID', minWidth: 150,},
            { fldType: 'TextField', headerName: 'CAPEXStrategy', field: 'CAPEXStrategy', minWidth: 165,},
            { fldType: 'TextField', headerName: 'Comments', field: 'Comments', minWidth: 165,}


        ],
        RenderViewColDef: [
            { fldType: 'DateField', headerName: 'Date', field: 'ExpectedDate', valueGetter: 'ExpectedDate', minWidth: 120},
            { fldType: 'TextField', headerName: 'Location', field: 'WorkshopLocation', minWidth: 220},
            { fldType: 'TextField', headerName: 'PromotionalItem', field: 'PromotionalItem', minWidth: 165},
            { fldType: 'NumberField', headerName: 'Ex.Participant', field: 'ExpectedParticipant', minWidth: 120, hide: true},
            { fldType: 'NumberField', headerName: 'Ac.Participant',field: 'ActualParticipant', minWidth: 165, hide: true},
            { fldType: 'TextField', headerName: 'Purpose', field: 'Purpose', minWidth: 150},
            { fldType: 'NumberField', headerName: 'TotalAmount', field: 'TotalAmount', minWidth: 150,},
            { fldType: 'NumberField', headerName: 'ActualExpenditure', field: 'ActualExpenditure', minWidth: 165,},
            

        ],
        GridColDef: [
          { headerName: "Sl", field: 'Sl', valueGetter: "node.rowIndex + 1", editable: false, minWidth: 60, colId: "Sl", menuTabs: [] },
          { headerName: 'ClassCode', field: 'ClassCode', minWidth: 100, editable: true, colId: "ClassCode", menuTabs: [], },
          { headerName: 'ClassDescription', field: 'ClassDescription', minWidth: 150, editable: true, colId: "ClasClassDescriptionsCode", menuTabs: [],},
          { headerName: 'BusinessArea', field: 'BusinessArea', minWidth: 120, editable: true, colId: "BusinessArea", menuTabs: [], },
          { headerName: 'AreaDescription', field: 'AreaDescription', minWidth: 165, editable: true, colId: "AreaDescription", menuTabs: [],},
          { headerName: 'CostCenter', field: 'CostCenter', minWidth: 120, editable: true, colId: "CostCenter", menuTabs: [],},
          { headerName: 'CCDescription', field: 'CCDescription', minWidth: 140, editable: true, colId: "CCDescription", menuTabs: [], },
          { headerName: 'Proposed Item Description', field: 'ProposedItemDescription', minWidth: 180, editable: true, colId: "ProposedItemDescription", menuTabs: [],},
          { headerName: 'Import or Local', field: 'ImportOrLocal', minWidth: 140, editable: true, colId: "ImportOrLocal", menuTabs: [],},
          { headerName: 'Qty', field: 'Qty', minWidth: 80, editable: true, colId: "Qty", menuTabs: [],},
          { headerName: 'UM', field: 'UM', minWidth: 80, editable: true, colId: "UM", menuTabs: [],},
          { headerName: 'Unit Price (BDT)', field: 'UnitPrice', minWidth: 140, editable: true, colId: "UnitPrice", menuTabs: [],},
          { headerName: 'Total (BDT)', field: 'TotalBDT', minWidth: 120, editable: true, colId: "TotalBDT", menuTabs: [],},
          { headerName: 'CAPEX Requirement Justfication', field: 'Justfication', minWidth: 250, editable: true, colId: "Justfication", menuTabs: [],},
          { headerName: 'UserName', field: 'UserName', minWidth: 130, editable: true, colId: "UserName", menuTabs: [],},
          { headerName: 'UserEmpID', field: 'UserEmpID', minWidth: 120, editable: true, colId: "UserEmpID", menuTabs: [],},
          { headerName: '5YearPlan', field: '5YearPlan', minWidth: 100, editable: true, colId: "5YearPlan", menuTabs: [],},
          { headerName: 'CurAvaCapacity', field: 'CurAvaCapacity', minWidth: 180, editable: true, colId: "CurAvaCapacity", menuTabs: [],},
          { headerName: 'ReqProdCapacity', field: 'ReqProdCapacity', minWidth: 150, editable: true, colId: "ReqProdCapacity", menuTabs: [],},
          { headerName: 'SalesForecast', field: 'SalesForecast', minWidth: 150, editable: true, colId: "SalesForecast", menuTabs: [],},
          { headerName: 'ExpectedCapacity', field: 'ExpectedCapacity', minWidth: 165, editable: true, colId: "ExpectedCapacity", menuTabs: [],},
          { headerName: 'ExpComMonth', field: 'ExpComMonth', minWidth: 150, editable: true, colId: "ExpComMonth", menuTabs: [],},
          { headerName: 'NewOrReplace', field: 'NewOrReplace', minWidth: 130, editable: true, colId: "NewOrReplace", menuTabs: [],},
          { headerName: 'ExistingAssetID', field: 'ExistingAssetID', minWidth: 150, editable: true, colId: "ExistingAssetID", menuTabs: [],},
          { headerName: 'CAPEXStrategy', field: 'CAPEXStrategy', minWidth: 200, editable: true, colId: "CAPEXStrategy", menuTabs: [],},
          { headerName: 'Comments', field: 'Comments', minWidth: 165, editable: true, colId: "Comments", menuTabs: [], }
        ],
        GridColVal: [
          { ClassCode: "", ClassDescription: '', BusinessArea: "", AreaDescription: '', CostCenter: '', CCDescription: "", ProposedItemDescription: '',
            ImportOrLocal: 'Import', Qty: 1, UM: 'NOS', UnitPrice: "", TotalBDT: '', Justfication: '',
            UserName: '', UserEmpID: '', '5YearPlan': '', CurAvaCapacity: '', ReqProdCapacity: "",
            SalesForecast: '', ExpectedCapacity: '', ExpComMonth: '', NewOrReplace: '', ExistingAssetID: "", CAPEXStrategy: '', Comments: ''},
        ]        
    }
];

//----------------------- data grid info ends ------------------

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

@Injectable()
export class Greeter {
  suffix = '!';
}

@Component({
  selector: 'app-capexbudgetparent',
  templateUrl: './capexbudgetparent.component.html',
  styleUrls: [
    './capexbudgetparent.component.scss',
    '../../../../../../assets/css/indigo-pink.css',
    '../../../../../../assets/css/ng-select.component.scss',
    '../../../../../../assets/css/material.theme.scss',
],

  //: ViewEncapsulation.None,
  encapsulation: ViewEncapsulation.Emulated
})
export class CapexbudgetparentComponent implements OnInit, AfterViewInit, AfterContentInit{


  _form: FormGroup;

  _data = {};

  public logedInUser = {
    aDId: "",
    name: "",
    email: "",
    empID: "",
    office: "",
    access: "",
    //GetRecordsApiUrl:"",
  };



  // requestorsInfo: any={
  //   EmployeeName: 'Eng Kamal',
  //   Company: 'BPBL',
  //   EmployeeId: '9999',
  //   OfficeLocation: 'Corporate',
  //   Designation: 'Software Engineer',
  //   Department: 'IT',
  //   Email: 'kamal@bergerbd.com',
  //   CostCenter: '9000756',
  //   Mobile: '01913066698',
  //   RequestDate: ''
  // };
  requestorsInfo: IWorkflowrequestor ={};

  data5 = [];

  data2 = {
    TestParameters: [
      {
        Samples: [
          { 
            SampleID: "SampleID",
            SampleDescription: "Sample Description",
            Appearance: "Appearance",
            ReferenceNo: "ReferenceNo",
            SampleType: "SampleType",
            MaterialConstruction: "Material Construction",
            SampleQuantity: "Sample Quantity",
            SpecificRequirement: "Specific Requirement"
          }
        ]
      }
    ]
  };

  @Output() outputToParent = new EventEmitter<any>();

  @Output() btnClickAction: EventEmitter<any> = new EventEmitter<any>();

  currentAbsoluteUrl = window.location.href;
  public Status = "";
  public uId = "";
  public reqRef = "CBR-";
  public readMode = "";
  logedUserAdId = null;
  _testParamNode = null;
  requestInfo: any = {};
  parsedTestParameters;
  testParameters = []; //should re cleared
  reportReleaseGrp = [];//should re cleared
  childBtnClickAction = "";
  createReqInfoFrmChild;
  approvalLink;
  reviewLink;
  pendingApprovalListInfo;
  updatedMstrLstInfo;
  labResponsibles = [];
  labResponsiblesOpms = [];
  emitedDataFrmChild;
  auditLogComments = "";

  public listInfo = {
    name: "",
    select: "",
    expand: "",
    filterBy: "",
    filterWith: "",
    top: null
  };

  parsedRequestInfo = { 
    uId: null,
    readMode: null,
    ID: null,
    Title: null,
    Status: null,
    PendingWith: null,
    RequestorAdId: null,
    CapexBudgetProposal: null
  };
  
  //webAbsoluteUrl = window.location.origin + "/leaveauto";
  webAbsoluteUrl = "https://portal.bergerbd.com/leaveauto";

  //==for alert==
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  //=========for customer feedback ===========
  rating:number = 3;
  starCount:number = 5;
  starColor = 'accent';

  loadDataGridComponent = false;

  gridControlName = "Datagridcruditems";
  datagridcrudhomeName = "Datagridcrudhomeitems";
  datagridngrxName = "Datagridngrxitems";
  attachmentControlName = "Attachments";

  allApprovers: any = {};

  PendingWith = "Mostafa Kamal";

  approvalHistory: any = [];

  exceluploadControlName = "Excelupload";

  dataFrmExcelUpload: any = [];
  budgetItemsIT: any = [];
  budgetItemsNonIT: any = [];

  @ViewChild('datagridcrudDiv', {read: ViewContainerRef}) datagridcrudDiv;
  @ViewChild('placeholder', { read: ViewContainerRef, static: true })
  public placeholder!: ViewContainerRef;
  public DynamicComponent: any;
  public ApprovalLogComponent: any;
  public RejectedItemsComponent: any;  
  //public DynamicComponent = DisplayanyinfohomeComponent; 
  public customInjector!: Injector; 
  public contentList: any[][] = [];
  myModule: NgModuleFactory<any>;

  public EmpInfoComponent: any;

  private requestInfoOnUid = { 
    uId: this.uId ,
    readMode: this.readMode,
    ID: null,
    Title: "",
    Status: "",
    PendingWith: null,
    logedUserAdId: this.logedUserAdId,
    BudgetItemsIT: null,
    BudgetItemsNonIT: null,
    CapexBudgetProposal: null,
    ApplicantAdId: 0,
    Comments: "",
    Attachments: null 
  };

  private budgetItemsincludesIT = false;

  private grdInfo = [];

  deletedRowItems = [];

  deletedGridItems = { 
    uId: this.uId ,
    readMode: this.readMode,
    ID: null,
    Title: "",
    Status: "",
    PendingWith: null,
    logedUserAdId: this.logedUserAdId,
    GridColDef: null,
    GridColVal: null        
  }

  public myInjector!: Injector;
  public approvalLogInjector!: Injector;
  public rejectedItmInjector!: Injector;
  public empInfoInjector!: Injector;
  public displayAttachments = false;
  public displayRejectedItems = false;
  public displayEmpInfo = false;

  constructor(private fb: FormBuilder, 
    public sharepointworkflowService: SharepointworkflowService, 
    private resolver: ComponentFactoryResolver,
    private compiler: Compiler,
    private injector: Injector
    ) {
    if (this.currentAbsoluteUrl.indexOf('=') > -1) {
      let varCurrentUrlSplitArray = this.currentAbsoluteUrl.split('?');
      if (varCurrentUrlSplitArray.length >= 2) {
        let queryString = varCurrentUrlSplitArray[1];
        let parameters = queryString.split('&');
        for (let i = 0; i < parameters.length; i++) {
          let param = parameters[i];
          if (param.toLowerCase().indexOf('uniqueid=') > -1)
            this.uId = param.split('=')[1];
          else if (param.toLowerCase().indexOf('mode=') > -1)
            this.readMode = param.split('=')[1];
        }
      }
    };
    
    // this.myInjector = Injector.create({
    //   providers: [
    //     {
    //       provide: ComponentdatabindingService,
    //       deps: []
    //     }
    //   ],
    //   parent: this.injector
    // });

    // this.myInjector2 = Injector.create({
    //   providers: [
    //     {
    //       provide: ComponentdatabindingService,
    //       deps: []
    //     }
    //   ],
    //   parent: this.injector
    // })
  }


  ngOnInit(){
    if (this.uId != "") {
      this.executeOnInitProcessesOnUid();
    } 
    else {
      this.executeOnInitProcesses();
      //this.placeholder.clear();
      //const componentFactory = this.resolver.resolveComponentFactory(DynamicComponent);
      // console.log(componentFactory);
      // const component = this.placeholder.createComponent(componentFactory);
      
      //this.myModule = this.compiler.compileModuleSync(DisplayanyinfoModule);
      //this.componentdatabindingService.description = 'dynamic component';
      //this.componentdatabindingService.text = 'dynamic component text from parent Component';
      // this.componentdatabindingService.clicked.subscribe(()=>{
      //   alert('clicked');
      // })
    }



    // let componentdatabindingService2 = this.myInjector2.get(ComponentdatabindingService); 
    // componentdatabindingService2.description = 'dynamic component';
    // componentdatabindingService2.text = 'dynamic component text for component 2';
  }

  async executeAfterViewInit(){
    this.allApprovers = 
      {
        headITInfraName: "Shoab Mahmood Al Naoshad",
        headITInfraEmail: "shoaib@bergerbd.com",
        headITInfraAdId: 21,
        headITInfraEmpId: "",
        headIAssetName: "Mahbubur Rahman",
        headAssetEmail: "mrahman@bergerbd.com",
        headAssetAdId: 129,
        headAssetEmpId: ""


        // headITInfraName: "Mostafa Kamal",
        // headITInfraEmail: "kamal@bergerbd.com",
        // headITInfraAdId: 1026,
        // headITInfraEmpId: "",
        // headIAssetName: "Mostafa Kamal",
        // headAssetEmail: "kamal@bergerbd.com",
        // headAssetAdId: 1026,
        // headAssetEmpId: ""
    }

    //### === get last approver info === ###    
    this.logedUserAdId = await this.getEmpAdId();
    let applicantInfo = await this.getEmpInfo(this.logedUserAdId);     
    this.logedInUser.aDId = this.logedUserAdId;
    this.logedInUser.name = applicantInfo['EmployeeName'];
    this.logedInUser.email = applicantInfo['Email'];
    this.logedInUser.empID = applicantInfo['EmployeeId'];
    this.logedInUser.office = applicantInfo['OfficeLocation'];


  }

  ngAfterViewInit(){
    this.executeAfterViewInit();
  }

  ngAfterContentInit(){
    // if (this.uId != "") {
    //   this.executeOnInitProcessesOnUid();     
    // } 
    // else {
    //   this.executeOnInitProcesses();
    // }

    //const datagridFactory = this.resolver.resolveComponentFactory(DatagridcrudhomeComponent);
    //this.datagridcrudDiv.createComponent(datagridFactory);
    //const datagridRef = this.datagridcrudDiv.createComponent(datagridFactory);
    //datagridRef.instance.ControlName = "";
  }

  _buildFormFromData() {
    if (this.data2.TestParameters.length) {
      this._addGroup();
    }

    setTimeout(() => {
      this._form.patchValue(this.data2);
    }, 50);     
    
  }

  _addGroup() {
    this._groupsFormArray.push(
      this.fb.control({
        ApplicationData: [],
        TestParameters: []
      })
    );
  }

  _delete(index: number) {
    this._groupsFormArray.removeAt(index);
  }

  get _groupsFormArray(): FormArray {
    return this._form.get("TestParameters") as FormArray;
  }

  private _createForm() {
    this._form = this.fb.group({
      Datagridcrudhomeitems: this.fb.array([]),
      ApprovalHistory: this.fb.array([]),
      Attachments: this.fb.array([]),
      //Attachments: this.fb.group({}),
      
      Comments: CommentfieldhomeComponent.addUserContactItem(),
      //Comments2: CommentfieldhomeComponent.addUserContactItem()            
      // Comments: this.fb.group({
      //   Comment: CommentfieldhomeComponent.addUserContactItem(),
      // }),
    });
  }

  private _hideActionButtons(){
    (document.getElementById('btnApprove') as HTMLInputElement).disabled = true;
    setTimeout(function () {
      document.getElementById('btnApprove').style.display = 'none';
    }, 1000);

    (document.getElementById('btnChange') as HTMLInputElement).disabled = true;
    setTimeout(function () {
      document.getElementById('btnChange').style.display = 'none';
    }, 1000);

    (document.getElementById('btnReject') as HTMLInputElement).disabled = true;
    setTimeout(function () {
      document.getElementById('btnReject').style.display = 'none';
    }, 1000);
  }

  approverAction(action){
    if(action == "Change" && this._form.value.Comments.Comment == ""){
      alert("Please provide required changes in the Comments field.")
      return false;
    }

    let _status = '';
    let _pendingWith = [];
    let _updatedMstrListData;
    let _itemData;
    let updatedProposal = this.parsedRequestInfo.CapexBudgetProposal;

    

    if(action == "Approved" && (this.parsedRequestInfo.Status == "SubmittedToITInfra" || this.parsedRequestInfo.Status == "UserToITInfra")){
      this._hideActionButtons();

      _pendingWith.push({
        Name: "Mahbubur Rahman",
        Email: "mrahman@bergerbd.com",
        AdId: 129,
        EmpId: ""
      });

      _status = 'SubmittedToCCAI';

      let iTItems = this._form.value.Datagridcrudhomeitems;
      let nonItItems = this.budgetItemsNonIT;

      //if(this.budgetItemsincludesIT){}
      let allUpdatedItems = iTItems.concat(nonItItems);
      
      updatedProposal.Datagridcrudhomeitems = allUpdatedItems;
      updatedProposal.deletedRowItems = this.deletedRowItems;
      updatedProposal.PendingWith = _pendingWith;
      
      //====get approval history===
      let actionComments = this._form.value.Comments.Comment;
      let actionlog = {
        Date: new Date(),
        ActionBy: this.logedInUser.name,
        Status: _status,
        //ActionById: this.logedUserAdId,
        Comments: actionComments
      }
      updatedProposal.ApprovalHistory.push(actionlog);
      //-------------------

      this.requestInfoOnUid = { 
        uId: this.uId,
        readMode: this.readMode,
        ID: this.parsedRequestInfo.ID,
        Title: this.parsedRequestInfo.Title,
        Status: _status,
        PendingWith: [ this.allApprovers.headAssetAdId ],
        logedUserAdId: this.logedUserAdId,
        BudgetItemsIT: this.budgetItemsIT ,
        BudgetItemsNonIT: this.budgetItemsNonIT,
        CapexBudgetProposal: updatedProposal,
        ApplicantAdId: this.parsedRequestInfo.RequestorAdId,
        Comments: this._form.value.Comments,
        Attachments: this._form.value.Attachments 
      };

      this.outputToParent.emit(this.requestInfoOnUid);
      this.btnClickAction.emit(action); 
    }
    else if(action == "Approved" && (this.parsedRequestInfo.Status == "SubmittedToCCAI" || this.parsedRequestInfo.Status == "UserToCCAI") ){
      this._hideActionButtons();

      _status = 'Completed';

      
      updatedProposal.Datagridcrudhomeitems = this._form.value.Datagridcrudhomeitems;

      _pendingWith.push({
        Name: "",
        Email: "",
        AdId: 0,
        EmpId: ""
      });

      updatedProposal.PendingWith = _pendingWith;
      updatedProposal.Status = _status;

      //====get approval history===
      let actionComments = this._form.value.Comments.Comment;
      let actionlog = {
        Date: new Date(),
        ActionBy: this.logedInUser.name,
        Status: _status,
        //ActionById: this.logedUserAdId,
        Comments: actionComments
      }
      updatedProposal.ApprovalHistory.push(actionlog);
      //-------------------

      if(this.deletedRowItems && this.deletedRowItems.length >0){
        this.deletedRowItems.forEach(i=>{
          updatedProposal.deletedRowItems.push(i);
        })        
      }

      this.requestInfoOnUid = { 
        uId: this.uId,
        readMode: this.readMode,
        ID: this.parsedRequestInfo.ID,
        Title: this.parsedRequestInfo.Title,
        Status: _status,
        PendingWith: [ 0 ],
        logedUserAdId: this.logedUserAdId,
        BudgetItemsIT: this.budgetItemsIT ,
        BudgetItemsNonIT: this.budgetItemsNonIT,
        CapexBudgetProposal: updatedProposal,
        ApplicantAdId: this.parsedRequestInfo.RequestorAdId,
        Comments: this._form.value.Comments,
        Attachments: this._form.value.Attachments 
      };

      this.outputToParent.emit(this.requestInfoOnUid);
      this.btnClickAction.emit(action); 
    }
    else if(action == "Change" && (this.parsedRequestInfo.Status == "SubmittedToITInfra" || this.parsedRequestInfo.Status == "UserToITInfra") ){
      this._hideActionButtons();

      _status = 'CRITInfraToUser';

      let iTItems = this._form.value.Datagridcrudhomeitems;
      let nonItItems = this.budgetItemsNonIT;
      
      let allUpdatedItems = iTItems.concat(nonItItems);      
      updatedProposal.Datagridcrudhomeitems = allUpdatedItems;
      updatedProposal.deletedRowItems = this.deletedRowItems;
      
      _pendingWith.push({
        Name: "",
        Email: "",
        AdId: this.logedUserAdId,
        EmpId: ""
      })
      updatedProposal.PendingWith = _pendingWith;

      //====get approval history===
      let actionComments = this._form.value.Comments.Comment;
      let actionlog = {
        Date: new Date(),
        ActionBy: this.logedInUser.name,
        Status: _status,
        //ActionById: this.logedUserAdId,
        Comments: actionComments
      }
      updatedProposal.ApprovalHistory.push(actionlog);
      //-------------------

      this.requestInfoOnUid = { 
        uId: this.uId,
        readMode: this.readMode,
        ID: this.parsedRequestInfo.ID,
        Title: this.parsedRequestInfo.Title,
        Status: _status,
        PendingWith: [ this.parsedRequestInfo.RequestorAdId ],
        logedUserAdId: this.logedUserAdId,
        BudgetItemsIT: this.budgetItemsIT ,
        BudgetItemsNonIT: this.budgetItemsNonIT,
        CapexBudgetProposal: updatedProposal,
        ApplicantAdId: this.parsedRequestInfo.RequestorAdId,
        Comments: this._form.value.Comments,
        Attachments: this._form.value.Attachments
      };

      this.outputToParent.emit(this.requestInfoOnUid);
      this.btnClickAction.emit(action); 
    }
    else if(action == "Change" && (this.parsedRequestInfo.Status == "SubmittedToCCAI" || this.parsedRequestInfo.Status == "UserToCCAI")){
      this._hideActionButtons();

      _status = 'CRCCAIToUser';

      //let updatedProposal = this.parsedRequestInfo.CapexBudgetProposal;
      updatedProposal.Datagridcrudhomeitems = this._form.value.Datagridcrudhomeitems;
      _pendingWith.push({
        Name: "",
        Email: "",
        AdId: this.logedUserAdId,
        EmpId: ""
      })
      updatedProposal.PendingWith = _pendingWith;

      //====get approval history===
      let actionComments = this._form.value.Comments.Comment;
      let actionlog = {
        Date: new Date(),
        ActionBy: this.logedInUser.name,
        Status: _status,
        //ActionById: this.logedUserAdId,
        Comments: actionComments
      }
      updatedProposal.ApprovalHistory.push(actionlog);
      //-------------------

      this.requestInfoOnUid = { 
        uId: this.uId,
        readMode: this.readMode,
        ID: this.parsedRequestInfo.ID,
        Title: this.parsedRequestInfo.Title,
        Status: _status,
        PendingWith: [ this.parsedRequestInfo.RequestorAdId ],
        logedUserAdId: this.logedUserAdId,
        BudgetItemsIT: this.budgetItemsIT ,
        BudgetItemsNonIT: this.budgetItemsNonIT,
        CapexBudgetProposal: updatedProposal,
        ApplicantAdId: this.parsedRequestInfo.RequestorAdId,
        Comments: this._form.value.Comments,
        Attachments: this._form.value.Attachments 
      };

      this.outputToParent.emit(this.requestInfoOnUid);
      this.btnClickAction.emit(action); 
    }
    else if(action == "Reject"){
      if(this._form.value.Comments.Comment == ""){
        alert("Please provide a valid reason for rejecting the application in the Comments field.")
        return false;
      }else{
        this._hideActionButtons();

        _status = 'Rejected';

        //let updatedProposal = this.parsedRequestInfo.CapexBudgetProposal;
        updatedProposal.Datagridcrudhomeitems = this._form.value.Datagridcrudhomeitems;
        _pendingWith.push({
          Name: "",
          Email: "",
          AdId: this.logedUserAdId,
          EmpId: ""
        })
        updatedProposal.PendingWith = _pendingWith;

        //====get approval history===
        let actionComments = this._form.value.Comments.Comment;
        let actionlog = {
          Date: new Date(),
          ActionBy: this.logedInUser.name,
          Status: _status,
          //ActionById: this.logedUserAdId,
          Comments: actionComments
        }
        updatedProposal.ApprovalHistory.push(actionlog);
        //-------------------

        this.requestInfoOnUid = { 
          uId: this.uId,
          readMode: this.readMode,
          ID: this.parsedRequestInfo.ID,
          Title: this.parsedRequestInfo.Title,
          Status: _status,
          PendingWith: [],
          logedUserAdId: this.logedUserAdId,
          BudgetItemsIT: this.budgetItemsIT ,
          BudgetItemsNonIT: this.budgetItemsNonIT,
          CapexBudgetProposal: updatedProposal,
          ApplicantAdId: this.parsedRequestInfo.RequestorAdId,
          Comments: this._form.value.Comments,
          Attachments: this._form.value.Attachments 
        };

        this.outputToParent.emit(this.requestInfoOnUid);
        this.btnClickAction.emit(action);
      }
       
    }
    else{
        //if(action == "Submitted"){this._form.value.Datagridcrudhomeitems = this.createReqInfoFrmChild}
        
        //this._form.value.Datagridcrudhomeitems = this.dataFrmExcelUpload.slice();

        this._form.value.Datagridcrudhomeitems = this.dataFrmExcelUpload.slice();

        
        this._form.value.deletedRowItems = [];
        this._form.value.updatedRowItems = [];
        this._form.value.addedRowItems = [];
        //this._form.value.BudgetItemsNonIT = this.budgetItemsNonIT;
        this.outputToParent.emit(this._form.value);
        this.btnClickAction.emit(action); 
        //this.BudgetItemsNonIT.emit(action); 
    }
  
  }

  clickSaveOrSubmit(action){

    let _status = '';
    let _pendingWith = [];
    let updatedProposal = this.parsedRequestInfo.CapexBudgetProposal;

    (document.getElementById('btnReSubmit') as HTMLInputElement).disabled = true;
    setTimeout(function () {
      document.getElementById('btnReSubmit').style.display = 'none';
    }, 1000);

    if(action == "ReSubmit" && this.parsedRequestInfo.Status == "CRITInfraToUser"){      

      _pendingWith.push({
        headITInfraName: "Shoab Mahmood Al Naoshad",
        headITInfraEmail: "shoaib@bergerbd.com",
        headITInfraAdId: 21,
        headITInfraEmpId: ""
      });

      _status = 'UserToITInfra';

      let iTItems = this._form.value.Datagridcrudhomeitems;
      let nonItItems = this.budgetItemsNonIT;

      //if(this.budgetItemsincludesIT){}
      let allUpdatedItems = iTItems.concat(nonItItems);
      
      updatedProposal.Datagridcrudhomeitems = allUpdatedItems;
      updatedProposal.deletedRowItems = this.deletedRowItems;
      updatedProposal.PendingWith = _pendingWith;
      
      //====get approval history===
      let actionComments = this._form.value.Comments.Comment;
      let actionlog = {
        Date: new Date(),
        ActionBy: this.logedInUser.name,
        Status: _status,
        //ActionById: this.logedUserAdId,
        Comments: actionComments
      }
      updatedProposal.ApprovalHistory.push(actionlog);
      //-------------------

      this.requestInfoOnUid = { 
        uId: this.uId,
        readMode: this.readMode,
        ID: this.parsedRequestInfo.ID,
        Title: this.parsedRequestInfo.Title,
        Status: _status,
        PendingWith: [ this.allApprovers.headAssetAdId ],
        logedUserAdId: this.logedUserAdId,
        BudgetItemsIT: this.budgetItemsIT ,
        BudgetItemsNonIT: this.budgetItemsNonIT,
        CapexBudgetProposal: updatedProposal,
        ApplicantAdId: this.parsedRequestInfo.RequestorAdId,
        Comments: this._form.value.Comments,
        Attachments: this._form.value.Attachments 
      };

      this.outputToParent.emit(this.requestInfoOnUid);
      this.btnClickAction.emit(action); 
    }
    else if(action == "ReSubmit" && this.parsedRequestInfo.Status == "CRCCAIToUser"){
      
      _pendingWith.push({
        headIAssetName: "Mahbubur Rahman",
        headAssetEmail: "mrahman@bergerbd.com",
        headAssetAdId: 129,
        headAssetEmpId: ""
      });

      _status = 'UserToCCAI';

      let iTItems = this._form.value.Datagridcrudhomeitems;
      let nonItItems = this.budgetItemsNonIT;      
      let allUpdatedItems = iTItems.concat(nonItItems);      
      updatedProposal.Datagridcrudhomeitems = allUpdatedItems;
      updatedProposal.deletedRowItems = this.deletedRowItems;
      updatedProposal.PendingWith = _pendingWith;
      
      //====get approval history===
      let actionComments = this._form.value.Comments.Comment;
      let actionlog = {
        Date: new Date(),
        ActionBy: this.logedInUser.name,
        Status: _status,
        //ActionById: this.logedUserAdId,
        Comments: actionComments
      }
      updatedProposal.ApprovalHistory.push(actionlog);
      //-------------------

      this.requestInfoOnUid = { 
        uId: this.uId,
        readMode: this.readMode,
        ID: this.parsedRequestInfo.ID,
        Title: this.parsedRequestInfo.Title,
        Status: _status,
        PendingWith: [ this.allApprovers.headAssetAdId ],
        logedUserAdId: this.logedUserAdId,
        BudgetItemsIT: this.budgetItemsIT ,
        BudgetItemsNonIT: this.budgetItemsNonIT,
        CapexBudgetProposal: updatedProposal,
        ApplicantAdId: this.parsedRequestInfo.RequestorAdId,
        Comments: this._form.value.Comments,
        Attachments: this._form.value.Attachments 
      };

      this.outputToParent.emit(this.requestInfoOnUid);
      this.btnClickAction.emit(action); 
    }
    else{ 
        this._form.value.Datagridcrudhomeitems = this.dataFrmExcelUpload.slice();        
        this._form.value.deletedRowItems = [];
        this._form.value.updatedRowItems = [];
        this._form.value.addedRowItems = [];
        //this._form.value.BudgetItemsNonIT = this.budgetItemsNonIT;
        this.outputToParent.emit(this._form.value);
        this.btnClickAction.emit(action); 
        //this.BudgetItemsNonIT.emit(action); 
    }
  
  }

  onSubmitBtn(){
    (document.getElementById('btnSubmitNewReq') as HTMLInputElement).disabled = true;
    (document.getElementById('btnApprove') as HTMLInputElement).disabled = true;
    setTimeout(function () {
      document.getElementById('btnSubmitNewReq').style.display = 'none';
      document.getElementById('btnApprove').style.display = 'none';
    }, 1000);

    // if(this.btnClickAction == "Approved"){      
    //   (document.getElementById('btnApprove') as HTMLInputElement).disabled = true;
    //   setTimeout(function () {
    //     document.getElementById('btnApprove').style.display = 'none';
    //   }, 1000);
    // }



    // let approvalLink = "";

    // let approvers=[];

    // let allItems = this._form.value.Datagridcrudhomeitems;

    // for(let i = 0; i< allItems.length; i++){
    //   if(this._form.value.Datagridcrudhomeitems[i]['ClassCode'] == "3200" || this._form.value.Datagridcrudhomeitems[i]['ClassCode'] == 3200){
    //     approvers.push(this.allApprovers.headITInfraAdId);
    //     allItems.length = this._form.value.Datagridcrudhomeitems.length;
    //   }
    // }

    // if(approvers.length == 0){
    //   approvers.push(this.allApprovers.headAssetAdId)
    // }  
    
    // //====get approval history===
    // let actionComments = "";
    // let actionlog = {
    //   Data: new Date(),
    //   ActionBy: this._form.value.Requestor.Name,
    //   Comments: actionComments
    // }
    // this._form.value.ApprovalHistory.push(actionlog);
    // //-------------------

    // let itemData = {
    //   Status: "Submitted",
    //   CapexBudgetProposal: JSON.stringify(this._form.value),
    //   PendingWithId: {
    //     'results': approvers
    //   },
    // }
    // let listInfo ={
    //   name: "CapexBudgetMaster",
    //   item: itemData
    // }
    
    // this.sharepointworkflowService.saveListItem(listInfo)
    //   .then(
    //     (res) =>{
    //       approvalLink = 'https://portaldv.bergerbd.com/leaveauto/SitePages/CapexBudget.aspx?UniqueId=' + res.GUID ;
    //       let itemData = {
    //         Title: "CBR-" + res.ID,
    //        // CapexBudgetProposal: JSON.stringify(this._form.value),
    //         // PendingWithId: {
    //         //   'results': approvers
    //         // },
    //         ApprovalLink: approvalLink 
    //       }

    //       let listInfo ={
    //         name: "CapexBudgetMaster",
    //         rId: res.ID,
    //         item: itemData
    //       }

    //       this.sharepointworkflowService.updateListItem(listInfo);

    //       let pendingApprovalItemData = {
    //         Title: "CBR-" + res.ID,
    //         ProcessName: "CapexBudget",
    //         RequestedByName: this._form.value.Requestor.EmployeeName,
    //         Status: "Submitted",
    //         EmployeeID: this._form.value.Requestor.EmployeeId,
    //         RequestedByEmail: this._form.value.Requestor.Email,
    //         PendingWithId: {
    //           'results': approvers
    //         },
    //         RequestLink: approvalLink
    //       };

    //       let pendingApprovalListInfo ={
    //         name: "PendingApproval",
    //         item: pendingApprovalItemData
    //       };
          
    //       this.sharepointworkflowService.saveListItem(pendingApprovalListInfo)
    //       .then(
    //         (res) =>{
    //         })

         
    //     }
    //   );
    

    

    // setTimeout(function() {      
    //   window.location.href= 'https://portaldv.bergerbd.com/leaveauto/SitePages/MyWFRequest.aspx';
    // }, 4000);
  }

  getAllAttachments(id){
    this.listInfo.name = "CapexBudgetAttachment";
    this.listInfo.select = 'Title' + "," + 'ActionBy/ID' + "," + 'ActionBy/Title' + "," + 'ActionDate' + "," + 'AttachmentFiles' + "," + 'Modified' + "," + 'Created' + "," + 'ID';
    this.listInfo.expand = 'AttachmentFiles' + "," + 'ActionBy';
    this.listInfo.filterBy = 'Title';
    this.listInfo.filterWith = id;
    this.listInfo.top = '100000';    

    
      try{
        from(
          this.sharepointworkflowService.getItemWithAnyFilterExpand(this.listInfo)
            ).subscribe(
              (res) =>{ 
                //let attachments = res; 
                this.requestInfo.Attachments = res;
                return res;                
              },    
              (err) => {
                  console.log(err)
              },
            ); 
      } 
      catch(err){
        console.log("Error: " + err);
      }

    return new Promise((resolve, reject)=>{
      try{
        from(
          this.sharepointworkflowService.getItemWithAnyFilterExpand(this.listInfo)
            ).subscribe(
              (res) =>{ 
                //let attachments = res; 
                resolve(res);
                return res;                
              },    
              (err) => {
                  resolve("Attachment retrieve failed !");
                  //reject('Retrieve data failed !');
                  console.log(err)
              },
            ); 
      } 
      catch(err){
        reject('Retrieve data failed !');
        console.log("Error: " + err);
      }
    })
  }

  getMasterListInfo(empADId){
    this.listInfo.name = "CapexBudgetMaster";
    this.listInfo.select = 'Status' + "," + 'RequestorEmpId' + "," + 'CapexBudgetProposal' + "," + 'GUID' + "," + 'Modified' + "," + 'Created' + "," + 'PendingWith/ID' + "," + 'PendingWith/Title' + "," + 'Author/ID' + "," + 'Author/Title' + "," + 'ID' + "," + 'Title';
    this.listInfo.expand = 'Author' + "," + 'PendingWith';
    this.listInfo.filterBy = 'GUID';
    this.listInfo.filterWith = this.uId;
    this.listInfo.top = '100000';    

    return new Promise((resolve, reject)=>{
      try{
        from(
          this.sharepointworkflowService.getItemWithAnyFilterExpand(this.listInfo, empADId)
            ).subscribe(
              (res) =>{                     
                this.parsedRequestInfo = { 
                  uId: this.uId,
                  readMode: this.readMode,
                  ID: res[0].ID,
                  Title: res[0].Title,
                  Status: res[0].Status,
                  PendingWith: res[0].PendingWith,
                  RequestorAdId: res[0].Author.ID,
                  CapexBudgetProposal: JSON.parse(res[0].CapexBudgetProposal), 
                }
                resolve(this.parsedRequestInfo);
                return this.parsedRequestInfo;                
              },    
              (err) => {
                  reject('Retrieve data failed !');
                  console.log(err)
              },
            ); 
      } 
      catch(err){
        reject('Retrieve data failed !');
        console.log("Error: " + err);
      }
    })
  }

  //======implementing async - await =====
  async executeOnInitProcesses(){    
    try{
      await this._createForm();
      
      // setTimeout(() => {
      //   this._addGroup();
      // }, 100);    

      const empAdId = await this.getEmpAdId();
      this.logedUserAdId = empAdId;
      let applicantInfo = await this.getEmpInfo(empAdId);
      this.requestorsInfo = applicantInfo;      
      //this._form.get('Requestor').patchValue(applicantInfo);

      //========= initialization of requestor info display component start =====
      setTimeout(() => {        
        if(applicantInfo){
          this.empInfoInjector = Injector.create({
            providers: [
              {
                provide: EmpInfoBindingService,
                deps: []
              }
            ],
            parent: this.injector
          });
    
          const empInfoBindingService = this.empInfoInjector.get(EmpInfoBindingService); 
          empInfoBindingService.requestorsInfo = this.requestorsInfo;
          empInfoBindingService._form = this._form;
          this.EmpInfoComponent = RequestoronbehalfofhomeComponent; 
          this.displayEmpInfo = true;
        }
      }, 100);      
      //-----------------  ends -----

      this.loadDataGridComponent = false;
      
    } 
    catch(err){
      console.log("Error: " + err)
    }
  }

  async executeOnInitProcessesOnUid(){    
    try{       
      
      await this._createForm();      

      const empAdId = await this.getEmpAdId();
      this.logedUserAdId = empAdId;
      let masterListInfo = await this.getMasterListInfo(empAdId);
      this.requestorsInfo = await masterListInfo['CapexBudgetProposal'].Requestor;      
      //this._form.get('Requestor').patchValue(this.requestorsInfo); 

      //========= initialization of requestor info display component start =====
      setTimeout(() => {        
        if(this.requestorsInfo){
          this.empInfoInjector = Injector.create({
            providers: [
              {
                provide: EmpInfoBindingService,
                deps: []
              }
            ],
            parent: this.injector
          });
    
          const empInfoBindingService = this.empInfoInjector.get(EmpInfoBindingService); 
          empInfoBindingService.requestorsInfo = this.requestorsInfo;
          empInfoBindingService._form = this._form;
          this.EmpInfoComponent = RequestoronbehalfofhomeComponent; 
          this.displayEmpInfo = true;
        }
      }, 100);      
      //-----------------  ends -----

      this.parsedRequestInfo.ID = masterListInfo['ID'];
      this.parsedRequestInfo.Title = masterListInfo['Title'];
      this.reqRef = masterListInfo['Title'];
      this.parsedRequestInfo.Status = masterListInfo['Status'];
      this.Status = masterListInfo['Status'];
      this.parsedRequestInfo.CapexBudgetProposal = masterListInfo['CapexBudgetProposal'];
      //if((masterListInfo['PendingWith'].hasOwnProperty('results'))){ }
      this.parsedRequestInfo.PendingWith = masterListInfo['PendingWith'];
      this.parsedRequestInfo.RequestorAdId = masterListInfo['RequestorAdId'];
      

      // /* creating grid coltrols array start */
      //let items = Object.assign({}, masterListInfo['CapexBudgetProposal'].Datagridcrudhomeitems);
      let items = masterListInfo['CapexBudgetProposal'].Datagridcrudhomeitems;
      this.budgetItemsincludesIT = false;
      let groupLoopingCount = 0;

      if(this.parsedRequestInfo.Status == "SubmittedToITInfra"){
        for(let i = 0; i< items.length; i++){
          if(items[i].ClassCode == 3200 || items[i].ClassCode == 6300){
            this.budgetItemsIT.push(items[i]);
            this.budgetItemsincludesIT = true;          
          }else{
            this.budgetItemsNonIT.push(items[i]);          
          }
          groupLoopingCount ++; //to track all items is being checked        
        }


        if(this.budgetItemsincludesIT = true){
          this.grdInfo = [
            {
              GridColDef: dashboardsListsInfo[0].GridColDef,
              GridColVal: this.budgetItemsIT,
              GridColValOnAdd: dashboardsListsInfo[0].GridColVal
            }
          ];
         }else{
          this.grdInfo = [
            {
              GridColDef: dashboardsListsInfo[0].GridColDef,
              GridColVal: this.budgetItemsNonIT,
              GridColValOnAdd: dashboardsListsInfo[0].GridColVal
            }
          ];
         }

        if(this.budgetItemsincludesIT && groupLoopingCount == items.length){
          this.populateGridControls(this.budgetItemsIT);
        }else if(groupLoopingCount == items.length){
          this.populateGridControls(this.budgetItemsNonIT);        
        } 

      }else{
        this.grdInfo = [
          {
            GridColDef: dashboardsListsInfo[0].GridColDef,
            GridColVal: items,
            GridColValOnAdd: dashboardsListsInfo[0].GridColVal
          }
        ];

        this.populateGridControls(items);
      }
     

      // this.loadDataGridComponent = true;

      if(masterListInfo['PendingWith'].hasOwnProperty('results')){
        if(masterListInfo['PendingWith'].results[0].hasOwnProperty('Title')){
          this.PendingWith = masterListInfo['PendingWith'].results[0].Title;
        }else{
          this.PendingWith = "";
        }
      }else{
        this.PendingWith = "";
      }

      

      this.approvalHistory = masterListInfo['CapexBudgetProposal'].ApprovalHistory;

      //### === initializing Approval History Component start ===###
      if(this.approvalHistory.length > 0){
          let approvalGridFlds = [
            { headerName: "Sl", valueGetter: "node.rowIndex + 1", editable: false, menuTabs: [], minWidth: 50,  maxWidth: 80 },
            {
              headerName:"Date",                
              field: "Date",
                valueFormatter: function(params) {
                    return moment(params.value).format('DD MMM, YYYY');
                },
                editable:false,
                minWidth: 200,
                menuTabs: [],
            },
            { headerName: 'Status', field: 'Status', editable:false, menuTabs: [], minWidth: 200 },
            { headerName: 'Action By', field: 'ActionBy', editable:false, menuTabs: [], minWidth: 200 },
            { headerName: 'Comments', field: 'Comments', editable:false, menuTabs: [], minWidth: 200 }
          ];

          let approvalInfo = { 
            GridColDef: approvalGridFlds,
            GridColVal: this.approvalHistory
          }

          this.approvalLogInjector = Injector.create({
            providers: [
              {
                provide: ComponentdatabindingService,
                deps: []
              }
            ],
            parent: this.injector
          });

          let componentdatabindingService = this.approvalLogInjector.get(ComponentdatabindingService); 
          componentdatabindingService.gridInfo = approvalInfo;

          this.ApprovalLogComponent = DisplayanyinfohomeComponent;        
      }

      this.requestInfoOnUid = { 
        uId: this.uId ,
        readMode: this.readMode,
        ID: this.parsedRequestInfo.ID,
        Title: this.parsedRequestInfo.Title,
        Status: this.parsedRequestInfo.Status,
        PendingWith: this.parsedRequestInfo.PendingWith,
        logedUserAdId: this.logedUserAdId,
        BudgetItemsIT: this.budgetItemsIT ,
        BudgetItemsNonIT: this.budgetItemsNonIT,
        CapexBudgetProposal: this.parsedRequestInfo.CapexBudgetProposal,  
        ApplicantAdId: 0,
        Comments: "",
        Attachments: [] 
      };

      this.deletedGridItems = {
        uId: this.uId ,
        readMode: this.readMode,
        ID: this.parsedRequestInfo.ID,
        Title: this.parsedRequestInfo.Title,
        Status: this.parsedRequestInfo.Status,
        PendingWith: this.parsedRequestInfo.PendingWith,
        logedUserAdId: this.logedUserAdId,
        GridColDef: dashboardsListsInfo[0].GridColDefWithoutControl,
        GridColVal: masterListInfo['CapexBudgetProposal'].deletedRowItems        
      }

      //### === initializing deletedItems Component === ###
      if(masterListInfo['CapexBudgetProposal'].deletedRowItems.length >0){
        let attachmentInfo = { 
          GridColDef: dashboardsListsInfo[0].GridColDefWithoutControl,
          GridColVal: masterListInfo['CapexBudgetProposal'].deletedRowItems
        }

        this.rejectedItmInjector = Injector.create({
          providers: [
            {
              provide: ComponentdatabindingService,
              deps: []
            }
          ],
          parent: this.injector
        });



        let rejectedItmService = this.rejectedItmInjector.get(ComponentdatabindingService); 
        rejectedItmService.gridInfo = attachmentInfo;

        this.RejectedItemsComponent = DisplayanyinfohomeComponent;

        this.displayRejectedItems = true;
      }

      const attachments = await this.getAllAttachments(this.parsedRequestInfo.Title);

      if(Object.values(attachments).length > 0){
        this.requestInfo.Attachments = attachments;

        let attachmentGridFlds = [
          { headerName: "Sl", valueGetter: "node.rowIndex + 1", editable: false, menuTabs: [], minWidth: 50,  maxWidth: 80 },
          {
            headerName:"Attachment",
            cellRenderer: function (params) { 
                if (params.data.AName != null && params.data.AName != undefined) { 
                  let fileLink = "<a href="+params.data.AName.ServerRelativeUrl+">" + params.data.AName.FileName + "</a>";
                  return fileLink;
                }
              },
              editable:false,
              minWidth: 400,
              menuTabs: [],
          },
          { headerName: 'Uploaded By', field: 'UploadedBy', minWidth: 180, editable: false, colId: "UploadedBy", menuTabs: []},        
          {
            headerName:"Uploaded Date",
              field: "UploadedDate",
              valueFormatter: function(params) {
                  return moment(params.value).format('DD MMM, YYYY');
              },
              editable:false,
              minWidth: 200,
              menuTabs: [],
          }        
        ];

        let attachmentRwDt = [];

        Object.values(attachments).forEach(attachment => {
          attachmentRwDt.push({
            AName: attachment.AttachmentFiles.results[0],
            UploadedBy: attachment.ActionBy.Title,
            UploadedDate: attachment.ActionDate  
          })        
        });

        let attachmentInfo = { 
          GridColDef: attachmentGridFlds,
          GridColVal: attachmentRwDt
        }

        this.myInjector = Injector.create({
          providers: [
            {
              provide: ComponentdatabindingService,
              deps: []
            }
          ],
          parent: this.injector
        });

        let attachmentService = this.myInjector.get(ComponentdatabindingService); 
        attachmentService.gridInfo = attachmentInfo;

        setTimeout(() => {
          this.DynamicComponent = DisplayanyinfohomeComponent;

          this.displayAttachments = true;
        }, 100); 

        
      }
      
    } 
    catch(err){
      console.log("Error: " + err)
    }
  }

  async populateGridData(data: any){    
    try{
      // /* creating grid coltrols array start */
      this.populateGridControls(data);      
    } 
    catch(err){
      console.log("Error: " + err)
    }
  }

  async populateGridControls(data: any){    
    try{ 
          
      let gridItems = data;

      if(!(data.hasOwnProperty('renderedGridDataSl'))){
        gridItems = gridItems.map((row, index) => {
          return { ...row, renderedGridDataSl: index + 1 };
        });
      }     

      let gridControlsArray: FormArray = this.fb.array([]);
      
      dashboardsListsInfo[0].GridColVal = data;
     
      if(this.uId != ""){
        if(this.readMode == "read" || this.requestInfoOnUid.Status == "Completed" || this.requestInfoOnUid.Status == "Rejected" || this.Status == "Completed" || this.Status == "Rejected"){
          this.grdInfo = [
            {
              GridColDef: dashboardsListsInfo[0].GridColDefWithoutControl,
              GridColVal: data
            }
          ];
        }
      }else{
        this.grdInfo = [
          {
            GridColDef: dashboardsListsInfo[0].GridColDef,
            GridColVal: data
          }
        ];
      }
      
      
      gridItems.forEach(el => {
        let gridConfig: FormGroup = this.fb.group({
          ClassCode: [el['ClassCode'], [Validators.required, Validators.minLength(4), Validators.maxLength(6)]], 
          ClassDescription: [el['ClassDescription']], 
          BusinessArea: [el['BusinessArea'], [Validators.required, Validators.minLength(4), Validators.maxLength(4)]], 
          AreaDescription: [el['AreaDescription'], [Validators.maxLength(20)]], 
          CostCenter: [el['CostCenter'], [Validators.required, Validators.minLength(8), Validators.maxLength(10)]], 
          CCDescription: [el['CCDescription'], [Validators.minLength(0), Validators.maxLength(30)]], 
          ProposedItemDescription: [el['ProposedItemDescription'], [Validators.minLength(0), Validators.maxLength(100)]],
          ImportOrLocal: [el['ImportOrLocal'], [Validators.maxLength(7)]], 
          Qty: [el['Qty'], [Validators.maxLength(3)]], 
          UM: [el['UM'], [Validators.required, Validators.minLength(2), Validators.maxLength(4)]], 
          UnitPrice: [el['UnitPrice'], [Validators.minLength(4), Validators.maxLength(6)]], 
          TotalBDT: [el['TotalBDT'], [Validators.minLength(1), Validators.maxLength(11)]], 
          Justfication: [el['Justfication'], [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
          UserName: [el['UserName'], [Validators.minLength(4), Validators.maxLength(20)]], 
          UserEmpID: [el['UserEmpID'], [Validators.minLength(2), Validators.maxLength(6)]], 
          '5YearPlan': [el['5YearPlan'], [Validators.maxLength(3)]], 
          CurAvaCapacity: [el['CurAvaCapacity'], [Validators.minLength(0), Validators.maxLength(20)]], 
          ReqProdCapacity: [el['ReqProdCapacity'], [Validators.minLength(0), Validators.maxLength(20)]],
          SalesForecast: [el['SalesForecast'], [Validators.minLength(0), Validators.maxLength(20)]], 
          ExpectedCapacity: [el['ExpectedCapacity'], [Validators.minLength(0), Validators.maxLength(20)]], 
          ExpComMonth: [el['ExpComMonth'], [Validators.required, Validators.minLength(4), Validators.maxLength(20)]], 
          NewOrReplace: [el['NewOrReplace'], [Validators.required, Validators.minLength(4), Validators.maxLength(20)]], 
          ExistingAssetID: [el['ExistingAssetID'], [Validators.minLength(7), Validators.maxLength(12)]], 
          CAPEXStrategy: [el['CAPEXStrategy'], [Validators.minLength(0), Validators.maxLength(40)]], 
          Comments: [el['Comments'], [Validators.minLength(0), Validators.maxLength(100)]]
        });        
        
        gridControlsArray.push(gridConfig);
      });
      // /* creating grid coltrols array ends */
      

      this.requestInfo = { 
        uId: this.uId ,
        readMode: this.readMode,
        Status: this.Status,
        logedUserAdId: this.logedUserAdId,
        GridColDef: this.grdInfo,
        GridValidationParam: dashboardsListsInfo[0].gridValidationParam,
        GridControlsArray: gridControlsArray, 
        ActionCellRenderer: actionCellRenderer  
      };

      this.loadDataGridComponent = true;
      
    } 
    catch(err){
      console.log("Error: " + err)
    }
  }

  getEmpAdId(){
    return new Promise((resolve, reject)=>{
      try{
        this.sharepointworkflowService.getSPLoggedInUser().then((res) => {
          this.logedUserAdId = res;
          resolve(res);
          return res;
        }) 
      } 
      catch(err){
        reject('Retrieve data failed !');
        console.log("Error: " + err);
      }
    })
  }
  
  getEmpInfo(empADId){
    this.listInfo.name = "BergerEmployeeInformation";
    this.listInfo.select = 'Company'+","+'EmployeeId'+","+'EmployeeName'+","+'OfficeLocation'+","+'Designation'+","+'Department'+","+'CostCenter'+","+'Email/ID'+","+'Email/EMail'+","+'OptManagerEmail/ID'+","+'OptManagerEmail/Title'+","+'OptManagerEmail'+","+'Mobile';
    this.listInfo.expand = 'Email'+","+'OptManagerEmail';
    this.listInfo.filterBy = 'Email/ID';
    this.listInfo.top = '100000';
    
    let requestorsInfoData;

    return new Promise((resolve, reject)=>{
      try{
        from(
          this.sharepointworkflowService.getItemsWithFilterExpand(this.listInfo, empADId)
            ).subscribe(
              (res) =>{                     
                    requestorsInfoData ={
                      EmployeeName: res[0].EmployeeName,
                      Company: res[0].Company,
                      EmployeeId: res[0].EmployeeId,
                      OfficeLocation: res[0].OfficeLocation,
                      Designation: res[0].Designation,
                      Department: res[0].Department,
                      Email: res[0].Email.EMail,
                      CostCenter: res[0].CostCenter,
                      Mobile: res[0].Mobile,
                      OpmEmail: res[0].OptManagerEmail,
                      OpmADId: res[0].OptManagerEmail.ID,
                      OpmName: res[0].OptManagerEmail.Title,
                      RequestDate: new Date().toString().substring(4, 15)
                    };

                    this.requestorsInfo = requestorsInfoData;
                    //this._form.get('Requestor').patchValue(this.requestorsInfo);
                    resolve(requestorsInfoData);
                    return requestorsInfoData;
                
              },    
              (err) => {
                  reject('Retrieve data failed !');
                  console.log(err)
              },
            ); 
      } 
      catch(err){
        reject('Retrieve data failed !');
        console.log("Error: " + err);
      }
    })
  }
  //--------------

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
    
        let colDefs = [];
        
        colDefs.push({
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
            colDefs.push(setTitleWithMDField(element));
          }
          else if (element.fldType == "TitleWitouthMDField") {
            colDefs.push(setTitleWitouthMDField(element));
          }
          else if (element.fldType == "DateField") {
            colDefs.push(setDateField(element));
          }
          else if (element.fldType == "TextField") {
            colDefs.push(setTextField(element));
          }
          else if (element.fldType == "NumberField") {
            colDefs.push(setNumberField(element));
          }
          else if (element.fldType == "ViewLinkGuidField") {
            colDefs.push(setViewLinkGuidField(element)); 
          }
          else if (element.fldType == "ViewLinkIdField") {
            colDefs.push(setViewLinkIdField(element));       
          }
          else if (element.fldType == "GetSetDateField") {
            colDefs.push(setGetSetDateField(element));
          }
          else if (element.fldType == "GetSetTextField") {
            colDefs.push(setGetSetTextField(element));
          }
          else if (element.fldType == "GetSetNumberField") {
            colDefs.push(setGetSetNumberField(element));
          }
          // else if (element.fldType == "GetSetNumberField") {
          //   this.mpTG.columnDefs.push(setGetSetNumberField(element));
          // }
          else if (element.fldType == "CustomLinkField") {
            colDefs.push(setCustomLinkField(element));
          }
          else if (element.fldType == "GetSetPeopleField") {
            colDefs.push(setGetSetPeopleField(element));
          }
          else if (element.fldType == "GetSetMulLinTextField") {
            colDefs.push(setGetSetMulLinTextField(element));
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

        resolve(colDefs);
        return colDefs;

    })
  }

  GetOutputVal(valFrmChild: any) {
    if (this.uId == "") {
      this.createReqInfoFrmChild = valFrmChild;
    }
    else {
      this.emitedDataFrmChild = valFrmChild;
    }

  }

  
  excelDataLoadedInChild(valFrmChild: any) {
    if (this.uId == "") {
      this.dataFrmExcelUpload = valFrmChild;
      this.populateGridData(this.dataFrmExcelUpload);
    }
    else {
      this.dataFrmExcelUpload = valFrmChild;
      //this.populateGridData(this.dataFrmExcelUpload);
    }

  }

  showGridComponent(){
    const componentFactory = this.resolver.resolveComponentFactory(DatagridcrudhomeComponent);
  }

  gridDataLoadedInChild(valFrmChild: any) {
    this._form.value.Datagridcrudhomeitems = [];
    (<FormArray>this._form.get('Datagridcrudhomeitems')).controls = [];
    this.dataFrmExcelUpload = valFrmChild.newRowData;
    this._form.value.Datagridcrudhomeitems = valFrmChild.newRowData;
    //this._form.value.deletedRowItems = valFrmChild.deletedRowItems;
    this.deletedRowItems.push(valFrmChild.deletedRowItems[0]);
  }


  
}


