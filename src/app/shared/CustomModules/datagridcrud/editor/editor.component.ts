// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-editor',
//   templateUrl: './editor.component.html',
//   styleUrls: ['./editor.component.scss']
// })
// export class EditorComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
//===========================
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AgEditorComponent } from 'ag-grid-angular';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AgEditorComponent, AfterViewInit {

  params;
  @ViewChild('input') input: ElementRef;

  constructor() { }

  getValue() {
    // If I don't return something here, the grid will update its rowData with an empty value,
    // even though it's supposed to be using reactive data.
    // Problem only happens with deltaRowMode=true
    return this.params.node.data.value.value;
  }

  agInit(params) {
    this.params = params;
    this.getValue();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout( () => this.input.nativeElement.focus() );
  }

}
