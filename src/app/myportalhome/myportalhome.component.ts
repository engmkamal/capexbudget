import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myportalhome',
  templateUrl: './myportalhome.component.html',
  styleUrls: ['./myportalhome.component.scss']
})
export class MyportalhomeComponent implements OnInit {

  public webAbsoluteUrl = window.location.origin;
  //public webAbsoluteUrl = "https://portal.bergerbd.com/leaveauto";

  constructor() { }

  ngOnInit(): void {
  }

}
