import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { MatDividerModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatListModule, MatPaginatorModule, MatSidenavModule, MatCardModule, MatTableModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [    
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,    
    HighchartsChartModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    HighchartsChartModule,
    FlexLayoutModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MomentDateModule,
    MatSidenavModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule   
    
  ]
})
export class ShareddashboardModule { }

