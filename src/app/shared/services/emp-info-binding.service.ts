import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ControlContainer, FormGroupDirective } from '@angular/forms';

@Injectable()
export class EmpInfoBindingService {
  public requestorsInfo!: any;
  public _form!: FormGroup;
  constructor() { }
}
