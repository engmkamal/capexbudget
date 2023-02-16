import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ComponentdatabindingService {
  public description!: string;
  public text!: string;
  public gridInfo!:any;
  public clicked = new EventEmitter();

  constructor() {
     //this.text = "Text from Service" 
  }
}
