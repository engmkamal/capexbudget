import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

import { RequestoronbehalfofhomeComponent } from './requestoronbehalfofhome/requestoronbehalfofhome.component';
import { RequestoronbehalfofparentComponent } from './requestoronbehalfofparent/requestoronbehalfofparent.component';




@NgModule({
  declarations: [RequestoronbehalfofhomeComponent, RequestoronbehalfofparentComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,    
    ReactiveFormsModule,    
    MaterialModule
  ],
  exports: [
    RequestoronbehalfofhomeComponent,
    RequestoronbehalfofparentComponent
  ],
  entryComponents: [
    RequestoronbehalfofhomeComponent,
    RequestoronbehalfofparentComponent
  ]
})
export class RequestoronbehalfofModule { }


//================
// @NgModule({
//   declarations: [RequestoronbehalfofhomeComponent, RequestoronbehalfofparentComponent],
//   imports: [
//     CommonModule,
//     FlexLayoutModule,
//     FormsModule,    
//     ReactiveFormsModule,    
//     MaterialModule
//   ],
//   exports: [
//     RequestoronbehalfofhomeComponent
//   ],
//   entryComponents: [
//     RequestoronbehalfofhomeComponent
//   ]
// })
// export class RequestoronbehalfofModule { }