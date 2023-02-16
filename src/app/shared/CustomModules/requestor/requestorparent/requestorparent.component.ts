import { Component, OnInit } from '@angular/core';
import { EmpInfoBindingService } from 'src/app/shared/services/emp-info-binding.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ControlContainer, FormGroupDirective } from '@angular/forms';


@Component({
  selector: 'app-requestorparent',
  templateUrl: './requestorparent.component.html',
  styleUrls: ['./requestorparent.component.scss']
})
export class RequestorparentComponent implements OnInit {
  public requestorsInfo: any;

  formGroup: FormGroup;

  constructor(
    //private empInfoBindingService: EmpInfoBindingService,
    //public controlContainer: ControlContainer, 
    //parent: FormGroupDirective
    ) {
    //this.formGroup = parent.control; 
    //this.requestorsInfo = this.empInfoBindingService.requestorsInfo;
  }

  ngOnInit(): void {
  }

 
  

}
