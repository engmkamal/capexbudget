// import { Injectable} from '@angular/core';
// import { webSocket } from 'rxjs/webSocket';
// import { environment } from '../../../environments/environment';
// import { Observable, timer, Subject, EMPTY } from 'rxjs';
// import { retryWhen, tap, delayWhen, switchAll, catchError } from 'rxjs/operators';
// import {io, Socket} from 'socket.io-client';
// export const WS_ENDPOINT = environment.wsEndpoint;
// export const RECONNECT_INTERVAL = environment.reconnectInterval;


// @Injectable({
//   providedIn: 'root'
// })
// export class WebsocketService{

//   socket: Socket;
//   readonly uri:string = "http://localhost:3000";

//   private socket$;
//   private messagesSubject$ = new Subject();
//   public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));

//   constructor() {
//     this.socket = io.connect(this.uri);
//   }

//   listen(eventName: string){
//     return new Observable((subscriber)=>{
//       this.socket.on(eventName, (data)=>{
//         subscriber.next(data);
//       })
//     })
//   }
  
//   emit(eventName:string, data:any){
//     this.socket.emit(eventName, data)
//   }

//   //===============================================================

//   // /**
//   //  * Creates a new WebSocket subject and send it to the messages subject
//   //  * @param cfg if true the observable will be retried.
//   //  */
//   // public connect(cfg: { reconnect: boolean } = { reconnect: false }): void {

//   //   if (!this.socket$ || this.socket$.closed) {
//   //     this.socket$ = this.getNewWebSocket();
//   //     const messages = this.socket$.pipe(cfg.reconnect ? this.reconnect : o => o,
//   //       tap({
//   //         error: error => console.log(error),
//   //       }), catchError(_ => EMPTY))
//   //     //toDO only next an observable if a new subscription was made double-check this
//   //     this.messagesSubject$.next(messages);
//   //   }
//   // }

//   // /**
//   //  * Retry a given observable by a time span
//   //  * @param observable the observable to be retried
//   //  */
//   // private reconnect(observable: Observable<any>): Observable<any> {
//   //   return observable.pipe(retryWhen(errors => errors.pipe(tap(val => console.log('[Data Service] Try to reconnect', val)),
//   //     delayWhen(_ => timer(RECONNECT_INTERVAL)))));
//   // }

//   // close() {
//   //   this.socket$.complete();
//   //   this.socket$ = undefined;
//   // }

//   // sendMessage(msg: any) {
//   //   this.socket$.next(msg);
//   // }

//   // /**
//   //  * Return a custom WebSocket subject which reconnects after failure
//   //  */
//   // private getNewWebSocket() {
//   //   return webSocket({
//   //     url: WS_ENDPOINT,
//   //     openObserver: {
//   //       next: () => {
//   //         console.log('[DataService]: connection ok');
//   //       }
//   //     },
//   //     closeObserver: {
//   //       next: () => {
//   //         console.log('[DataService]: connection closed');
//   //         this.socket$ = undefined;
//   //         this.connect({ reconnect: true });
//   //       }
//   //     },

//   //   });
//   // }

// }


// //=============================

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { io, Socket } from 'socket.io-client';

//==========suscribe webhooks ==========
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";

import { Subscriptions, ISubscriptions} from "@pnp/sp/subscriptions";
import "@pnp/sp/subscriptions/list";
//-------------------------

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  //private socket: Socket;
  private socket: any;
  private webAbsoluteUrl = window.location.origin;
  //private webAbsoluteUrl = 'https://localhost';
  private port = 3000;
  private url = this.webAbsoluteUrl +":"+ this.port; // your server local path

  private connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };
  //const ENDPOINT = "URL"; 
  

  constructor() {
    //this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});
  }

  listen(eventName: string){
    return new Observable((subscriber)=>{
      this.socket.on(eventName, (data)=>{
        subscriber.next(data);
      })
    })
  }
  
  emit(eventName:string, data:any, config:any){
    this.socket.emit(eventName, data, config)
  }

  // joinRoom(data): void {
  //   this.socket.emit('join', data);
  // }

  // sendMessage(data): void {
  //   this.socket.emit('message', data);
  // }

  // getMessage(): Observable<any> {
  //   return new Observable<{user: string, message: string}>(observer => {
  //     this.socket.on('new message', (data) => {
  //       observer.next(data);
  //     });

  //     return () => {
  //       this.socket.disconnect();
  //     }
  //   });
  // }

  // getStorage() {
  //   const storage: string = localStorage.getItem('chats');
  //   return storage ? JSON.parse(storage) : [];
  // }

  // setStorage(data) {
  //   localStorage.setItem('chats', JSON.stringify(data));
  // }


  
  private getConfigInfo(){
    const mySP = sp.configure({
      headers:{
        "Accept": "application/json; odata=verbose"
      }
    }, this.webAbsoluteUrl + "/leaveauto");
    //console.log("Returned config: "+ mySP);
    return mySP;
  };

  async subscribe(){
    

    // This is the URL which will be called by SharePoint when there is a change in the list
    const notificationUrl = "https://portaldv.bergerbd.com:3000/";

    // Set the expiry date to 180 days from now, which is the maximum allowed for the webhook expiry date.
    const expiryDate = "2021-11-14T18:00:00Z";

    // Adds a webhook to the Documents library
    
    //var res = 
    //await 
    this.getConfigInfo().web.lists.getByTitle("ReimburseMaster").subscriptions.add(notificationUrl,expiryDate)
    .then(res=>{
      console.log(JSON.stringify(res));
    });

    //console.log(JSON.stringify(res.data));
  }

}
