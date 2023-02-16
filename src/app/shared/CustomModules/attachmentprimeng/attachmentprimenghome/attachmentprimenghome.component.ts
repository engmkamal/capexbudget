import { Component, OnInit, Input } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { FileUpload } from 'primeng/primeng';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpajaxService } from 'src/app/shared/services/httpajax.service';
import { SharepointworkflowService } from 'src/app/shared/services/sharepointworkflow.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-attachmentprimenghome',
   templateUrl: './attachmentprimenghome.component.html',
   styleUrls: ['./attachmentprimenghome.component.scss']
})
export class AttachmentprimenghomeComponent implements OnInit {
  form: FormGroup;

  name = 'Angular File Upload';
  urls = [];
  attachmentList = { 
    Name: "",
    Id:null,
    FileName: "",
    api: ""
  };

  attachmentArrayBuffer:any;

  //thisBuffer;

  @Input() formGroup: FormGroup;

  @Input() gridControlName: any;

  @Input() requestInfo: any;

  //formGroupControlContainerControl = "formGroupControlContainerControl";

  constructor(
    private http: HttpClient, 
    //private httpajaxService: HttpajaxService,
    //private sharepointworkflowService: SharepointworkflowService,
    parent: FormGroupDirective,
    public controlContainer: ControlContainer,
    private fb: FormBuilder) {
      this.formGroup = parent.control;
  }

  ngOnInit(): void {
    // (<FormArray>this.formGroup.get('Attachments')).push(
    //   this.fb.group({arrayBuffer: '', attachmentName: ''})
    // );    
  }

  uploadFiles(event, form) {
    const files = [];
    console.log('Files are getting Uploaded ..!!', 'Please Wait');
    let file_request = 0;
    event.files.forEach((file, index, array) => { // Take Individual File and converting to array bytes
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      setTimeout(() => {
        this.attachmentArrayBuffer = fileReader.result;
        


      
        // this.sharepointworkflowService.addAttachment(list).then(res =>{
        //   let output = res;
        //   alert(output);
        // })
      }, 1000);
      // setTimeout(() => {
      //   let list ={
      //     name: "CapexBudgetAttachment",
      //     id: 1,
      //     arrayBuffer:this.attachmentArrayBuffer
      //   };
      
      //   this.sharepointworkflowService.addAttachment(list).then(res =>{
      //     let output = res;
      //     alert(output);
      //   })
      // }, 2000);

      // this.file_request(file, () => { // creating array bytes
      //   file_request++;
      //   file.file_id = uuid();
      //   files.push(file);
      //   if (file_request === array.length) {
      //     if (files.length > 0) {
      //       let file_counter = 0;
      //       let uploaded_file_counter = 0;
      //       files.forEach((single_file, file_index, files_array) => {
      //         this.file_upload(single_file, (data) => {
      //           console.log('Return Data', data);
      //           // let res = JSON.parse(data);
      //           file_counter++;
      //           if (data && data[0].UniqueID) {
      //             uploaded_file_counter++;
      //             console.log((file_index + 1) + 'File Uploaded ..!!');
      //           } else {
      //             console.log('File Upload Failed ..!!', 'Error');
      //           }

      //           if (uploaded_file_counter === files_array.length) {
      //             // form.clear();
      //             console.log('All Files Uploaded Succesfully ..!!', 'Success');
      //             this.completed_fileupload();
      //           }
      //         });
      //       });
      //     }
      //   }
      // });

      // this.file_request(file, async () => { // creating array bytes
      //   file_request++;
      //   file.file_id = uuid();
      //   files.push(file);
      //   if (file_request === array.length) {
      //     if (files.length > 0) {
      //       console.log(files.length);
      //       let file_counter = 0;
      //       let uploaded_file_counter = 0;
      //       let a
      //       for (let k = 0; k < files.length; k++) {
      //         a = await this.file_upload(files[k], k, files.length);
      //       }
      //       console.log('BB',a);
      //     }
      //   }
      // });
    });
  }

