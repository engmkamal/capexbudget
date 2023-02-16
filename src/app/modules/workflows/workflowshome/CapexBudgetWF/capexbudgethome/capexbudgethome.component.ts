import { Component, OnInit, HostListener } from '@angular/core';
import { SharepointworkflowService } from 'src/app/shared/services/sharepointworkflow.service';
import { from } from "rxjs";
//import { testParametersMatrix, reportReleaseGroup } from '../data';
import { AlertService } from 'src/app/shared/alert/alert.service';
//import { CapexbudgetparentComponent } from '../capexbudgetparent/capexbudgetparent.component';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-capexbudgethome',
  templateUrl: './capexbudgethome.component.html',  
  styleUrls: [
    './capexbudgethome.component.scss',
    '../../../../../../assets/css/indigo-pink.css',
    '../../../../../../assets/css/ng-select.component.scss',
    '../../../../../../assets/css/material.theme.scss',
  ]
})
export class CapexbudgethomeComponent implements OnInit {

  currentAbsoluteUrl = window.location.href;
  Status = "";
  uId = "";
  readMode = "";
  logedUserAdId = null;
  _testParamNode = null;
  requestInfo: any = {};
  parsedTestParameters;
  testParameters = {};//should be omited
  reportReleaseGrp = {}; //should be omited
  childBtnClickAction = "";
  createReqInfoFrmChild;
  approvalLink;
  reviewLink;
  pendingApprovalListInfo;
  updatedMstrLstInfo;
  labResponsibles = [];
  labResponsiblesOpms = [];
  emitedDataFrmChild;
  auditLogComments = "";

  public listInfo = {
    name: "",
    select: "",
    expand: "",
    filterBy: "",
    filterWith: "",
    top: null
  };

  parsedRequestInfo = {
    uId: null,
    readMode: null,
    ID: null,
    Title: null,
    Status: null,
    RnDLabTest: null,
    PendingWith: null,
    RequestorAdId: null,
    CapexBudgetProposal: null
  };
  
  //webAbsoluteUrl = window.location.origin + "/leaveauto";
  webAbsoluteUrl = "https://portal.bergerbd.com/leaveauto";

  //==for alert==
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  //=========for customer feedback ===========
  rating:number = 3;
  starCount:number = 5;
  starColor = 'accent';

  allApprovers: any = {};
  approvers = [];

  dataFrmExcelUpload: any = [];
  
  //public DynamicComponent;

  // starColorP:StarRatingColor = StarRatingColor.primary;
  // starColorW:StarRatingColor = StarRatingColor.warn;

  // public feedback = {
  //   infoAvailabilityR : 3,
  //   serviceResponseR : 3,
  //   repClarificationR : 3,
  //   servReliabilityR : 3,
  //   presentationModeR : 3
  // }

  constructor(public sharepointworkflowService: SharepointworkflowService, public alertService: AlertService) {
    //=====Reading unique id from url -- start ==========
    if (this.currentAbsoluteUrl.indexOf('=') > -1) {
      let varCurrentUrlSplitArray = this.currentAbsoluteUrl.split('?');
      if (varCurrentUrlSplitArray.length >= 2) {
        let queryString = varCurrentUrlSplitArray[1];
        let parameters = queryString.split('&');
        for (let i = 0; i < parameters.length; i++) {
          let param = parameters[i];
          if (param.toLowerCase().indexOf('uniqueid=') > -1)
            this.uId = param.split('=')[1];
          else if (param.toLowerCase().indexOf('mode=') > -1)
            this.readMode = param.split('=')[1];
        }
      }
    }
    //------Reading unique id from url -- End-----
  }

