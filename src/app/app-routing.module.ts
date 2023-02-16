import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { DashboardshomeComponent } from './modules/dashboards/dashboardshome/dashboardshome.component';
import { CapexbudgethomeComponent } from './modules/workflows/workflowshome/CapexBudgetWF/capexbudgethome/capexbudgethome.component';
import { WorkflowshomeComponent } from './modules/workflows/workflowshome/workflowshome.component';
//import { AllmousComponent } from './modules/bergermou/allmous/allmous.component';
//import { HrcornerpageComponent } from './modules/hrcorner/hrcornerpage/hrcornerpage.component';
//import { ShopsigndashboardComponent } from './modules/trademerchandising/shopsigndashboard/shopsigndashboard.component';
// import { DefaultComponent } from './layouts/default/default.component';
// import { DashboardComponent } from './modules/dashboard/dashboard.component';
// import { PostsComponent } from './modules/posts/posts.component';
// import { WorkshopProposalComponent } from './modules/WorkshopProposal/workshop-proposal/workshop-proposal.component';
// import { GraphicalViewComponent } from './modules/WorkshopProposal/graphical-view/graphical-view.component';
// import { TrademerchandisingComponent } from './trademerchandising/trademerchandising.component';
// import { AppComponent } from './app.component';
//import { TmadvancedashboardComponent } from './modules/trademerchandising/tmadvancedashboard/tmadvancedashboard.component';
// import { CmdashboardComponent } from './modules/changemanagement/cmdashboard/cmdashboard.component';
// import { MasterdetailsComponent } from './masterdetails/masterdetails.component';
// import { ItsapplicationinfoComponent } from './modules/itservicerequestwf/itsapplicationinfo/itsapplicationinfo.component';
// import { MyspworkflowsComponent } from './modules/mywfrequests/myspworkflows/myspworkflows.component';
// import { MyprocessComponent } from './myprocess/myprocess.component';
//import { ReimbursementmstrComponent } from './modules/allworkflows/reimbursementmstr/reimbursementmstr.component';
//import { EmpreimbursementreportComponent } from './modules/empreimbursementdashboard/empreimbursementreport/empreimbursementreport.component';
//import { ReimbursementdashboardComponent } from './modules/empreimbursementdashboard/reimbursementdashboard/reimbursementdashboard.component';
// import { ItassetmanagementmstrComponent } from './modules/allworkflows/itassetmanagementmstr/itassetmanagementmstr.component';
// import { SampletestreqComponent } from './modules/rndsampletest/sampletestreq/sampletestreq.component';
// import { MyitassetsComponent } from './modules/myportal/myitassets/myitassets.component';
//import { RndlabtestparentComponent } from './modules/rndsampletest/rndlabtestparent/rndlabtestparent.component';
//import { CustomerfeedbackstComponent } from './modules/rndsampletest/customerfeedbackst/customerfeedbackst.component';
import { MyportalhomeComponent } from './myportalhome/myportalhome.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
// import { SampletestreportComponent } from './modules/rndsampletest/sampletestreport/sampletestreport.component';
// import { ItservicerequestdashboardComponent } from './modules/itservicedashboard/itservicerequestdashboard/itservicerequestdashboard.component';
//import { SampletestdashboardComponent } from './modules/rndsampletestdashboard/sampletestdashboard/sampletestdashboard.component';
//import { WorkshopproposaldashboardComponent } from './modules/workshopproposaldashboard/workshopproposaldashboard/workshopproposaldashboard.component';
//import { WorkshopproposalreportComponent } from './modules/workshopproposaldashboard/workshopproposalreport/workshopproposalreport.component';


const routes: Routes = [  
  {
    path: '',
    children: [{
        path: '',
        component: CapexbudgethomeComponent
        //component: MyportalhomeComponent
      },{
        path: 'db',
        component: CapexbudgethomeComponent
        //component: DashboardshomeComponent
      },{
        path: 'wf',
        component: CapexbudgethomeComponent
        //component: WorkflowshomeComponent
      }
    ]
  },  
  {
    path: 'index.aspx',
    redirectTo: '/',
    pathMatch: 'full',    
  }, 
  // {
  //   path: '',
  //   redirectTo: '/home',
  //   pathMatch: 'full'       
  // },
  {
    path: '**',
    component: PagenotfoundComponent    
  },
  
 
]




// const routes: Routes = [

//   //{path:"**", redirectTo: "workshopproposal"},
//   // {

//   //   path: '',
//   //   component: WorkshopProposalComponent
//   // },
//   {
//     path: 'workshopproposal',
//     component: WorkshopProposalComponent,    
//   },{
//     path: 'graphicalview',
//     component: GraphicalViewComponent,
//     children: [{
//       path: '',
//       component: DefaultComponent,
//       children: [{
//         path: '',
//         component: DashboardComponent
//       }, {
//         path: 'posts',
//         component: PostsComponent
//       }, {
//         path: 'home',
//         component: DashboardComponent
//       }, {
//         path: 'index.aspx',
//         component: DashboardComponent
//       }
//       ]
//     }]
//   },


//   ];



@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
