import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttachmentprimenghomeComponent } from './attachmentprimenghome/attachmentprimenghome.component';
import { MaterialModule } from 'src/app/material/material.module';
import {FileUploadModule} from 'primeng/fileupload';
import { HttpajaxService } from '../../services/httpajax.service';
import { SharepointworkflowService } from '../../services/sharepointworkflow.service';



@NgModule({
  declarations: [AttachmentprimenghomeComponent],
  imports: [
    CommonModule,
    FormsModule,    
    ReactiveFormsModule,
    MaterialModule,
    FileUploadModule
  ],
  exports: [
    AttachmentprimenghomeComponent
  ],
  //providers: [HttpajaxService, SharepointworkflowService]
})
export class AttachmentprimengModule { }