  ngOnInit(): void {
    //this.DynamicComponent = CapexbudgetparentComponent;

    if (this.uId != "") {
      this.listInfo.name = "CapexBudgetMaster";
      this.listInfo.select = 'Status' + "," + 'RequestorEmpId' + "," + 'CapexBudgetProposal' + "," + 'GUID' + "," + 'Modified' + "," + 'Created' + "," + 'PendingWith/ID' + "," + 'PendingWith/Title' + "," + 'Author/ID' + "," + 'Author/Title' + "," + 'ID' + "," + 'Title';
      this.listInfo.expand = 'Author' + "," + 'PendingWith';
      this.listInfo.filterBy = 'GUID';
      this.listInfo.filterWith = this.uId;
      this.listInfo.top = '100000';

      this.sharepointworkflowService.getSPLoggedInUser().then((res) => {
        this.logedUserAdId = res;
        from(
          this.sharepointworkflowService.getItemWithAnyFilterExpand(this.listInfo, res)
        ).subscribe(
          (res) => {
            let userRnDSections = [];

            this.parsedRequestInfo = { 
              uId: this.uId,
              readMode: this.readMode,
              ID: res[0].ID,
              Title: res[0].Title,
              Status: res[0].Status,
              CapexBudgetProposal: JSON.parse(res[0].CapexBudgetProposal),
              PendingWith: res[0].PendingWith,
              RequestorAdId: res[0].Author.ID,
              RnDLabTest: JSON.parse(res[0].CapexBudgetProposal)
            }
            
            if (this.readMode == "read" || this.readMode == "print" || this.readMode == "feedback") {
              this.requestInfo = this.parsedRequestInfo;
            } 
            else if (res[0].Status == 'Submitted') {
              this.requestInfo = this.parsedRequestInfo;
            }
            else {
              //=== checking whether loged user is PendingWith person or not

              //if ((this.parsedRequestInfo.PendingWith.results).some(user => user.ID == this.logedUserAdId)) {

                if (res[0].Status == 'SubmittedToITInfra' || res[0].Status == 'SubmittedToCCAI' || res[0].Status == 'Submitted' || res[0].Status == 'PickedUp' || this.Status == 'PickedUp') {
                  // for (let t = 0; t < this.testParameters.length; t++) {
                  //   for (let r = 0; r < this.testParameters[t].Respectives.length; r++) {
                  //     if (this.testParameters[t].Respectives[r].RAdId == this.logedUserAdId) {
                  //       this._testParamNode = t;
                  //       userRnDSections.push(
                  //         { RnDSection: this.testParameters[t].RnDSection }
                  //       )
                  //     }
                  //   }
                  // }

                  this.parsedTestParameters = JSON.parse(res[0].RnDLabTest);

                  let labPersonnelData = this.parsedTestParameters.TestParameters.filter(x => userRnDSections.map(y => y.RnDSection).includes(x.Title.RnDSection));

                  let logedLabPersonnelData = labPersonnelData.filter(x => (x.Title.Respectives.some(y=>y.RAdId == this.logedUserAdId)));

                  this.requestInfo = {
                    uId: this.uId,
                    readMode: this.readMode,
                    Status: res[0].Status,
                    RnDLabTest: logedLabPersonnelData
                  };
                  this.Status = res[0].Status;
                  //this.Status = 'PartiallyReported';
                }

                else if (this.parsedRequestInfo.Status == 'PartiallyReported') {
                  //== filtering only the TestParameterStatus=="Submitted"
                  for (let t = 0; t < this.parsedRequestInfo.RnDLabTest.TestParameters.length; t++) {
                    if (this.parsedRequestInfo.RnDLabTest.TestParameters[t].TestParameterStatus == "Submitted") {
                      this._testParamNode = t; // get array index of this TestParameter
                      //=== maping the loged user's RnDLabTest 
                      // for (let t = 0; t < this.testParameters.length; t++) {
                      //   for (let r = 0; r < this.testParameters[t].Respectives.length; r++) {
                      //     if (this.testParameters[t].Respectives[r].RAdId == this.logedUserAdId) {

                      //       userRnDSections.push(
                      //         { RnDSection: this.testParameters[t].RnDSection }
                      //       )
                      //     }
                      //   }
                      // }
                    }

                    this.parsedTestParameters = JSON.parse(res[0].RnDLabTest);
                    let labPersonnelData = this.parsedTestParameters.TestParameters.filter(x => userRnDSections.map(y => y.RnDSection).includes(x.Title.RnDSection))

                    this.requestInfo = {
                      uId: this.uId,
                      readMode: this.readMode,
                      Status: res[0].Status,
                      RnDLabTest: labPersonnelData
                    };
                    this.Status = res[0].Status;
                  }
                }
                else if (this.parsedRequestInfo.Status == 'Reported' || this.Status == 'Completed') {

                  this.requestInfo = this.parsedRequestInfo;


                  this.Status = this.parsedRequestInfo.Status;
                  //console.log('PartiallySubmitted');
                }
              // } else {
              //   alert("Unaothorized access: this application is neither applied by you nor pending with you!!");
              //   setTimeout(function () {                  
              //     window.location.href = "https://portal.bergerbd.com/leaveauto/SitePages/MyWFRequest.aspx";
              //     //window.location.href = this.webAbsoluteUrl + "/SitePages/MyWFRequest.aspx";
              //   }, 4000);
              // }

            }

          },
          (err) => {
            console.log(err)
          },
        );
      });
    } else {
      this.sharepointworkflowService.getSPLoggedInUser().then((res) => {
        this.logedUserAdId = res;
        this.requestInfo = {
          uId: "",
          readMode: "",
          Status: "",
          logedUserAdId: this.logedUserAdId,
          //GridInfo: 
        };
      });
    }
  }

  executeAfterViewInit(){
    this.allApprovers = 
      {
        // headITInfraName: "Mostafa Kamal",
        // headITInfraEmail: "kamal@bergerbd.com",
        // headITInfraAdId: 1026,
        // headITInfraEmpId: "",
        // headIAssetName: "Mostafa Kamal",
        // headAssetEmail: "kamal@bergerbd.com",
        // headAssetAdId: 1026,
        // headAssetEmpId: "",

        headITInfraName: "Shoab Mahmood Al Naoshad",
        headITInfraEmail: "shoaib@bergerbd.com",
        headITInfraAdId: 21,
        headITInfraEmpId: "",
        headIAssetName: "Mahbubur Rahman",
        headAssetEmail: "mrahman@bergerbd.com",
        headAssetAdId: 129,
        headAssetEmpId: ""
    }
  }

  ngAfterViewInit() { 
    this.executeAfterViewInit();
    //this.alertService.error('Error :(', this.options)
  }