  addFilesToParents(event) {
    let files = [];
    console.log('Files are getting Uploaded ..!!', 'Please Wait');
    let file_request = 0;

    //event.files.forEach((file, index, array) => { // Take Individual File and converting to array bytes
      let file = event.files[0];
      this.file_request(file, () => { // creating array bytes
        file_request++;
        file.file_id = uuid();
        files.push(file);
        //this.outputToParent.emit(files);
        this.formGroup.value.Attachments.push(file);
        // if (file_request === array.length) {
        //   if (files.length > 0) {
        //     let file_counter = 0;
        //     let uploaded_file_counter = 0;
        //     files.forEach((single_file, file_index, files_array) => {
        //       this.file_upload(single_file, (data) => {
        //         console.log('Return Data', data);
        //         // let res = JSON.parse(data);
        //         file_counter++;
        //         if (data && data[0].UniqueID) {
        //           uploaded_file_counter++;
        //           console.log((file_index + 1) + 'File Uploaded ..!!');
        //         } else {
        //           console.log('File Upload Failed ..!!', 'Error');
        //         }

        //         if (uploaded_file_counter === files_array.length) {
        //           // form.clear();
        //           console.log('All Files Uploaded Succesfully ..!!', 'Success');
        //           this.completed_fileupload();
        //         }
        //       });
        //     });
        //   }
        // }
      });

      // this.file_request(file, async () => { // creating array bytes
      //   file_request++;
      //   file.file_id = uuid();
      //   files.push(file);
      //   if (file_request === array.length) {
      //     if (files.length > 0) {
      //       console.log(files.length);
      //       let file_counter = 0;
      //       let uploaded_file_counter = 0;
      //       let a
      //       for (let k = 0; k < files.length; k++) {
      //         a = await this.file_upload(files[k], k, files.length);
      //       }
      //       console.log('BB',a);
      //     }
      //   }
      // });
    //});
  }

  file_request(file, cb) { // making File to Array Bytes

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);  
    
    fileReader.onloadend = function () {      
      const arrayBuffer: any = fileReader.result;
      console.log(fileReader.result);
      const bytes = new Uint8Array(arrayBuffer);
      const array_bytes = Array.from(bytes);
      console.log(array_bytes);
      file.bytes = array_bytes;
      file.arrayBuffer = arrayBuffer;      
      cb();
    };
    

    
    // setTimeout(() => { 
    //   this.sharepointworkflowService.addAttachment(list).then(res =>{
    //     let output = res;
    //     alert(output);
    //   })
    // }, 100);
    
