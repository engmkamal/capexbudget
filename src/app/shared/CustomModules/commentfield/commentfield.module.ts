import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentfieldhomeComponent } from './commentfieldhome/commentfieldhome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../models/classes/material-module';



@NgModule({
  declarations: [CommentfieldhomeComponent],
  imports: [
    CommonModule,    
    FormsModule,    
    ReactiveFormsModule, 
    FlexLayoutModule,   
    MaterialModule
  ],
  exports: [CommentfieldhomeComponent]
})
export class CommentfieldModule { }
