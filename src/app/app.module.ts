import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MyportalhomeComponent } from './myportalhome/myportalhome.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
//import { DashboardsModule } from './modules/dashboards/dashboards.module';
import { WorkflowsModule } from './modules/workflows/workflows.module';




// import { ListWithSppnpjsService } from './list-with-sppnpjs.service';
// import { AccesswiselistitemsService } from './accesswiselistitems.service';
// import { SharepointworkflowService } from './shared/services/sharepointworkflow.service';


// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { DefaultModule } from './layouts/default/default.module';
// import { WorkshopProposalComponent } from './modules/WorkshopProposal/workshop-proposal/workshop-proposal.component';




// import { AgGridModule } from 'ag-grid-angular';
// import '../../node_modules/@ag-grid-enterprise/all-modules/dist/ag-grid-enterprise';

// import { LiActionBtnCstmComponent } from './modules/WorkshopProposal/li-action-btn-cstm/li-action-btn-cstm.component';
// import { GraphicalViewComponent } from './modules/WorkshopProposal/graphical-view/graphical-view.component';
// import { TrademerchandisingComponent} from './trademerchandising/trademerchandising.component';
// import 'ag-grid-enterprise';

// import { TrademerchandisingModule } from './modules/trademerchandising/trademerchandising.module';
// import { ChangemanagementModule } from './modules/changemanagement/changemanagement.module';
// import { LiactionbtncstmComponent } from './shared/components/liactionbtncstm/liactionbtncstm.component';
// import { MasterdetailsComponent } from './masterdetails/masterdetails.component';
// import { ItservicerequestwfModule } from './modules/itservicerequestwf/itservicerequestwf.module';
// import { MomentDateModule } from '@angular/material-moment-adapter';
// import { DatepickercstmComponent } from './shared/components/datepickercstm/datepickercstm.component';
// import { FlexLayoutModule, MediaObserver, MediaChange } from '@angular/flex-layout';
// import { MywfrequestsModule } from './modules/mywfrequests/mywfrequests.module';
// import { MyprocessviewbtncstmComponent } from './shared/components/myprocessviewbtncstm/myprocessviewbtncstm.component';
// import { MyprocessComponent } from './myprocess/myprocess.component';
// import { AllworkflowsModule } from './modules/allworkflows/allworkflows.module';
// import { MaterialModule } from './material/material.module';
// import { RndsampletestModule } from './modules/rndsampletest/rndsampletest.module';
// import { MyportalModule } from './modules/myportal/myportal.module';

// import { ItservicedashboardModule } from './modules/itservicedashboard/itservicedashboard.module';
// import { RndsampletestdashboardModule } from './modules/rndsampletestdashboard/rndsampletestdashboard.module';
// import { WorkshopproposaldashboardModule } from './modules/workshopproposaldashboard/workshopproposaldashboard.module';
// import { EmpreimbursementdashboardModule } from './modules/empreimbursementdashboard/empreimbursementdashboard.module';
// import { BergermouModule } from './modules/bergermou/bergermou.module';
// import { HrcornerModule } from './modules/hrcorner/hrcorner.module';





@NgModule({
   declarations: [
     AppComponent,
  //   WorkshopProposalComponent,
  //   LiActionBtnCstmComponent,
  //   GraphicalViewComponent,
  //   TrademerchandisingComponent,
  //   MasterdetailsComponent,
  //   DatepickercstmComponent,
  //   MyprocessComponent,
     MyportalhomeComponent,
     PagenotfoundComponent
   ],
  imports: [
    BrowserModule,    
    HttpClientModule,
    //DashboardsModule,
    WorkflowsModule,
    AppRoutingModule,
    //BrowserAnimationsModule,
    //DefaultModule,
    // import HttpClientModule after BrowserModule.
   
    // FormsModule,
    // AgGridModule.withComponents([]),
    // TrademerchandisingModule,
    // ChangemanagementModule,
    // ItservicerequestwfModule,
    // ReactiveFormsModule,
    // MomentDateModule,
    // FlexLayoutModule,
    // MaterialModule,
    // MywfrequestsModule,
    // AllworkflowsModule,
    // RndsampletestModule,
    // MyportalModule,
    // ItservicedashboardModule,
    // RndsampletestdashboardModule,
    // WorkshopproposaldashboardModule,
    // EmpreimbursementdashboardModule,
    // BergermouModule,
    // HrcornerModule,
    
    
  ],
  //providers: [AccesswiselistitemsService, ListWithSppnpjsService, SharepointworkflowService],
  bootstrap: [AppComponent],
  // entryComponents: [
  //   LiActionBtnCstmComponent, 
  //   LiactionbtncstmComponent, 
  //   DatepickercstmComponent,
  //   MyprocessviewbtncstmComponent
  // ]
})
export class AppModule { }
