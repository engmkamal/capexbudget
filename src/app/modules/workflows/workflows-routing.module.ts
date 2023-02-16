import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { SampletestreqComponent } from '../rndsampletest/sampletestreq/sampletestreq.component';
import { CapexbudgethomeComponent } from './workflowshome/CapexBudgetWF/capexbudgethome/capexbudgethome.component';
import { ChangemanagementhomeComponent } from './workflowshome/ChangeManagementWF/changemanagementhome/changemanagementhome.component';
import { WorkflowshomeComponent } from './workflowshome/workflowshome.component';

//import { AllmousComponent } from './modules/bergermou/allmous/allmous.component';
//import { HrcornerpageComponent } from './modules/hrcorner/hrcornerpage/hrcornerpage.component';ponent';
// import { MyprocessComponent } from './myprocess/myprocess.component';
// import { MyitassetsComponent } from './modules/myportal/myitassets/myitassets.component';


const routes: Routes = [  
   {
    path: 'wf',
    children: [
      // {
      //   path: 'sampletest',
      //   component: SampletestreqComponent
      // }, 
      {
        path: 'changemanagement',
        component: ChangemanagementhomeComponent
      },      
      {
        path: 'capexbudget',
        component: CapexbudgethomeComponent
      },
      {
        path: '',
        component: WorkflowshomeComponent
      },
    //{
    //     path: '**',
    //     component: PagenotfoundComponent
    //   }
  
    ]
  }
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowsRoutingModule { }
