
//import { ListSubscriptionFactory, IListSubscription } from '@microsoft/sp-list-subscription';
import { Guid } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

export default class LatestDocumentsWebPart extends BaseClientSideWebPart<any> {
    //private _listSubscriptionFactory: ListSubscriptionFactory;
    private _listSubscription: any;

    // private createSPListSubscription(): void {
    //     const siteInfo = this.props.siteInfo;
      
    //     this.props.listSubscriptionFactory.createSubscription({
    //       siteId: siteInfo.itemsWebId != undefined ? Guid.parse(siteInfo.itemsSiteId) : undefined,
    //       webId: siteInfo.itemsWebId != undefined ? Guid.parse(siteInfo.itemsWebId) : undefined,
    //       listId: siteInfo.itemsWebId != undefined ? Guid.parse(siteInfo.itemsListId) : undefined,
    //       callbacks: {
    //         notification: this.onListUpdate.bind(this),
    //         connect: this.onListSubscriptionConnected.bind(this),
    //         disconnect: this.onListSubscriptionDisconnected.bind(this)
    //       }
    //     }).then(newSub => this._listSubscription = newSub);
    //   }
      
    //   private onListSubscriptionConnected(): void {
    //     console.log('subscription connected message');
    //     this.updateLocations();
    //   }
      
    //   private onListSubscriptionDisconnected(reason: string): void {
    //     console.log(`subscription disconnected message: ${reason}`);
    //   }
      
    //   private onListUpdate() {
    //     this.updateLocations();
    //   }

    // private createListSubscription(): void {
    //     this._listSubscriptionFactory = new ListSubscriptionFactory(this);
    //     this._listSubscription = this._listSubscriptionFactory.createSubscription({
    //         // listId: Guid.parse(this.properties.listId),
    //         // callbacks: {
    //         //     notification: this._loadDocuments.bind(this)
    //         // }
    //         domain: 'portaldv.bergerbd.com',
    //         siteId: Guid.parse('5679f4c0-7e79-4424-ae2b-a10cc192d6a7'),
    //         webId: Guid.parse('ea302fe9-9695-4c5e-9c5d-9a6c71dfcf01'),
    //         listId: Guid.parse('1c81ac25-d9fa-42f6-a3e8-8689f7e2971c'),
    //         callbacks: {
    //             notification: this._loadDocuments.bind(this),
    //             connect: this._subscriptionConnected.bind(this),
    //             disconnect: this._subscriptionDisconnected.bind(this)
    //         }
    //     });
    // }

        private _loadDocuments(): void {

        // load documents here
        console.log("something changed!");
    
      }
    
      private _subscriptionConnected(): void {
        // code to execute when the subscription to the list has been established
        console.log("the list has been established", this._listSubscription);
      }
    
      private _subscriptionDisconnected(reason: string): void {
        // code to execute when the connection to the list has been disconnected
        console.log("the connection to the list has been disconnected", this._listSubscription);
      }
    }