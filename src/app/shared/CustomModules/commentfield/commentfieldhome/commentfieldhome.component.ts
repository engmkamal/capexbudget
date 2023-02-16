import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, FormArray, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-commentfieldhome',
  templateUrl: './commentfieldhome.component.html',
  styleUrls: ['./commentfieldhome.component.scss']
})
export class CommentfieldhomeComponent implements OnInit {

 // public userContactForm: FormGroup;
 @Input()
 public formGroup: FormGroup;

 @Input()
 public childGroup: FormGroup;
 

  constructor(public controlContainer: ControlContainer, parent: FormGroupDirective) { this.formGroup = parent.control}

  ngOnInit(): void {
    //this.generateUserContactForm();
  }

  // public generateUserContactForm(): void{
  //   this.userContactForm = new FormGroup({
  //     contacts: new FormArray([])
  //   });
  // }

  static addUserContactItem(): FormGroup{
    return new FormGroup({
      //name: new FormControl(''),
      Comment: new FormControl('')
    });
  }

}