  // //================= working with screen size starts ==============
  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   if (event.target.innerWidth < 768) {
  //     //implement logic
  //   } else {
  //     //implement logic
  //   }
  // }

  // isBiggerScreen() {
  //   const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  //   if (width < 768) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  // //------------ working with screen size ends --------------------------

  GetOutputVal(valFrmChild: any) {
    if (this.uId == "") {
      this.createReqInfoFrmChild = valFrmChild;
    }
    else {
      this.emitedDataFrmChild = valFrmChild;
    }

  }

  GetGridData(valFrmChild: any) {
    if (this.uId == "") {
      this.createReqInfoFrmChild = valFrmChild;
    }
    else {
      this.emitedDataFrmChild = valFrmChild;
    }

  }

  async createAttachment(attachmentInfo, file) {

    // await this.sharepointworkflowService.saveListItem(auditLogListInfo).then(
    //   (res) => {})

    return new Promise((resolve, reject)=>{
      try{
          this.sharepointworkflowService.saveListItem(attachmentInfo).then((res) =>{ 
              let fileList ={
                name: "CapexBudgetAttachment",
                id: res.ID,
                arrayBuffer: file.arrayBuffer,
                attachmentName: file.name
              }

              this.sharepointworkflowService.addAttachment(fileList).then(res =>{
                resolve(res.ID);
              }) 
                              
            },    
            (err) => {
                reject('Attachment Add failed !');
                console.log(err)
            },
          ); 
      } 
      catch(err){
        reject('Retrieve data failed !');
        console.log("Error: " + err);
      }
    })
  }

  createNotification(templet?, to?, requestor?, pending?, title?, status?) {
    if (this.uId != "") {
      this.reviewLink = 'https://portal.bergerbd.com/leaveauto/SitePages/capexbudget.aspx/wf/capexbudget?UniqueId=' + this.uId + "&mode=read";
      this.approvalLink = 'https://portal.bergerbd.com/leaveauto/SitePages/capexbudget.aspx/wf/capexbudget?UniqueId=' + this.uId;
      //this.reviewLink = this.webAbsoluteUrl + '/SitePages/SampleTest.aspx?UniqueId=' + this.uId + "&mode=read";
      //this.approvalLink = this.webAbsoluteUrl + '/SitePages/SampleTest.aspx?UniqueId=' + this.uId;
    }

    let emailFldData;

    switch (templet) {
      case "Notification": {
        emailFldData = {
          Status: "Submitted",
          ToId: { results: [to] },
          CCId: { results: [] },
          ReviewLink: this.reviewLink,
          ApprovalLink: "",
          Title: "Request for 'Capex Budget' workflow with ref# " + title + " has been initiated",
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Mr./Ms. ${requestor},</b><br/>
                Request for &quot;Capex Budget&quot; workflow has been initiated. Any review or update will be available in the requestor&#39;s My Process of Berger Portal.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: ${status},<br/>
                Pending with: ${pending},
              </p>              
            </div>
          `,
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p>IT Department,<br/>Berger Paints Bangladesh Limited,<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
        }
        break;
      }
      case "Approval": {
        let dept= "";
        let office = "";
        if(this.uId == ""){
          dept = this.createReqInfoFrmChild.Requestor.Department;
          office = this.createReqInfoFrmChild.Requestor.OfficeLocation;
        }else{
          dept = this.parsedRequestInfo.CapexBudgetProposal.Requestor.Department;
          office = this.parsedRequestInfo.CapexBudgetProposal.Requestor.OfficeLocation;
        }

        emailFldData = {
          ToId: { results: [to] },
          CCId: { results: [] },
          //ReviewLink: this.reviewLink,
          ApprovalLink: this.approvalLink,
          Status: "Submitted",
          Title: "Request for 'Capex Budget' workflow with ref# " + title + " is waiting for your approval",
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Concern,</b><br/>
                Request for &quot;Capex Budget&quot; workflow is waiting for your approval. Please process to continue either from Pending Approval of Berger Portal or from the process link below.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: ${status},<br/>
                Department:${dept},<br/>
                Office Location: ${office},
              </p>              
            </div>
          `,
        }
        break;
      }
      case "Completed": {
        emailFldData = {
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          Title: "Request for 'Capex Budget' workflow with ref# " + title + " has been processed",
          ToId: {
            results: [to]
          },
          CCId: {
            results: []
          },          
          ReviewLink: this.reviewLink,
          ApprovalLink: this.approvalLink,
          Status: "Completed",
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p><b>IT Department,<br/>Berger Paints Bangladesh Limited,<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Concern,</b><br/>
                Request for &quot;Capex Budget&quot; workflow has been processed. It can be viewed either from My Process of Berger Portal or from the review link below.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: "Completed",
              </p>              
            </div>
          `,
        }
        break;
      }  
      case "Rejected": {
        emailFldData = {
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          Title: "Request for 'Capex Budget' workflow with ref# " + title + " has been rejected",
          ToId: {
            results: [to]
          },
          CCId: {
            results: []
          },          
          ReviewLink: this.reviewLink,
          ApprovalLink: this.approvalLink,
          Status: "Rejected",
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p>IT Department,<br/>Berger Paints Bangladesh Limited,<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Concern,</b><br/>
                Request for &quot;Capex Budget&quot; workflow has been rejected. Please follow the comments provided in the comments field in approval history section or contact with approver if required.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: "Rejected",
              </p>              
            </div>
          `,
        }
        break;
      } 
      case "Change": {
        emailFldData = {
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          Title: "Change Request for 'Capex Budget' workflow with ref# " + title + " is being waiting for your action.",
          ToId: {
            results: [to]
          },
          CCId: {
            results: []
          },          
          ReviewLink: this.reviewLink,
          ApprovalLink: this.approvalLink,
          Status: status,
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p><b>IT Department,</b><br/>Berger Paints Bangladesh Limited,<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Concern,</b><br/>
                Change Request for &quot;Capex Budget&quot; workflow is being waiting for your action. Please follow the comments provided in the comments field in approval history section or contact with approver in this regard.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: ${status},
              </p>              
            </div>
          `,
        }
        break;
      } 
      case "PickedUp": {
        emailFldData = {
          ToId: { results: [to] },
          CCId: { results: [] },
          ReviewLink: this.reviewLink,
          ApprovalLink: this.approvalLink,
          Status: "Submitted",
          Title: "Acknowledgement of Sample received for 'Capex Budget' workflow with ref# " + title + ".",
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p><b>Thanks & Regards,</b><br/>IT Department,<br/>Berger Paints Bangladesh Limited,<br/>Email: info@bergerbd.com<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Concern,</b><br/>
                Sample has been received for &quot;Capex Budget&quot; workflow and is being picked up by respective lab personnel for testing.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: "Sample Received",<br/>
              </p>              
            </div>
          `,
        }
        break;
      }   
      case "FeedbackSubmitted": {
        emailFldData = {
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          Title: "Request for 'Capex Budget' workflow with ref# " + title + " has been processed",
          ToId: {
            results: [to]
          },
          CCId: {
            results: []
          },          
          ReviewLink: this.reviewLink,
          ApprovalLink: this.approvalLink,
          Status: "FeedbackSubmitted",
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p><b>Thanks & Regards,</b><br/>IT Department,<br/>Berger Paints Bangladesh Limited,<br/>Email: info@bergerbd.com<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Concern,</b><br/>
                Customer feedback of &quot;Capex Budget&quot; WF has been submitted. It can be viewed from admin dashboard Feedback link.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: "Feedback Submitted",<br/>
              </p>
              <p>For Customer Feedback: <a href="https://portal.bergerbd.com/leaveauto/SitePages/CapexBudget.aspx/?UniqueId=${this.uId}&mode=feedback"><b>click here</b></a></p>              
            </div>
          `,
        }
        break;
      }
      case "OpmNotification": {
        emailFldData = {
          Status: "Submitted",
          ToId: { results: [to] },
          CCId: { results: [] },
          ReviewLink: this.reviewLink,
          ApprovalLink: this.approvalLink,
          Title: "Request for 'Capex Budget' workflow with ref# " + title + " has been initiated",
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Concern,</b><br/>
                Request for &quot;Capex Budget&quot; workflow has been initiated to your team. Lab respectives can find it in their Pending Approval option of SharePoint Portal or from provided link in their email and can Pick up to process this task.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: ${status},<br/>
                Pending with: Lab respectives,
              </p>              
            </div>
          `,
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p><b>Thanks & Regards,</b><br/>IT Department,<br/>Berger Paints Bangladesh Limited,<br/>Email: info@bergerbd.com<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
        }
        break;
      }
      default: {
        alert("Action is undefined for this type of click event !!");
        break;
      }
    }

    let notificationlListInfo = {
      name: "NotificationList",
      item: emailFldData
    };

    this.sharepointworkflowService.saveListItem(notificationlListInfo)
      .then(
        (res) => {
          console.log('res');
        })
  }

  async saveInNotificationList(title?: string, comments?: string) {
    if (this.uId == "") {
      let req = this.pendingApprovalListInfo.item;
      //==========sending notification ===
      this.createNotification("Notification", this.logedUserAdId, req.RequestedByName, "", req.Title, req.Status);
           
      this.approvers.forEach(apvr => { 
        let apvrName = "";     
        if(apvr == 21){
          apvrName = "Shoab Mahmood Al Naoshad";
        }else if (apvr == 129){
          apvrName = "Mahbubur Rahman";
        }else{
          apvrName = "";
        }
        this.createNotification("Approval", apvr, req.RequestedByName, apvrName, req.Title, req.Status);
      });
      
      setTimeout(function () {
        let rpage = 'https://portal.bergerbd.com/leaveauto/SitePages/MyWFRequest.aspx';
        //let rpage = this.webAbsoluteUrl + '/SitePages/MyWFRequest.aspx';

        window.location.href = "https://portal.bergerbd.com/PortalResources/Home.aspx";
        //window.location.href = this.webAbsoluteUrl + "/SitePages/MyWFRequest.aspx";
      }, 4000);
    } else {
      let req = this.pendingApprovalListInfo.item;
      let reqBy = "";
      let reqRef = "";
      let reqStat = "";
      let reqPending = "";

      if(this.parsedRequestInfo.CapexBudgetProposal.Requestor.EmployeeName != ""){
        reqBy = this.parsedRequestInfo.CapexBudgetProposal.Requestor.EmployeeName;
      }
      if(this.parsedRequestInfo.Title != ""){
        reqRef = this.parsedRequestInfo.Title;
      }
      if(this.updatedMstrLstInfo.item.Status != ""){
        reqStat = this.updatedMstrLstInfo.item.Status;
      }

      switch (this.childBtnClickAction) {
        

        case "Approved": {
          if(this.updatedMstrLstInfo.item.PendingWithId.results[0]){
            if(this.updatedMstrLstInfo.item.PendingWithId.results[0] != 0 || this.updatedMstrLstInfo.item.PendingWithId.results[0] != null){
              this.createNotification("Approval", this.updatedMstrLstInfo.item.PendingWithId.results[0], reqBy, "", reqRef, reqStat);
            }            
          }
        
          setTimeout(function () {
            window.location.href = 'https://portal.bergerbd.com/_layouts/15/PendingApproval/PendingApproval.aspx';            
          }, 4000);

          break;
        }
        case "Completed": {
          if(this.parsedRequestInfo.CapexBudgetProposal.Requestor.AdId != 0 || this.parsedRequestInfo.CapexBudgetProposal.Requestor.AdId != null){
            this.createNotification("Completed", this.parsedRequestInfo.CapexBudgetProposal.Requestor.AdId, reqBy, "", reqRef, "Completed");
          }
          
          setTimeout(function () {
            window.location.href = 'https://portal.bergerbd.com/_layouts/15/PendingApproval/PendingApproval.aspx';
            //window.location.href = this.webAbsoluteUrl + '/SitePages/MyWFRequest.aspx';
          }, 4000);

          break;
        }
        case "Reject": {
          if(this.parsedRequestInfo.CapexBudgetProposal.Requestor.AdId != 0 || this.parsedRequestInfo.CapexBudgetProposal.Requestor.AdId != null){
            this.createNotification("Rejected", this.parsedRequestInfo.CapexBudgetProposal.Requestor.AdId, reqBy, "", reqRef, "Rejected");
          }
          
          setTimeout(function () {
            window.location.href = 'https://portal.bergerbd.com/_layouts/15/PendingApproval/PendingApproval.aspx';
            //window.location.href = this.webAbsoluteUrl + '/SitePages/MyWFRequest.aspx';
          }, 4000);

          break;
        }
        case "Change": {
          if(this.parsedRequestInfo.CapexBudgetProposal.Requestor.AdId != 0 || this.parsedRequestInfo.CapexBudgetProposal.Requestor.AdId != null){
            this.createNotification("Change", this.parsedRequestInfo.CapexBudgetProposal.Requestor.AdId, reqBy, reqBy, reqRef, reqStat);
          }
          
          setTimeout(function () {
            window.location.href = 'https://portal.bergerbd.com/_layouts/15/PendingApproval/PendingApproval.aspx';
            //window.location.href = this.webAbsoluteUrl + '/SitePages/MyWFRequest.aspx';
          }, 4000);

          break;
        }
        case "ReSubmit": {
          if(this.updatedMstrLstInfo.item.PendingWithId.results[0]){
            if(this.updatedMstrLstInfo.item.PendingWithId.results[0] != 0 || this.updatedMstrLstInfo.item.PendingWithId.results[0] != null){
              this.createNotification("Approval", this.updatedMstrLstInfo.item.PendingWithId.results[0], reqBy, "", reqRef, reqStat);
            }            
          }
        
          setTimeout(function () {
            window.location.href = 'https://portal.bergerbd.com/_layouts/15/PendingApproval/PendingApproval.aspx';            
          }, 4000);

          break;
        }        
        case "FeedbackSubmit": {
          this.createNotification("FeedbackSubmitted", 255, this.parsedRequestInfo.CapexBudgetProposal.Requestor.AdId, "", this.parsedRequestInfo.Title, "FeedbackSubmitted");

          setTimeout(function () {
            window.location.href = 'https://portal.bergerbd.com/_layouts/15/PendingApproval/PendingApproval.aspx';
            //window.location.href = this.webAbsoluteUrl + '/SitePages/MyWFRequest.aspx';
          }, 4000);

          break;
        }
        case "PickedUp": {
          this.createNotification("PickedUp", this.parsedRequestInfo.RequestorAdId, this.parsedRequestInfo.RnDLabTest.Requestor.EmployeeName, "Lab personnel", this.parsedRequestInfo.Title, "PickedUp");

          setTimeout(function () {
            window.location.href = 'https://portal.bergerbd.com/_layouts/15/PendingApproval/PendingApproval.aspx';
            //window.location.href = this.webAbsoluteUrl + '/SitePages/MyWFRequest.aspx';
          }, 4000);

          break;
        }
      }
    }
  }


  async createAuditLog(title: string, comments?: string) {
    let comment = (comments == undefined) ? "" : comments;
    let auditLogData = {
      Title: title,
      ActionDate: new Date().toLocaleString(),
      ActionBy: this.createReqInfoFrmChild.Requestor.EmployeeName,
      Comments: comment
    }
    let auditLogListInfo = {
      name: "CapexBudgetAuditLog",
      item: auditLogData
    }
    await this.sharepointworkflowService.saveListItem(auditLogListInfo).then(
      (res) => {})
  }

  async createReqTitle(updatedMstrLstInfo) {
    await this.sharepointworkflowService.updateListItem(updatedMstrLstInfo).then(
      (res) => {
        this.sharepointworkflowService.saveListItem(this.pendingApprovalListInfo)
          .then(
            (res) => {
              this.createAuditLog(this.pendingApprovalListInfo.item.Title);
            })
          .then(res => {
            this.saveInNotificationList();
          })
          .then(res =>{
            for(let a=0; a < this.createReqInfoFrmChild.Attachments.length; a++){
              let file = this.createReqInfoFrmChild.Attachments[a];
              let attachmentItem = {
                Title: "CBR-" + this.updatedMstrLstInfo.rId,
                //Name: "CapexBudget",
                //attachedBy: this.createReqInfoFrmChild.Requestor.EmployeeName,
                ActionById: this.logedUserAdId,
                ActionDate: new Date().toLocaleString(),
                // Category: fileCategory,
                // '__metadata': {
                //     "type": "SP.Data.ITServiceRequestAttachmentListItem"
                // },
              };

              let attachmentListInfo = {
                name: "CapexBudgetAttachment",
                item: attachmentItem
              };

              this.createAttachment(attachmentListInfo, file);
            }
          })
      });
  }

  //========= update application having uId===
  async updateRequest(data) {
    await this.sharepointworkflowService.updateListItem(data)
      .then(
        (res) => {
          this.updateInPendingApvrList(this.pendingApprovalListInfo)
        })
      .then(res => {
        this.createAuditLog(this.parsedRequestInfo.Title, this.auditLogComments);
      })
      .then(res => {
        this.saveInNotificationList();
      }).then(res => {
        if(this.emitedDataFrmChild.Attachments.length > 0){
          for(let a=0; a < this.emitedDataFrmChild.Attachments.length; a++){
            let file = this.emitedDataFrmChild.Attachments[a];
            let attachmentItem = {
              Title: "CBR-" + this.updatedMstrLstInfo.rId,
              //Name: "CapexBudget",
              //attachedBy: this.createReqInfoFrmChild.Requestor.EmployeeName,
              ActionById: this.logedUserAdId,
              ActionDate: new Date().toLocaleString(),
              // Category: fileCategory,
              // '__metadata': {
              //     "type": "SP.Data.ITServiceRequestAttachmentListItem"
              // },
            };
  
            let attachmentListInfo = {
              name: "CapexBudgetAttachment",
              item: attachmentItem
            };
  
            this.createAttachment(attachmentListInfo, file);
          }
        }

      });
  }

  async getBtnClickAction(valFrmChild: any) {
    
    this.childBtnClickAction = valFrmChild;
    let _status = '';
    let _pendingWith = [];
    let _updatedMstrListData;
    let _itemData;

    switch (this.childBtnClickAction) {
      case "Submitted": {
        //==== validate whether requestor info is exist or not===
        if(this.createReqInfoFrmChild.Requestor.EmployeeName == null
          || this.createReqInfoFrmChild.Requestor.EmployeeId == null
          || this.createReqInfoFrmChild.Requestor.Email == null){
            alert("Requestor info is not found. Please try again later.");
            return false;
          }
        //---- validate whether requestor info is exist or not ends ----       

        this.createReqInfoFrmChild.Requestor.AdId = this.logedUserAdId;
        this.createReqInfoFrmChild.Requestor.RequestDate = new Date().toString().substring(4, 15);

        //let approvalLink = "";

        //let approvers=[];

        let allItems = this.createReqInfoFrmChild.Datagridcrudhomeitems;
        _status = "SubmittedToITInfra";

        for(let i = 0; i< allItems.length; i++){
          if(this.createReqInfoFrmChild.Datagridcrudhomeitems[i]['ClassCode'] == 3200 || this.createReqInfoFrmChild.Datagridcrudhomeitems[i]['ClassCode'] == 6300){
            this.approvers=[];
            this.approvers.push(this.allApprovers.headITInfraAdId);
            _status = "SubmittedToITInfra";
            i = this.createReqInfoFrmChild.Datagridcrudhomeitems.length;
          }else{
            this.approvers=[];
            this.approvers.push(this.allApprovers.headAssetAdId);
            _status = "SubmittedToCCAI";
          }
        }

        // if(approvers.length == 0){
        //   approvers.push(this.allApprovers.headAssetAdId)
        // }  
        
        //====get approval history===
        // let actionComments = this.createReqInfoFrmChild.Comments.Comment;
        // let actionlog = {
        //   Date: new Date(),
        //   ActionBy: this.createReqInfoFrmChild.Requestor.EmployeeName,
        //   //ActionById: this.logedUserAdId,
        //   Comments: actionComments
        // }
        // this.createReqInfoFrmChild.ApprovalHistory.push(actionlog);
        //-------------------
        
        let infoWithAll = Object.assign({}, this.createReqInfoFrmChild);
        infoWithAll.Attachments = [];

        let itemData = {
          Status: _status,
          //CapexBudgetProposal: JSON.stringify(infoWithAll),
          PendingWithId: {
            'results': this.approvers
          },
        }
        let listInfo ={
          name: "CapexBudgetMaster",
          item: itemData
        }

        let actionBy = this.createReqInfoFrmChild.Requestor.EmployeeName;
        //====== 1.  save Masterlist ======
        await this.sharepointworkflowService.saveListItem(listInfo)
          .then(
            (res) => {
              this.reviewLink = 'https://portal.bergerbd.com/leaveauto/SitePages/capexbudget.aspx/wf/capexbudget?UniqueId=' + res.GUID + "&mode=read";
              this.approvalLink = 'https://portal.bergerbd.com/leaveauto/SitePages/capexbudget.aspx/wf/capexbudget?UniqueId=' + res.GUID ;
              
              //====get approval history===
              let actionComments = this.createReqInfoFrmChild.Comments.Comment;
              let actionlog = {
                Data: new Date(),
                Status: listInfo.item.Status,
                ActionBy: actionBy,
                //ActionById: this.logedUserAdId,
                Comments: actionComments
              }              
              //-------------------

              infoWithAll.ApprovalHistory.push(actionlog);

              let itemData = {
                Title: "CBR-" + res.ID,
                CapexBudgetProposal: JSON.stringify(infoWithAll),
                ApprovalLink: this.approvalLink 
                // PendingWithId: {
                //   'results': this.labResponsibles
                // },
              }
              this.updatedMstrLstInfo = {
                name: "CapexBudgetMaster",
                rId: res.ID,
                item: itemData
              }

              
              let pendingApprovalItemData = {
                Title: "CBR-" + res.ID,
                ProcessName: "CapexBudget",
                RequestedByName: this.createReqInfoFrmChild.Requestor.EmployeeName,
                Status: "SubmittedToITInfra",
                EmployeeID: this.createReqInfoFrmChild.Requestor.EmployeeId,
                RequestedByEmail: this.createReqInfoFrmChild.Requestor.Email,
                PendingWithId: {
                  'results': this.approvers
                },
                RequestLink: this.approvalLink
              };

              this.pendingApprovalListInfo = {
                name: "PendingApproval",
                item: pendingApprovalItemData
              };
            }
          ).then(res => {
            this.createReqTitle(this.updatedMstrLstInfo);

            // for(let a=0; a<this.createReqInfoFrmChild.Attachments.length; a++){
            //   let file = this.createReqInfoFrmChild.Attachments[a];
            //   let attachmentItem = {
            //     Title: "CBR-" + this.updatedMstrLstInfo.rId,
            //     ActionById: this.logedUserAdId,
            //     ActionDate: new Date().toLocaleString()
            //   };

            //   let attachmentListInfo = {
            //     name: "CapexBudgetAttachment",
            //     item: attachmentItem
            //   };

            //   this.createAttachment(attachmentListInfo, file);
            // }
          });
      }
      case "Approved": {
        _pendingWith = [this.emitedDataFrmChild.PendingWith[0]];
        _status = this.emitedDataFrmChild.Status;
        this.approvers = _pendingWith;

        // //====get approval history===
        // let actionComments = this.emitedDataFrmChild.Comments.Comment;
        // let actionlog = {
        //   Date: new Date(),
        //   ActionBy: "Mostafa Kamal",
        //   Status: _status,
        //   //ActionById: this.logedUserAdId,
        //   Comments: actionComments
        // }
        // this.emitedDataFrmChild.CapexBudgetProposal.ApprovalHistory.push(actionlog);
        // //-------------------

        _updatedMstrListData = {
          CapexBudgetProposal: JSON.stringify(this.emitedDataFrmChild.CapexBudgetProposal),
          PendingWithId: {
            'results': _pendingWith
          },
          Status: _status
        };

        this.updatedMstrLstInfo = {
          name: "CapexBudgetMaster",
          rId: this.parsedRequestInfo.ID,
          item: _updatedMstrListData
        }

        this.pendingApprovalListInfo = _updatedMstrListData;

        //-----------sample received comments -----
        //this.auditLogComments = "Report has been released";

        //=========calling function to update data ======
        this.updateRequest(this.updatedMstrLstInfo);

        //=====Email notification =======
        //this.createNotification("Completed", 1026, "Mostafa Kamal", "Mostafa Kamal", "ST-50", "Submitted");

        break;
      }
      case "Completed": {
        _pendingWith = [];
        _status = "Completed";
        this.approvers = _pendingWith;

        _updatedMstrListData = {
          RnDLabTest: JSON.stringify(this.emitedDataFrmChild.RnDLabTest),
          PendingWithId: {
            'results': _pendingWith
          },
          Status: _status
        };

        this.updatedMstrLstInfo = {
          name: "RnDLabTestMaster",
          rId: this.parsedRequestInfo.ID,
          item: _updatedMstrListData
        }

        this.pendingApprovalListInfo = _updatedMstrListData;

        //-----------comments -----
        this.auditLogComments = this.emitedDataFrmChild.Comments.Comment;

        //=========calling function to update data ======
        this.updateRequest(this.updatedMstrLstInfo);

        //=====Email notification =======
        //this.createNotification("Completed", 1026, "Mostafa Kamal", "Mostafa Kamal", "ST-50", "Submitted");

        break;
      }
      case "Change": {
        _pendingWith = [this.emitedDataFrmChild.PendingWith[0].AdId];
        _status = this.emitedDataFrmChild.Status;

        _updatedMstrListData = {
          CapexBudgetProposal: JSON.stringify(this.emitedDataFrmChild.CapexBudgetProposal),
          PendingWithId: {
            'results': _pendingWith
          },
          Status: _status
        };

        this.updatedMstrLstInfo = {
          name: "CapexBudgetMaster",
          rId: this.parsedRequestInfo.ID,
          item: _updatedMstrListData
        }

        this.pendingApprovalListInfo = _updatedMstrListData;

        //-----------comments -----
        this.auditLogComments = this.emitedDataFrmChild.Comments.Comment;

        //=========calling function to update data ======
        this.updateRequest(this.updatedMstrLstInfo);

        //=====Email notification =======
        //this.createNotification("Completed", 1026, "Mostafa Kamal", "Mostafa Kamal", "ST-50", "Submitted");

        break;
      }
      case "Reject": {
        _pendingWith = [];
        _status = this.emitedDataFrmChild.Status;

        _updatedMstrListData = {
          CapexBudgetProposal: JSON.stringify(this.emitedDataFrmChild.CapexBudgetProposal),
          PendingWithId: {
            'results': _pendingWith
          },
          Status: _status
        };

        this.updatedMstrLstInfo = {
          name: "CapexBudgetMaster",
          rId: this.parsedRequestInfo.ID,
          item: _updatedMstrListData
        }

        this.pendingApprovalListInfo = _updatedMstrListData;

        //-----------sample received comments -----
        //this.auditLogComments = "Report has been released";

        //=========calling function to update data ======
        this.updateRequest(this.updatedMstrLstInfo);

        //=====Email notification =======
        //this.createNotification("Completed", 1026, "Mostafa Kamal", "Mostafa Kamal", "ST-50", "Submitted");

        break;
      }
      case "ReSubmit": {
        _pendingWith = [this.emitedDataFrmChild.PendingWith[0].AdId];
        _status = this.emitedDataFrmChild.Status;

        _updatedMstrListData = {
          CapexBudgetProposal: JSON.stringify(this.emitedDataFrmChild.CapexBudgetProposal),
          PendingWithId: {
            'results': _pendingWith
          },
          Status: _status
        };

        this.updatedMstrLstInfo = {
          name: "CapexBudgetMaster",
          rId: this.parsedRequestInfo.ID,
          item: _updatedMstrListData
        }

        this.pendingApprovalListInfo = _updatedMstrListData;

        //=========calling function to update data ======
        this.updateRequest(this.updatedMstrLstInfo);

        break;
      }
      case "FeedbackSubmit": {
        _pendingWith = [];
        _status = "FeedbackSubmitted";

        _itemData = {
          RnDLabTest: JSON.stringify(this.parsedRequestInfo.RnDLabTest),          
          Status: _status
        }

        

        _updatedMstrListData = {
          RnDLabTest: JSON.stringify(this.emitedDataFrmChild.RnDLabTest),
          PendingWithId: {
            'results': _pendingWith
          },
          Status: _status
        };

        this.updatedMstrLstInfo = {
          name: "RnDLabTestMaster",
          rId: this.parsedRequestInfo.ID,
          item: _updatedMstrListData
        }

        this.pendingApprovalListInfo = _updatedMstrListData;

        //-----------sample received comments -----
        this.auditLogComments = "Feedback has been submitted.";

        //=========calling function to update data ======
        this.updateRequest(this.updatedMstrLstInfo);
        //alert("Action is undefined for this feedback type of click event !!");
        break;
      }
      default: {
        alert("Action is undefined for this type of click event !!");
        break;
      }
      
    }
  }

  updateInPendingApvrList(itemData) {
    let pendApvrLstInfo = {
      PendingWithId: itemData.PendingWithId,
      Status: itemData.Status
    };

    this.listInfo.name = "PendingApproval";
    this.listInfo.select = 'ID' + "," + 'Title';
    this.listInfo.expand = 'Author' + "," + 'PendingWith';
    this.listInfo.filterBy = 'Title';
    this.listInfo.filterWith = this.parsedRequestInfo.Title;
    this.listInfo.top = '1';

    from(
      this.sharepointworkflowService.getFilteredItemsWithoutExpand(this.listInfo)
    ).subscribe(
      (res) => {
        let lstInfo = {
          name: "PendingApproval",
          rId: res[0].ID,
          item: pendApvrLstInfo
        }
        
        this.sharepointworkflowService.updateListItem(lstInfo);
      }
    )
  }

  //=============for customer feedback =========
  onRatingChanged(rating){
    this.emitedDataFrmChild = rating;
    //console.log(rating);
    //this.feedback = rating;
    //this.rating = rating;
  }

  //=============get employee info===============
  async getEmpInfo(empADId){
    //===== for portaldv and or portal =====
    this.listInfo.name = "BergerEmployeeInformation";
    this.listInfo.select = 'Company'+","+'EmployeeId'+","+'EmployeeName'+","+'OfficeLocation'+","+'Designation'+","+'Department'+","+'CostCenter'+","+'Email/ID'+","+'Email/EMail'+","+'OptManagerEmail/ID'+","+'OptManagerEmail/Title'+","+'OptManagerEmail'+","+'Mobile';
    this.listInfo.expand = 'Email'+","+'OptManagerEmail';
    this.listInfo.filterBy = 'Email/ID';
    this.listInfo.top = '100000';

    let requestorsInfoData ={};
    
    await from(
        this.sharepointworkflowService.getItemsWithFilterExpand(this.listInfo, empADId)
        ).subscribe(
          (res) =>{ 
                
                requestorsInfoData ={
                  EmployeeName: res[0].EmployeeName,
                  Company: res[0].Company,
                  EmployeeId: res[0].EmployeeId,
                  OfficeLocation: res[0].OfficeLocation,
                  Designation: res[0].Designation,
                  Department: res[0].Department,
                  Email: res[0].Email.EMail,
                  CostCenter: res[0].CostCenter,
                  Mobile: res[0].Mobile,
                  OpmEmail: res[0].OptManagerEmail,
                  OpmADId: res[0].OptManagerEmail.ID,
                  OpmName: res[0].OptManagerEmail.Title,
                  RequestDate: new Date().toString().substring(4, 15)
                };
            
          },    
          (err) => {
              console.log(err)
          },
        );
        
        return requestorsInfoData;
   
  }

  excelDataLoadedInChild(valFrmChild: any) {
    if (this.uId == "") {
      this.dataFrmExcelUpload = valFrmChild;
    }
    else {
      this.dataFrmExcelUpload = valFrmChild;
    }

  }

}

