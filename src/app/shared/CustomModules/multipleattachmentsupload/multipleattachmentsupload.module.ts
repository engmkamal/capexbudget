import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultipleattachmentsuploadComponent } from './multipleattachmentsupload/multipleattachmentsupload.component';
//import { AppComponent } from './app.component';
//import { FileUploadComponent } from './file-upload/file-upload.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  FileSelectDirective, 
  FileUploadModule
} from "ng2-file-upload";
import {HttpClientModule} from "@angular/common/http";
//import {CustomMaterialModule} from "./file-upload/material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';




@NgModule({
  declarations: [
    MultipleattachmentsuploadComponent,
    //FileSelectDirective
  ],
  imports: [
    CommonModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    //CustomMaterialModule,
    RouterModule.forRoot([
      {path: '', component: MultipleattachmentsuploadComponent}
    ]),
    BrowserAnimationsModule
  ],
  exports: [
    MultipleattachmentsuploadComponent
  ]
})
export class MultipleattachmentsuploadModule { }




// // //=======================================
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
// import {FileUploadModule} from 'primeng/fileupload';
// // import { MatIconModule } from '@angular/material/icon';
// // import { MatButtonModule } from '@angular/material/button';
// // import { MatInputModule } from '@angular/material/input';
// // import { MatFormFieldModule } from '@angular/material/form-field';
// // import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MultipleattachmentsuploadComponent } from './multipleattachmentsupload/multipleattachmentsupload.component';
 

// //import { MatToolbarModule } from '@angular/material/toolbar';

// // const materialModules = [
// //   MatIconModule,
// //   MatButtonModule,
// //   MatInputModule,
// //   MatFormFieldModule,
// //   MatProgressBarModule
// // ];

// @NgModule({
//   declarations: [MultipleattachmentsuploadComponent],
//   imports: [
//     CommonModule,    
//     FormsModule,
//     FileUploadModule,
//     HttpClientModule
//   ],
//   exports: [
//     MultipleattachmentsuploadComponent
//   ],
// })

// export class MultipleattachmentsuploadModule { }
