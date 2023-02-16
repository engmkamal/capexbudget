import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workflowshome',
  templateUrl: './workflowshome.component.html',
  styleUrls: ['./workflowshome.component.scss']
})
export class WorkflowshomeComponent implements OnInit {
  public webAbsoluteUrl = window.location.origin;
  
  constructor() { }

  ngOnInit(): void {
  }

}
