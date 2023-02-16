import { Component, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ControlContainer, FormGroupDirective } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable, Subscription } from 'rxjs';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-requestoronbehalfofparent',
  templateUrl: './requestoronbehalfofparent.component.html',
  styleUrls: ['./requestoronbehalfofparent.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  encapsulation: ViewEncapsulation.Emulated
  
})

export class RequestoronbehalfofparentComponent implements OnInit, AfterViewInit{
  private mediaSub: Subscription;
  Requestor: FormGroup;
  date = new FormControl(moment());
  

  @Input()
  requestorsInfo: any;

  @Input() formGroup: FormGroup;

  @Input()
  frmParent: any;

  constructor(
     public controlContainer: ControlContainer, 
     parent: FormGroupDirective, 
     private fb: FormBuilder,
     private mediaObserver: MediaObserver
    ) {
    this.formGroup = parent.control
  }   

  ngOnInit() {
    this.addGroupToParent();    
  }

  private addGroupToParent() {

    const config = {
      EmployeeName: [this.requestorsInfo.EmployeeName],
      Company: [this.requestorsInfo.Company],
      EmployeeId: [this.requestorsInfo.EmployeeId],
      OfficeLocation: [this.requestorsInfo.OfficeLocation],
      Designation: [this.requestorsInfo.Designation],
      Department: [this.requestorsInfo.Department],
      Email: [this.requestorsInfo.Email],
      CostCenter: [this.requestorsInfo.CostCenter],
      Mobile: [this.requestorsInfo.Mobile],
      RequestDate: [this.requestorsInfo.RequestDate]
    };
    this.formGroup.addControl('Requestor', this.fb.group(config));
    //this.formGroup.get('Requestor').patchValue(requestorsInfo); 
       
  }
  
  ngAfterViewInit(){}
  
}





