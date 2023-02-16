// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { WorkflowshomeComponent } from './workflowshome/workflowshome.component';
// import { WorkflowsRoutingModule } from './workflows-routing.module';



// @NgModule({
//   declarations: [WorkflowshomeComponent],
//   imports: [
//     CommonModule,
//     WorkflowsRoutingModule
//   ]
// })
// export class WorkflowsModule { }

//=====================================================
// import { NgModule } from '@angular/core';
// import { WorkflowsRoutingModule } from './workflows-routing.module';
// import { ShareddashboardModule } from 'src/app/shared/shareddashboard.module';
// import { MaterialModule } from 'src/app/shared/models/classes/material-module';
// import { RndsampletestModule } from '../rndsampletest/rndsampletest.module';
// //import { DatepickercstmComponent } from 'src/app/shared/components/datepickercstm/datepickercstm.component';
// import { WorkflowshomeComponent } from './workflowshome/workflowshome.component';
// import { AgGridModule } from 'ag-grid-angular';
// import '@ag-grid-enterprise/all-modules/dist/ag-grid-enterprise';
// import 'ag-grid-enterprise';
// import { ChangemanagementhomeComponent } from './workflowshome/ChangeManagementWF/changemanagementhome/changemanagementhome.component';
// import { DatagridCrudModule } from '../datagrid-crud/datagrid-crud.module';
// import { CapexbudgethomeComponent } from './workflowshome/CapexBudgetWF/capexbudgethome/capexbudgethome.component';
// import { RequestorModule } from 'src/app/shared/CustomModules/requestor/requestor.module';
// import { CapexbudgetparentComponent } from './workflowshome/CapexBudgetWF/capexbudgetparent/capexbudgetparent.component';
// import { CommonModule } from '@angular/common';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgSelectModule } from '@ng-select/ng-select';
// import { AlertModule } from 'src/app/shared/alert';
// import { NgxPrintModule } from 'ngx-print';



// @NgModule({
//    declarations: [
//     WorkflowshomeComponent,
//     ChangemanagementhomeComponent,
//     CapexbudgethomeComponent,
//     CapexbudgetparentComponent,
//     //DatepickercstmComponent
//    ],
//   imports: [  
//     WorkflowsRoutingModule,
//     AgGridModule.withComponents([]), 
//     MaterialModule,    
//     RndsampletestModule, 
//     ShareddashboardModule,
//     DatagridCrudModule,
//     RequestorModule,
//     CommonModule,
//     FlexLayoutModule,
//     FormsModule,    
//     ReactiveFormsModule,    
//     MaterialModule,
//     NgSelectModule,
//     AlertModule,
//     NgxPrintModule
//   ],
//   //providers: [AccesswiselistitemsService, ListWithSppnpjsService, SharepointworkflowService],
  
//   entryComponents: [
//     //DatepickercstmComponent
//   ]
// })
// export class WorkflowsModule { }

//===============================================================
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowsRoutingModule } from './workflows-routing.module';
import { ShareddashboardModule } from 'src/app/shared/shareddashboard.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { MaterialModule } from 'src/app/shared/models/classes/material-module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material/material.module';
import { AlertModule } from 'src/app/shared/alert';
import { NgxPrintModule } from 'ngx-print';
//import { DatagridCrudModule } from '../datagrid-crud/datagrid-crud.module';
import { RequestorModule } from 'src/app/shared/CustomModules/requestor/requestor.module';
import { AgGridModule } from 'ag-grid-angular';
import { WorkflowshomeComponent } from './workflowshome/workflowshome.component';
import { ChangemanagementhomeComponent } from './workflowshome/ChangeManagementWF/changemanagementhome/changemanagementhome.component';
import { CapexbudgethomeComponent } from './workflowshome/CapexBudgetWF/capexbudgethome/capexbudgethome.component';
import { CapexbudgetparentComponent } from './workflowshome/CapexBudgetWF/capexbudgetparent/capexbudgetparent.component';
import { DatagridcrudModule } from 'src/app/shared/CustomModules/datagridcrud/datagridcrud.module';
import { ApprovalhistoryModule } from 'src/app/shared/CustomModules/approvalhistory/approvalhistory.module';
import { ExceluploadModule } from 'src/app/shared/CustomModules/excelupload/excelupload.module';
import { MultipleattachmentsuploadModule } from 'src/app/shared/CustomModules/multipleattachmentsupload/multipleattachmentsupload.module';
import { AttachmentprimengModule } from 'src/app/shared/CustomModules/attachmentprimeng/attachmentprimeng.module';
import { DatagridcrudhomeComponent } from 'src/app/shared/CustomModules/datagridcrud/datagridcrudhome/datagridcrudhome.component';
import { CommentfieldModule } from 'src/app/shared/CustomModules/commentfield/commentfield.module';
import { DisplayanyinfoModule } from 'src/app/shared/CustomModules/displayanyinfo/displayanyinfo.module';
import { RequestoronbehalfofModule } from 'src/app/shared/CustomModules/requestoronbehalfof/requestoronbehalfof.module';





@NgModule({
  declarations: [
    WorkflowshomeComponent,
    ChangemanagementhomeComponent,
    CapexbudgethomeComponent,
    CapexbudgetparentComponent
    //DatepickercstmComponent
  ],
  imports: [
    CommonModule,
    WorkflowsRoutingModule,
    ShareddashboardModule,
    FlexLayoutModule,
    FormsModule,    
    ReactiveFormsModule,    
    MaterialModule,
    NgSelectModule,
    AlertModule,
    NgxPrintModule,
    //DatagridCrudModule,
    RequestorModule,
    AgGridModule.withComponents([]),
    DatagridcrudModule,
    ApprovalhistoryModule,
    ExceluploadModule,
    MultipleattachmentsuploadModule,
    AttachmentprimengModule,
    CommentfieldModule,
    DisplayanyinfoModule,
    RequestoronbehalfofModule
  ],
  exports: [
    //CapexbudgethomeComponent
  ],
  entryComponents: [
    DatagridcrudhomeComponent,
    //DatepickercstmComponent
  ],
  //providers: [AccesswiselistitemsService, ListWithSppnpjsService, SharepointworkflowService],
})
export class WorkflowsModule { }






