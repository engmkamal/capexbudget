// import { Component, OnInit } from '@angular/core';
// import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// import {FileUploader} from "ng2-file-upload";
// import {Observable} from "rxjs";
// import {HttpClient} from "@angular/common/http";
// import {
//   FileSelectDirective
// } from "ng2-file-upload";
// import { UploadFilesService } from '../upload-files.service';

// @Component({
//   selector: 'app-multipleattachmentsupload',
//    templateUrl: './multipleattachmentsupload.component.html',
//    styleUrls: ['./multipleattachmentsupload.component.scss']
// })
// export class MultipleattachmentsuploadComponent implements OnInit {

//   uploadForm: FormGroup;

//   public uploader:FileUploader = new FileUploader({
//     isHTML5: true
//   });
//   title: string = 'Angular File Upload';
//   constructor(private fb: FormBuilder, private http: HttpClient ) { }

//   uploadSubmit(){
//         for (let i = 0; i < this.uploader.queue.length; i++) {
//           let fileItem = this.uploader.queue[i]._file;
//           if(fileItem.size > 10000000){
//             alert("Each File should be less than 10 MB of size.");
//             return;
//           }
//         }
//         for (let j = 0; j < this.uploader.queue.length; j++) {
//           let data = new FormData();
//           let fileItem = this.uploader.queue[j]._file;
//           console.log(fileItem.name);
//           data.append('file', fileItem);
//           data.append('fileSeq', 'seq'+j);
//           data.append( 'dataType', this.uploadForm.controls.type.value);
//           getFileBuffer(data);
//           //this.uploadFile(data).subscribe(data => alert(data.message));
//         }
//         this.uploader.clearQueue();
//   }

//   uploadFile(data: FormData): Observable<any> {
//     //return this.http.post('http://localhost:8080/upload', data);
//     return this.http.post('https://file.io/upload', data);    
//   }

//   ngOnInit() {
//     this.uploadForm = this.fb.group({
//       document: [null, null],
//       type:  [null, Validators.compose([Validators.required])]
//     });
//   }

// }

// class Deferred<T> {

//   promise: Promise<T>;
//   resolve: (value?: T | PromiseLike<T>) => void;
//   reject:  (reason?: any) => void;

//   constructor() {
//     this.promise = new Promise<T>((resolve, reject) => {
//       this.resolve = resolve;
//       this.reject  = reject;
//     });
//   }
// }




// // function AddReceiptIntial(file, requestId) {
// //   var fileCategory = "";
// //   if(vm.status == "PickedBySAPDeveloper"){
// //       fileCategory = "ByDeveloper";
// //   }else if(vm.status == "DeveloperToRequestorForUAT"){
// //       fileCategory = "UATByRequestor";
// //   }else{
// //       fileCategory = "Submission";
// //   }
// //   var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + ITServiceRequestAttachmentList + "')/items";
// //   $http({
// //           headers: {
// //               "Accept": "application/json; odata=verbose",
// //               "Content-Type": "application/json; odata=verbose",
// //               "X-RequestDigest": $("#__REQUESTDIGEST").val()
// //           },
// //           method: "POST",
// //           url: url,
// //           async: true,
// //           data: {
// //               'Title': "ITSR-" + requestId.toString(),
// //               'ActionById': userId,
// //               'ActionDate': new Date().toLocaleString(),
// //               'Category': fileCategory,
// //               '__metadata': {
// //                   "type": "SP.Data.ITServiceRequestAttachmentListItem"
// //               },
// //           }
// //       })
// //       .then(saveSuccess)
// //       .catch(function(message) {
// //           $scope.insertLog(ITServiceRequestAttachmentList, message, "Fail");
// //       });

// //   function saveSuccess(data, status, headers, config) {
// //       var currentItemIdAttachmentId = data.data.d.ID;
// //       uploadFileSP(currentItemIdAttachmentId, file.name, file, ITServiceRequestAttachmentList);
// //   }
// // }

// // function uploadFileSP(id, fileName, file, listName) {
// //   var deferred = new Deferred();
// //   getFileBuffer(file).then(
// //       function(buffer) {
// //           var bytes = new Uint8Array(buffer);
// //           var content = new SP.Base64EncodedByteArray();
// //           var queryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items(" + id + ")/AttachmentFiles/add(FileName='" + fileName + "')";
// //           $.ajax({
// //               url: queryUrl,
// //               type: "POST",
// //               processData: false,
// //               async: false,
// //               contentType: "application/json;odata=verbose",
// //               data: buffer,
// //               headers: {
// //                   "accept": "application/json;odata=verbose",
// //                   "X-RequestDigest": $("#__REQUESTDIGEST").val(),
// //                   "content-length": buffer.byteLength
// //               },
// //               success: onAttachmentSucess,
// //               error: onAttachmentFailure
// //           });
// //       },
// //       function(err) {
// //           deferred.reject(err);
// //       });
// //   return deferred.promise();
// // }

// function onAttachmentFailure(error) {
//   alert("Attachment uploading Failure:" + error.status + "," + error.statusText);
// }

// function getFileBuffer(file) {
//   var deferred = new Deferred();
//   var reader = new FileReader();
//   reader.onload = function(e) {
//       deferred.resolve(e.target.result);
//   }
//   reader.onerror = function(e) {
//       deferred.reject(e.target.error);
//   }
//   reader.readAsArrayBuffer(file);
//   return deferred.promise;
// }
// //---------- attachment function end -----------------------------


import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-multipleattachmentsupload',
  templateUrl: './multipleattachmentsupload.component.html',
  styleUrls: ['./multipleattachmentsupload.component.scss']
})

export class MultipleattachmentsuploadComponent {

  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';


  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }

}