import { Component, Input, OnInit } from '@angular/core';
import { EmpInfoBindingService } from 'src/app/shared/services/emp-info-binding.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-requestoronbehalfofhome',
  templateUrl: './requestoronbehalfofhome.component.html',
  styleUrls: ['./requestoronbehalfofhome.component.scss']
})
export class RequestoronbehalfofhomeComponent implements OnInit {

  public bhalfofInfo: any;
  public _form: FormGroup;

  @Input()
  requestorsInfo: any;

  @Input() formGroup: FormGroup;  

  constructor(
    private empInfoBindingService: EmpInfoBindingService 
    ) {}

  async executeOnInitProcesses(){ 
    this.bhalfofInfo = this.empInfoBindingService.requestorsInfo;
    this._form = this.empInfoBindingService._form;
  }

  ngOnInit(): void {
    this.executeOnInitProcesses();
  }

}