    //==================
   
    
    // this.httpajaxService.getData( this.attachmentList.api, this.attachmentArrayBuffer).subscribe((res)=>{
    //   //code...
    // })
    //-----------------


  }

  _oldfile_upload(file, cb) { // Upload to Share point
    const body = {
      ModuleName: 'SCM',
      DocumentType: 'InternalDocuments',
      File: file.bytes,
      FileName: file.name,
      DocumentId: file.file_id,
      DocType: 'folder',
      FileDescription: file.desc === undefined ? '' : file.desc,
    };

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    //headers = headers.append('Ocp-Apim-Subscription-Key', '13cf8b5d1cb740eab6831196d7f3b830');
    headers = headers.append('Access-Control-Allow-Origin', '*');


    

    this.http.post(this.attachmentList.api,
      body, { headers }).subscribe((data: any) => {
        cb(data);
      }, (err) => {
        console.log('File Upload API Failed ..!!', 'Error');
      });

  }

  file_upload(file, file_index, files_array?) {
    return new Promise((resolve, reject) => {

      // Upload to Share point
      const body = {
        ModuleName: 'SCM',
        DocumentType: 'InternalDocuments',
        File: file.bytes,
        FileName: file.name,
        DocumentId: file.file_id,
        DocType: 'folder',
        FileDescription: file.desc === undefined ? '' : file.desc,

      };

      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json;odata=verbose');
      //headers = headers.append('Ocp-Apim-Subscription-Key', '13cf8b5d1cb740eab6831196d7f3b830');
      headers = headers.append('Access-Control-Allow-Origin', '*');

      this.http.post(this.attachmentList.api,
        body, { headers }).subscribe((data: any) => {
          console.log('Return Data', data);
          // let res = JSON.parse(data);
          if (data && data[0].UniqueID) {
            console.log((file_index + 1) + 'File Uploaded ..!!');
            resolve('Success');
          } else {
            console.log('File Upload Failed ..!!', 'Error');
          }
        }, (err) => {
          console.log('File Upload API Failed ..!!', 'Error');
        });
    })
  }


  completed_fileupload() { // Uploaded all Files
    console.log('All Done');
  }

  singleuploadFile(file: any, uploader: FileUpload) { // Single File Upload
    this.file_request(file, () => {
      console.log('Please wait ...!!', 'File Uploading');
      file.file_id = uuid();
      this.file_upload(file, (data) => {
        // let res = JSON.parse(data);
        if (data[0].UniqueID) {
          console.log('File Uploaded ..!!', 'Success');
        } else {
          console.log('File Upload Failed ..!!', 'Error');
        }
      });
    });
  }

  uploadFileEvt(imgFile, form) {
    imgFile.files.forEach((file, index, array) => { // Take Individual File and converting to array bytes
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      setTimeout(() => {
        this.attachmentArrayBuffer = fileReader.result;
        let list ={
          name: "CapexBudgetAttachment",
          id: 1,
          arrayBuffer:this.attachmentArrayBuffer
        };


      
        // this.sharepointworkflowService.addAttachment(list).then(res =>{
        //   let output = res;
        //   alert(output);
        // })
      }, 1000);
      // setTimeout(() => {
      //   let list ={
      //     name: "CapexBudgetAttachment",
      //     id: 1,
      //     arrayBuffer:this.attachmentArrayBuffer
      //   };
      
      //   this.sharepointworkflowService.addAttachment(list).then(res =>{
      //     let output = res;
      //     alert(output);
      //   })
      // }, 2000);

      // this.file_request(file, () => { // creating array bytes
      //   file_request++;
      //   file.file_id = uuid();
      //   files.push(file);
      //   if (file_request === array.length) {
      //     if (files.length > 0) {
      //       let file_counter = 0;
      //       let uploaded_file_counter = 0;
      //       files.forEach((single_file, file_index, files_array) => {
      //         this.file_upload(single_file, (data) => {
      //           console.log('Return Data', data);
      //           // let res = JSON.parse(data);
      //           file_counter++;
      //           if (data && data[0].UniqueID) {
      //             uploaded_file_counter++;
      //             console.log((file_index + 1) + 'File Uploaded ..!!');
      //           } else {
      //             console.log('File Upload Failed ..!!', 'Error');
      //           }

      //           if (uploaded_file_counter === files_array.length) {
      //             // form.clear();
      //             console.log('All Files Uploaded Succesfully ..!!', 'Success');
      //             this.completed_fileupload();
      //           }
      //         });
      //       });
      //     }
      //   }
      // });

      // this.file_request(file, async () => { // creating array bytes
      //   file_request++;
      //   file.file_id = uuid();
      //   files.push(file);
      //   if (file_request === array.length) {
      //     if (files.length > 0) {
      //       console.log(files.length);
      //       let file_counter = 0;
      //       let uploaded_file_counter = 0;
      //       let a
      //       for (let k = 0; k < files.length; k++) {
      //         a = await this.file_upload(files[k], k, files.length);
      //       }
      //       console.log('BB',a);
      //     }
      //   }
      // });
    });
    if (imgFile.target.files && imgFile.target.files[0]) {
    //   this.fileAttr = '';
    //   Array.from(imgFile.target.files).forEach((file: File) => {
    //     this.fileAttr += file.name + ' - ';
    //   });

    //   // HTML5 FileReader API
    //   let reader = new FileReader();
    //   reader.onload = (e: any) => {
    //     let image = new Image();
    //     image.src = e.target.result;
    //     image.onload = rs => {
    //       let imgBase64Path = e.target.result;
    //     };
    //   };
    //   reader.readAsDataURL(imgFile.target.files[0]);
      
    //   // Reset if duplicate image uploaded again
    //   this.fileInput.nativeElement.value = "";
    // } else {
    //   this.fileAttr = 'Choose File';
     }
  }

  onBasicUpload(event) {}

  GetOutputVal(valFrmChild: any) {
    // if (this.uId == "") {
    //   this.createReqInfoFrmChild = valFrmChild;
    // }
    // else {
    //   this.emitedDataFrmChild = valFrmChild;
    // }

  }


}
