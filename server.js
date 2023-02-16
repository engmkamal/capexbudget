// const RestProxy = require('sp-rest-proxy');  
// const settings = {  
//     port: 8080, // Local server port  
// };  
// const restProxy = new RestProxy(settings);  
// restProxy.serve(); 

// var express = require('express');
// var socket = require('socket.io');



// //====App setup =======
// var app = express();
// // var server = app.listen(3000, function(){
// //     console.log("listening for request on port 3000");
// // })

// const port = 3000;
// const http = require('http');
// const server = http.createServer(app);
// const cors = require('cors');

// //====socket set up========
// // var io = require('socket.io')(server, {
// //     cors: {
// //         origin: '*'
// //     }
// // });

// const {Server} = require('socket.io');

// const io = new Server(server);

// //listen for new connection and print a message in console
// io.on('connection', (socket) => {
//     alert("An user connected");
//     console.log(`New connection ${socket.id}`);
    
//     socket.on('chat', function(data){
//         io.sockets.emit('chat', data);
//     });

//     socket.on('typing', function(data){
//         io.sockets.emit('tying', data);
//     });

//     socket.broadcast.emit('test event', 'Here is your data');
//     socket.emit('test event', 'Here is your data');
// })

// server.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

// //==========as per youtube: Angular Socket.IO Tutorial=========

// let app = require('express')();
// let http = require('http').Server(app);
// var io = require('socket.io')(http);

// //listen for new connection and print a message in console
// io.on('connection', (socket) => {
//     //=log whenever a user connects ===
//     console.log('New user connected');
    
//     //=log whenever a user disconnects ===
//     socket.on('disconnect', function(){
//         console.log('User disconnected');
//     });
    
//     socket.emit('test event', 'Here is your data')
// });

// http.listen(3000, ()=>{
//     console.log('started on port 3000');
// })

//=================================

// const express = require('express');
// const path = require('path');
// const http = require('http');
// const socketIO = require('socket.io');

// const app = express();
// const port = 3000;

// app.use(express.static(path.join(__dirname, 'dist/dashboard')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/dashboard/index.html'));
// });

// const server = http.createServer(app);

// const io = socketIO(server);

// let numberOfOnlineUsers = 0;

// // WebSocket handler
// io.on('connection', (socket) => {
//     numberOfOnlineUsers++;
//     io.emit('numberOfOnlineUsers', numberOfOnlineUsers);

//     console.log('New user connected');

//     socket.on('disconnect', () => {
//         numberOfOnlineUsers--;
//         io.emit('numberOfOnlineUsers', numberOfOnlineUsers);
//         console.log('User disconnected');
//     });
// });


// server.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });



// var app = express();

// app.use(cors({credentials: false, origin: true}));

// // The application will have it's routes on /api
// app.use("/api", routes);
// app.use(express.static(path.join(__dirname, 'dist/dashboard')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/dashboard/index.html'));
// });

// var port = 3000;

// app.listen(port, () => {
//     console.log('server online on port', port);
// });

// var server = require('http').Server(app);
// var io = require('socket.io')(server, { origins: ['http://localhost:3000'] });
// // io.origins(['http://localhost:4200']);

// // WebSocket handler
// io.on('connection', (socket)=> {
//     console.log('WEB SOCKET CONNECTION');
//     socket.emit('news', { hello: 'world' });
//     socket.on('my other event', (data)=> {
//         console.log(data);
//     });
// });

// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


//==========================================================

//===============open SSL start=============
// const node_openssl = require('node-openssl-cert');


// var options = {
// 	binpath: 'C:/Program Files/OpenVPN/bin/openssl.exe'
// }

// const openssl = new node_openssl(options);

// // openssl.generateRSAPrivateKey({}, function(err, key, cmd) {
// // 	console.log(cmd);
// // 	console.log(key);
// // });

// var rsakeyoptions = {
// 	encryption: {
// 		password: 'test',
// 		cipher: 'des3'
// 	},
// 	rsa_keygen_bits: 2048,
// 	rsa_keygen_pubexp: 65537,
// 	format: 'PKCS8'
// }

// var csroptions = {
// 	hash: 'sha512',
// 	subject: {
// 		countryName: 'US',
// 		stateOrProvinceName: 'Louisiana',
// 		localityName: 'Slidell',
// 		postalCode: '70458',
// 		streetAddress: '1001 Gause Blvd.',
// 		organizationName: 'SMH',
// 		organizationalUnitName: 'IT',
// 		commonName: [
// 			'portal.bergerbd.com/',
//             'portaldv.bergerbd.com/',
//             'portaldv2.bergerbd.com/',
// 			'https://portal.bergerbd.com/',
//             'https://portaldv.bergerbd.com/',
//             'https://portaldv2.bergerbd.com/',
//             'http://localhost:4200/'
// 		],
// 		emailAddress: 'engmkbd@gmail.com'
// 	},
// 	extensions: {
// 		basicConstraints: {
// 			critical: true,
// 			CA: true,
// 			pathlen: 1
// 		},
// 		keyUsage: {
// 			//critical: false,
// 			usages: [
// 				'digitalSignature',
// 				'keyEncipherment'
// 			]
// 		},
// 		extendedKeyUsage: {
// 			critical: true,
// 			usages: [
// 				'serverAuth',
// 				'clientAuth'
// 			]	
// 		},
// 		SANs: {
// 			DNS: [
// 				'portal.bergerbd.com/',
//                 'portaldv.bergerbd.com/',
//                 'portaldv2.bergerbd.com/',
// 				'https://portal.bergerbd.com/',
//                 'https://portaldv.bergerbd.com/',
//                 'https://portaldv2.bergerbd.com/',
//                 'https://localhost:4200/',
//                 'http://localhost:4200/'
// 			]
// 		}
// 	}
// }

// var selfSignCSROptions = {
// 	days: 7300
// }

// openssl.generateRSAPrivateKey(rsakeyoptions, function(err, key, cmd) {
// 	console.log(cmd);
// 	console.log(key);
// 	openssl.generateCSR(csroptions, key, 'test', function(err, csr, cmd) {
// 		if(err) {
// 			console.log(err);
// 		} else {
// 			console.log(cmd.command);
// 			console.log(csr);
// 			console.log(cmd.files.config);
// 		}
//         openssl.selfSignCSR(csr, selfSignCSROptions, key, 'test', function(err, csr, cmd) {
//             if(err) {
//                 console.log(err);
//             } else {
//                 console.log(cmd.command);
//                 console.log(csr);
//                 console.log(cmd.files.config);
//             }
                
//         });
			
// 	});

    
// });


//---------open SSl ends-------------

// //=============================implementation with http and Express start ==============================
// let express = require('express');
// let app = express();

// let https = require('https');
// let server = https.Server(app);

// let socketIO = require('socket.io');

// //====socket set up========

// let io = socketIO(server, {    
//     cors: {
//         credentials: false,
//         origin: '*',

//         //origin: true,
//         //origin: "https://testappsocket.azurewebsites.net",
//         //origins: ['http://localhost:3000'],

//         methods: ["GET", "POST"]
//     },
//     transports: ['websocket']
// });




// const path = require('path');
// const fs = require('fs');

// const port = 443;
// //const port = 3000;

// let titleFrmUri = "";

// //======to import view start==========
// // const path = require('path');
// // app.use(express.static(path.join(__dirname, 'dist/dashboard')));

// // app.get('*', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'dist/dashboard/index.html'));
// // });
// //---------- import view ends -----------------

// //==========reading the w and or dashboard from uri ============
// //app.get('https://portal.bergerbd.com/home.aspx/db/:title', (req, res)=>{
//                             // titleFrmUri =  app.get('http://localhost:4200/db/:title', (req, res)=>{  
//                             //     titleFrmUri = res.params.title; 
//                             //     console.log(`Workflow name is: ${titleFrmUri}`);         
                                
//                             // })
// //-- reading uri ends ------------

// let obj = {
//     name: "wf1",
//     sta: "db"
// }


// let numberOfOnlineUsers = 0;

// let f1 = function(){
//     return 2+3;
// };

// let fetch = require('node-fetch');
// //import fetch from './node_modules/node-fetch';

// //====retrieving data=====
// let allBusinessProcessData = {
//     EmployeeReimbursement: {masterData: {}, detailData: {}, auditLogData: {}, attachments: {}, applicationViewData: {}}
// }
// //--------ger data function start ----------

// let url = "https://api.wheretheiss.at/v1/satellites";
// //let url = "http://api.wheretheiss.at/v1/satellites/25544";
// //let url = "https://portal.bergerbd.com/leaveauto/_api/web/lists/getByTitle('ReimburseMaster')/items?&$top=2&$select=ID,Title,RequestFor,PendingWith/ID,PendingWith/Title,Status,ItemName,Entitlement,GLCode,CostCenter,TotalReimbursementAmount,Teritory&$expand=PendingWith/ID";

// let getDataFromDBByServer = async function(url) {
//     const response = await fetch(`${url}`
//     // , {
//     //   method: 'GET',
//     //   mode: 'cors',
//     //   cache: 'no-cache',
//     //   headers: {
//     //     Referer: url,
//     //     "accept": "application/xml; application/json; text/plain; */*; odata=verbose",
//     //     "accept-language": "en-US,en;q=0.9,es;q=0.8",
//     //     "content-type": "application/json;charset=UTF-8"
//     //   },
//     //   redirect: 'follow',
//     //   referrerPolicy: 'no-referrer',
//     //   body: null
//     //}
//     ).then(response => {
//         // if (response.ok) {
//         //     allBusinessProcessData.EmployeeReimbursement.masterData = response.length; 
//         //     console.log("response ok");          
//         // }
//         if (response.ok) {
//             console.log("response ok")
//             response.json()
//             .then((data) => {
//               allBusinessProcessData.EmployeeReimbursement.masterData = data.length;
//               //allBusinessProcessData.EmployeeReimbursement.masterData = data; 
//               //res.json(data)
//               //response = json(data);
//             })
//         }
//         else {
//           //res.sendStatus(response.status);
//           console.log('Data fetching unsuccessfull !!!')
//         }
//       })
//       .catch(error => {
//           console.log(error)
//           alert(error.message)
//       })
    
//     return response;
// }

// //--------get data ends -----------





// //let url = "http://api.wheretheiss.at/v1/satellites/25544";
// //getData(url);
    
// //const callExApiUsingHttp = 
// //async (callback)=>{
//                                     // http.get(url, (res)=>{
//                                     //     let data = '';
                                        
//                                     //         res.on('data', (chunk)=>{
//                                     //             data += chunk;
//                                     //         });
                                            
//                                     //         res.on('end', (data)=>{
//                                     //             //allData.EmployeeReimbursement = JSON.stringify(data);
//                                     //             console.log('Successfull !!!' + data);
//                                     //             //console.log(JSON.stringify(data));
//                                     //             //return callback(data);
//                                     //         });
                                            
//                                     //     }).on('err', (err)=>{
//                                     //         console.log('Error: '+ err.message);
//                                     //     })
// //}


         
//         //  (async () => {
//         //     try {
//         //         //let data =
//         //         await fetch(url)
//         //         .then(response => {
//         //             if(response.ok){
//         //                 response.json("response")
//         //             }else{
//         //                 console.log('unsuccesfull to fetch data')
//         //             }
//         //         })
//         //         .then(data=>{
//         //             allData.EmployeeReimbursement = data;
//         //             // data.send(data[0].length);
//         //             // io.emit('chat12', data[0].length);
//         //             console.log(JSON.stringify(allData))});
//         //         //return data;
//         //     } catch(error) {
//         //         spinner.fail(error);
//         //     }
//         //  })();
// //------  get data ends------

// function getBusinessProcessData(){
//     getDataFromDBByServer(url);
//     return JSON.stringify(allBusinessProcessData.EmployeeReimbursement.masterData);
// }


// io.on('connection', (socket) => {
//     // app.get('http://localhost:4200/db/:title', (req, res)=>{  
//     //     titleFrmUri = res.params.title; 
//     //     console.log('Connected Workflow name is: ' +titleFrmUri);         
        
//     // })

//    //getData(url);

   

// //    callExApiUsingHttp.callApi(function(response){
// //        console.log(response);
// //         // res.write(response);
// //         // res.end();
// //     });

   


//     // let directors = fetch(url).then(response => response.json()).then(function (res) {
//     //     return res.json();
//     //   });
//     // allData.EmployeeReimbursement = directors;
//     // console.log(directors);



//     console.log("Newly connected id: " + socket.id);

//     socket.on('disconnect', () => {
//         numberOfOnlineUsers--;
//         io.emit('numberOfOnlineUsers', numberOfOnlineUsers);
//         console.log('An user disconnected');
//     });


    
//     numberOfOnlineUsers++;
//     io.emit('numberOfOnlineUsers', numberOfOnlineUsers);

//     console.log('New user connected ie WEB SOCKET CONNECTION established');

    

//     socket.on('chat1', (data) => {
//         io.emit('chat11', JSON.stringify(obj));
//     });

//     socket.on('join', (data) => {
//         socket.join(data.room);
//         socket.broadcast.to(data.room).emit('user joined');
//     });

//     socket.on('message', (data) => {
//         io.in(data.room).emit('new message', {user: data.user, message: data.message});
//     });

//     //socket.broadcast.emit('test event', 'Here is your data');
    
//     socket.emit('WorkshopProposal', 'WorkshopProposal');
//     socket.emit('PoolCarRequisition', 'PoolCarRequisition');
//     socket.emit('EmployeePaintDiscount', 'EmployeePaintDiscount');
//     socket.emit('HRServices', 'HRServices');
//     socket.emit('EmployeeOffBoardingProcess', 'EmployeeOffBoardingProcess');
//     socket.emit('TravelRequest', 'TravelRequest');
//     socket.emit('MobileHandsetRequests', 'MobileHandsetRequests');
//     socket.emit('ManpowerRequisition', 'ManpowerRequisition');
//     socket.emit('AssetPurchaseRequest', 'AssetPurchaseRequest');
//     socket.emit('SupplementaryBudgetRequest', 'SupplementaryBudgetRequest');
//     socket.emit('EmployeeAdvanceRequest', 'EmployeeAdvanceRequest');
//     socket.emit('SecurityIncidence', 'SecurityIncidence');
//     socket.emit('VendorComplaint', 'VendorComplaint');
//     socket.emit('BOECheckPaymentProcess', 'BOECheckPaymentProcess');

//     //socket.emit('detectProcessName', titleFrmUri);
    
    
//     socket.emit('EmployeeReimbursement', getBusinessProcessData());
// });

// const sslServer = https.createServer(
// 	{
// 		key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
// 		cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
//         passphrase: 'test'
// 	},
// 	app
// )

// sslServer.listen(443, ()=>console.log('Server running on port 443'))    

// // server.listen(port, () => {
// //     console.log(`started on port: ${port}`);
// // });

//------------------------ implementation with http & express ends --------------------


//===========================implementation with https and express start=================

import cors from 'cors';
//const cors = require('cors')
import fs from 'fs';
import path from 'path';
let __dirname = path.resolve();
import express from 'express';
const app = express();

import homeRoute from './server/routes/home.js';
//import processRoute from './server/routes/process.js';

import http from 'http';
import https from 'https';

//Enable CORS: CORS header middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const serverHttp = http.createServer(app);

const serverHttps = https.createServer(
	{
		key: fs.readFileSync(path.join(__dirname, 'cert', 'bergerbdKey.pem'), 'utf8'),
		cert: fs.readFileSync(path.join(__dirname, 'cert', 'bergerbd-cert.pem'), 'utf8'),
        //key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem'), 'utf8'),
		//cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'), 'utf8'),
        passphrase: 'test'
	},
	app
)

const portHttp = 8000;
const portHttps = 3000;

serverHttp.listen(portHttp, () => console.log(`Server http running on port ${portHttp}`));

serverHttps.listen(portHttps, () => console.log(`Server https running on port ${portHttps}`));



//import getDataByHttpsApi from './testServices/httpsApi';
let getDataByHttpsApi = function() {
    let bpblurl = "https://portal.bergerbd.com/leaveauto/_api/web/lists/getByTitle('ReimburseMaster')/items?&$top=2&$select=ID,Title,RequestFor,PendingWith/ID,PendingWith/Title,Status,ItemName,Entitlement,GLCode,CostCenter,TotalReimbursementAmount,Teritory&$expand=PendingWith/ID";
    console.log("getDataByHttpsApi called " );
    https.get(bpblurl, (res)=>{
        //res.header('Content-Type', 'text/html');
        let data = '';
            console.log("Status code: " + res.status );
            res.on('data', (chunk)=>{
                //console.log(chunk);
                data += chunk;
            });
            
            res.on('end', ()=>{
                //allBusinessProcessData.EmployeeReimbursement.masterData = JSON.stringify(data);
                //allBusinessProcessData.EmployeeReimbursement.masterData = data.length;
                //console.log('Data fetching Successfull with https !!!' + data);
                console.log(data);
                //return callback(data);
            });
            
        })
        // .on(error => {
        //     console.log("Error on getDataByHttpsApi: " + error)
        //     //alert(error.message)
        // })
}

//module.exports.callApi = getDataByHttpsApi;

///////====================axios works for all but not work for berger portal-- 401-Unautorized =========================
import axios from'axios';

let axiosGetData = ()=>{

    let bpblUri = "https://portal.bergerbd.com/leaveauto/_api/web/lists/getByTitle('ReimburseMaster')/items?&$top=2&$select=ID,Title,RequestFor,PendingWith/ID,PendingWith/Title,Status,ItemName,Entitlement,GLCode,CostCenter,TotalReimbursementAmount,Teritory&$expand=PendingWith/ID";
    let uturl = "https://api.wheretheiss.at/v1/satellites/25544";

    axios.get(bpblUri)
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });

}
//-------------------axios ends ------------------

//==========pnp ============

import { sp, SPRest } from "@pnp/sp";



let pppnnnppp = function(){
    let webAbsoluteUrl = "https://portal.bergerbd.com/leaveauto"; //uncomment for localhost //PendingApproval

    let getConfigInfo =()=>{
        const mySP = SPRest.configure({
            headers:{
                "Accept": "application/json; odata=verbose"
            }
            }, this.webAbsoluteUrl);
        //console.log("Returned config: "+ mySP);
        return mySP;
    }; 


    // use odata operators for more efficient queries
    getConfigInfo.web.lists.getByTitle("ReimburseMaster").items.select("Title", "ID").top(5).orderBy("Modified", true).get().then((items) => {
        console.log(items);
    });
}

app.use(cors());
app.use(express.json());



let allBusinessProcessData = { 
    'EmployeeReimbursement': {'ReimburseMaster': { 'recent': [{"Title":"ReimbursementID-9314","ID":9314,"GUID":"654a11b8-3eae-4f79-8128-1aa872426ea8","Modified":"2021-08-05T09:38:48Z","Created":"2021-08-05T09:38:48Z","Status":"Submitted","PendingWith":{"ID":116,"Title":"Golam Mohammad Moinuddin"},"Author":{"ID":735,"Title":"Md Mostafizar Rahman","Office":"Dhaka Factory (1000)","JobTitle":"Officer Production"},"EmployeeId":"1107","Entitlement":"At Actual","GLCode":"null","CostCenter":"10001918","TotalReimbursementAmount":1792,"ItemName":"Miscellaneous Reimbursement"},{"Title":"ReimbursementID-9313","ID":9313,"GUID":"3c4a3bc4-6563-4cce-8622-250278c538e9","Modified":"2021-08-05T06:10:19Z","Created":"2021-08-05T05:35:37Z","Status":"SubmittedToPayIncharge","PendingWith":{"ID":79,"Title":"Muhammed Akhter Hossain"},"Author":{"ID":147,"Title":"Md Mosharraf Hossain","Office":"Chittagong Sales (4200)","JobTitle":"Manager VAT, Customs & Branch Operations"},"EmployeeId":"256","Entitlement":"At Actual","GLCode":"7300030","CostCenter":"40105081","TotalReimbursementAmount":2500,"ItemName":"Car Maintenance Reimbursement"}], 
                                               back : "Back of 500 Items"}, 
                            ReimburseDetails: {}, 
                            auditLogData: {}, 
                            attachments: {}, 
                            applicationViewData: {}
                        }
}



app.use(express.static(path.join(__dirname, 'dist/dashboard')));

// # uses the clientside app-routing module #
// app.get('*', (req, res, next)=>{
//     res.sendFile(path.join(__dirname, '/dist/dashboard/index.html'));
    
//     //res.send("Running from server.js");
// })

function subscribeReimburseMaster2(){
    console.log("Subscription function starts....");
    let url = "https://portaldv.bergerbd.com/leaveauto/_api/web/lists('1c81ac25-d9fa-42f6-a3e8-8689f7e2971c')/items";
    
	let data = {
        "Title": "ReimbursementID-3348",
		'__metadata': {
			"type": "SP.Data.ReimburseMasterListItem"
		},
    }
    let options = {
        url: url,
        method: "POST",
        headers: {
			"Accept": "application/json; odata=verbose",
			"Content-Type": "application/json; odata=verbose",
			//"X-RequestDigest": $("#__REQUESTDIGEST").val()
        }            
    };
    
    let req = https.request(options, (res)=>{
        let body ='';
        console.log("Status Code: "+ res.statusCode)
        
        res.on('data', (chunk)=>{
            body+= data;
        })
        
        res.on('end', ()=>{
            //console.log("Body: "+ body)
        })
    })
    
    req.write(data);
    req.end();


    // let url = "https://portaldv.bergerbd.com/leaveauto/_api/web/lists('1c81ac25-d9fa-42f6-a3e8-8689f7e2971c')/subscriptions";
    // let data = {
    //     "resources": "https://portaldv.bergerbd.com/leaveauto/_api/web/lists('1c81ac25-d9fa-42f6-a3e8-8689f7e2971c')", 
    //     "notificationUrl": "https://portaldv.bergerbd.com:3000/",
    //     "expirationDateTime": "2021-11-14T18:00:00Z"
    // }
    // let options = {
    //     url: url,
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json'           
    //     }            
    // };
    
    // let req = serverHttps.request(options, (res)=>{
    //     let body ='';
    //     console.log("Status Code: "+ res.statusCode)
        
    //     res.on('data', (chunk)=>{
    //         body+= data;
    //     })
        
    //     res.on('end', ()=>{
    //         console.log("Body: "+ body)
    //     })
    // })
    
    // req.write(data);
    // req.end();
}

app.get('/home.aspx/db/EmployeeReimbursement', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '/dist/dashboard/postReq.html'));    
})

app.post("https://portaldv.bergerbd.com/leaveauto/_api/web/lists('1c81ac25-d9fa-42f6-a3e8-8689f7e2971c')/subscriptions", (req, res, next)=>{
        
    res.redirect('/home.aspx/db/EmployeeReimbursement/post');    
})

app.get('/home.aspx/db/EmployeeReimbursement/post', (req, res, next)=>{
    subscribeReimburseMaster2();
    console.log("Post request is working"); 
    //res.end('Post request is working\n');  
    res.end(JSON.stringify(req)); 
})

// app.use('', homeRoute);

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/dist/dashboard/index.html'));
//     //res.send("Welcome to our home page");
// });

app.post('*', (req, res, next)=>{
    console.log("Post request is working");
    //res.sendFile(path.join(__dirname, '/dist/dashboard/index.html'));
    
    //res.send("Running from server.js");
})




//====socket.io set up========
import * as io from 'socket.io';
const socketIO = new io.Server();

socketIO.attach(serverHttp, { 
    'auth': {
        'user': 'spdbuser',
        'pass': 'Bpbl2019',
        'sendImmediately': false
    },    
    cors: {
        credentials: false,
        origin: false,
        //origin: '*',
        //origin: "https://testappsocket.azurewebsites.net",
        //origins: ['http://localhost:4200', 'https://portal.bergerbd.com/', 'https://portaldv.bergerbd.com/'],

        methods: ["GET", "POST", "PUT"]
    },
    transports: ['websocket']
});

socketIO.attach(serverHttps, { 
    'auth': {
        'user': 'spdbuser',
        'pass': 'Bpbl2019',
        'sendImmediately': false
    },    
    cors: {
        credentials: false,
        origin: false,
        //origin: '*',
        //origin: "https://testappsocket.azurewebsites.net",
        //origins: ['http://localhost:4200', 'https://portal.bergerbd.com/', 'https://portaldv.bergerbd.com/'],

        methods: ["GET", "POST", "PUT"]
    },
    transports: ['websocket']
});
//-------------socket.io set up ends ---------

//===============start writing in local file =========== 100% working
let writeBPData = function(data, fileName){
    

    //let bpLocalStorFolder = path.join(__dirname, './businessprocesslocaldata/');
    let bpLocalStorFolder = path.join(__dirname, './src/assets/businessprocesslocaldata/');

    //===========write as an txt ===

    return new Promise((resolve, reject)=>{
        if(fs.existsSync(__dirname)){
            fs.writeFile(bpLocalStorFolder + fileName, JSON.stringify(data), {encoding: 'utf8'}, (err)=>{
                if(err){
                    resolve("File update unsuccess !!")
                }else{
                    resolve("File update success !!")
                }
                
            })

            console.log("File is updating ...");
            
            //fs.writeFileSync(bpLocalStorFolder + fileName, JSON.stringify(data), {encoding: 'utf8'})         
            
            // .then(res =>{
            //     console.log("File written success !!");
            //     resolve("File written success !!");
            // })
            // .catch(function(error) {
            //     // File read error or JSON SyntaxError
            //     console.error('An error occurred while updating: ', error);
            // })
            // .finally(function() {
            //     console.log("File written success anyway!!");
            //     resolve("File written success anyway!!");
            // });            
        }
        else{
            console.log("Dir path not found !");
            resolve("File written unsuccess as file path is not found!!");
            
        }

        
    })
    
}
//--------------- start writing in local file =========== 100% working ---------------


let titleFrmUri = "";

//======to import view start==========
// const path = require('path');
// app.use(express.static(path.join(__dirname, 'dist/dashboard')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/dashboard/index.html'));
// });
//---------- import view ends -----------------

//==========reading the w and or dashboard from uri ============
//app.get('https://portal.bergerbd.com/home.aspx/db/:title', (req, res)=>{
                            // titleFrmUri =  app.get('http://localhost:4200/db/:title', (req, res)=>{  
                            //     titleFrmUri = res.params.title; 
                            //     console.log(`Workflow name is: ${titleFrmUri}`);         
                                
                            // })
//-- reading uri ends ------------

let obj = {
    name: "wf1",
    sta: "db"
}




let f1 = function(){
    return 2+3;
};

import fetch from 'node-fetch';
//import fetch from './node_modules/node-fetch';

//====retrieving data=====

//--------ger data function start ----------

//let url = "https://api.wheretheiss.at/v1/satellites";
//let url = "http://api.wheretheiss.at/v1/satellites/25544";
let curl = "https://portal.bergerbd.com/leaveauto/_api/web/lists/getByTitle('ReimburseMaster')/items?&$top=2&$select=ID,Title,RequestFor,PendingWith/ID,PendingWith/Title,Status,ItemName,Entitlement,GLCode,CostCenter,TotalReimbursementAmount,Teritory&$expand=PendingWith/ID";



//-----------------------------

//================ aut with pnp auth =============
let authNdFetchData = ()=>{
    const {bootstrap} = require('pnp-auth');
    const {sp, Web } = require('@pnp/sp-commonjs');
    const {spauth } = require('node-sp-auth');


    // bootstrap(sp, spauth, "https://portal.bergerbd.com/leaveauto");
    // // That's it! Now you can use pnp-sp library:

    // let spWebGet = sp.web.get("https://portal.bergerbd.com/leaveauto/_api/web/lists/getByTitle('ReimburseMaster')/items?&$top=2&$select=ID,Title,RequestFor,PendingWith/ID,PendingWith/Title,Status,ItemName,Entitlement,GLCode,CostCenter,TotalReimbursementAmount,Teritory&$expand=PendingWith/ID").then(res=>{
    //     console.log("1st worked" + res);
    // });

    let web = Web("https://portal.bergerbd.com/leaveauto");
    web.get().then(()=>{
        console.log("2nd worked" + spWebGet);
    })
}

//-------------------------------------


//========== sp-pnp-js service ====================
//import pnp from "sp-pnp-js";
import { from, observable, Observable, of, Subject, pipe } from 'rxjs';
//import fetch from 'node-fetch';
import xml2js from 'xml2js'; //parseString

let getSpPnpData = async (config)=>{
    let list = {
        name: 'ReimburseMaster',
        query: 'ID,Title,RequestFor'
    }

    let promise = new Promise((resolve, reject)=>{
       
        config.getByTitle(list.name) 
          .items.select(list.query )
          //.expand('Author') 
          //.expand('PendingWith', 'Author')             
          //.filter("Author/ID eq '"+Number(userADId)+"'")          
          .orderBy('Created', false)
          .top(2)   
          .get()
          .catch((rej)=>{
            console.log("Rejection mgs from getSpPnpData() : " +rej.message);
          })
        .then(res=>{
            resolve(JSON.stringify(res));
            console.log(JSON.stringify(res))})

        })
        .catch((rej)=>{
            reject(rej.message);
            console.log("Rejection mgs from getSpPnpData() : " +rej.message);
        })
    return promise;
    
// if (!globalThis.fetch) {
// 	globalThis.fetch = fetch;
// }



// const response = await fetch("https://portal.bergerbd.com/leaveauto/_api/web/lists/getByTitle('ReimburseMaster')/items?&$top=2&$select=ID,Title,RequestFor,PendingWith/ID,PendingWith/Title,Status,ItemName,Entitlement,GLCode,CostCenter,TotalReimbursementAmount,Teritory&$expand=PendingWith/ID", 
// options);
// const data = await response.json();
// console.log(data);




    // let promise = new Promise((resolve, reject)=>{
       
    //     pnp.sp.web.get("https://portal.bergerbd.com/leaveauto/_api/web/lists/getByTitle('ReimburseMaster')/items?&$top=2&$select=ID,Title,RequestFor,PendingWith/ID,PendingWith/Title,Status,ItemName,Entitlement,GLCode,CostCenter,TotalReimbursementAmount,Teritory&$expand=PendingWith/ID", options)
    //     .then(res=>{
    //         resolve(JSON.stringify(res));
    //         console.log(JSON.stringify(res))})

    //     })
    //     .catch((rej)=>{
    //         reject(rej.message);
    //         console.log("Rejection mgs from getSpPnpData() : " +rej.message);
    //     })
    // return promise;

    
    // //const webAbsoluteUrl = window.location.origin + "/leaveauto";
    // const webAbsoluteUrl = "https://portal.bergerbd.com/leaveauto"; //uncomment for localhost //PendingApproval

    // let getConfigInfo = ()=>{
    //     const mySP = pnp.sp.configure({
    //         headers:{
    //         "Accept": "application/json",
    //         // "Content-Type": "application/json;odata=verbose;charset=utf-8",
    //         // "X-ClientService-ClientTag": "PnPCoreJS:3.0.10",
    //         // "User-Agent": "NONISV|SharePointPnP|PnPCoreJS/3.0.10"
    //         }
    //     }, webAbsoluteUrl);
    //     console.log("Returned config: "+ JSON.stringify(mySP));
    //     return mySP;
    // };

    
    // let data;
    //  data = 
    //  await getConfigInfo().web
    //       .lists.getByTitle(list.name) 
    //       .items.select(list.query )
    //       //.expand('Author') 
    //       //.expand('PendingWith', 'Author')             
    //       //.filter("Author/ID eq '"+Number(userADId)+"'")          
    //       .orderBy('Created', false)
    //       .top(2)   
    //       .get()
    //       .catch((rej)=>{
    //         console.log("Rejection mgs from getSpPnpData() : " +rej.message);
    //       })          
     
    //       //console.log("Fetched data by getLoggedUsersWFMasterListItems: "+ JSON.stringify(data));
    // return data;
}




//---------------------
let getStoredData = async (url)=>{
    if(allBusinessProcessData.EmployeeReimbursement.masterData != ""){
        return allBusinessProcessData.EmployeeReimbursement.masterData;
    }
    else{
        let recentData = await getDataFromDBByServerWithHttps(url);
        //let recentData2 = await getDataFromDBByServer(url);
        
        return recentData;
    }
}

//================below function is working with only json api============
import {getAuth} from 'node-sp-auth';  
import requestprom from 'request-promise';  
import { Title } from '@angular/platform-browser';
//import { reject, resolve } from 'p-cancelable';
// Site and User Creds  
var spServerUrl = 'https://portal.bergerbd.com/leaveauto';  


let credentialOptions = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    passphrase: 'test',
    username: "spdbuser",
    password: "Bpbl2019$",
    online: true    
}


let getSPDataFromDBByServerWithHttp = async function(req, res) {
    // Log
    console.log("Connecting to SPO");
    //const auth = await Promise.resolve(getAuth(siteUrl, this.context));
    // Connect to SPO
    var urlsp = "https://portal.bergerbd.com/leaveauto";
    getAuth(urlsp, {
        username: "spdbuser",
        password: "Bpbl2019$",
        domain: 'portaldv.bergerbd.com',
        //online: true,
        headers:{
            "Accept": "application/xml; odata=verbose"
        }
    }).then(options => {
        // Log
        console.log("Connected to SPO");

        var aUrl = "http://api.wheretheiss.at/v1/satellites/25544";

        let headers = options.headers;
        headers['Accept'] = 'application/json;odata=verbose';

        headers['method'] = 'GET';
        headers['json'] = true;
        headers['username'] = 'spdbuser';
        headers['password'] = 'Bpbl2019$';
        headers['domain'] = 'portal.bergerbd.com';

        headers['auth'] = {
            'user': 'spdbuser',
            'pass': 'Bpbl2019',
            'sendImmediately': false,
            key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
            cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
        };

        requestprom.get({
            url: aUrl,
            headers: headers
          }).then(response => {
            //process data
            console.log("Got response : "+JSON.stringify(response));
          })


  .catch(function(err) {
    console.log("request failed : "+err);
  });

//--------------
    
        // // var {List, SPTypes, Web} = require("gd-sprest");
        // var $REST = require("gd-sprest");

        // $REST.Web("https://portaldv.bergerbd.com/leaveauto").Lists("ReimburseMaster").query({
        //     GetAllItems: true,
        //     // OrderBy: 'desc',
        //     // Select: ['ID', 'Title', 'Author/ID', 'Author/Title'],
        //     // Expand: ['Author'],
        //     // Top: 2
        // })
        // .execute(items=>{
        //     let dt = items.results[0];
        //     console.log("Exp data :" + JSON.stringify(dt));
        // })
//-------------------------------------------above function is working with only json api-----------

       
    })
    // .catch((err) => {
    //         console.error( 'Failed to connect to sharepoint (' + err + ')');
    // });

    
}
// //-------------SP server ends == Not working== -------




let getDataFromDBByServerWithHttps = async function(url) {
    
    https.get(url, async (req, res)=>{
        var { statusCode } = res;
        var contentType = res.headers['content-type'];

        let error;

        if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                            `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
                            `Expected application/json but received ${contentType}`);
        }

        if (error) {
        console.error(error.message);
        // consume response data to free up memory
        res.resume();
        }


        res.setEncoding('utf8');
        let data = '';
        
            res.on('data', (chunk)=>{
                console.log(chunk);
                data += chunk;
            });
            
            res.on('end', (data)=>{
                allBusinessProcessData.EmployeeReimbursement.masterData = JSON.stringify(data);
                //allBusinessProcessData.EmployeeReimbursement.masterData = data.length;
                console.log('Data fetching Successfull with https !!!' + data);
                //console.log(JSON.stringify(data));
                //return callback(data);
            });
            
        }).catch(error => {
            console.log("Error on getDataFromDBByServerWithHttps: " + error)
            //alert(error.message)
        })
    
    // //return response;

    //-----------------------------------------------------------

    // await https.request({
    //     hostname: 'portal.bergerbd.com',
    //     port: 443,
    //     path: '/',
    //     method: 'GET',
    //     key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
	// 	cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    // }, (res)=>{
    //     let data = '';
        
    //         res.on('data', (chunk)=>{
    //             console.log(chunk);
    //             data += chunk;
    //         });
            
    //         res.on('end', (data)=>{
    //             allBusinessProcessData.EmployeeReimbursement.masterData = JSON.stringify(data);
    //             console.log('Data fetching Successfull with https !!!' + data);
    //         });
            
    //     }).on('err', (err)=>{
    //         console.log('Error: '+ err.message);
    //     })


}

let getDataFromDBByServer = async function(url) {
    const response = await fetch(url
    //  , {            
    //     cors: {
    //         credentials: false,
    //         origin: false,
    //         //origin: '*',
    //         //origin: "https://testappsocket.azurewebsites.net",
    //         //origins: ['http://localhost:4200', 'https://portal.bergerbd.com/', 'https://portaldv.bergerbd.com/'],
    
    //         methods: ["GET", "POST", "PUT"]
    //     },
    //     transports: ['websocket'],

    //   auth: {
    //         user: 'spdbuser',
    //         pass: 'Bpbl2019',
    //         //'sendImmediately': false
    //   },
    // //   mode: 'cors',
    // //   cache: 'no-cache',
    //    headers: {
    // //     //Referer: url,
    //     "accept": "application/atom+xml; odata=verbose",
    //      "accept-language": "en-US, en; q=0.9, es;q=0.8",
    //      "content-type": "'text/xml; type=feed; charset=UTF-8" 
    //   },
    //   redirect: 'follow',
    //   referrerPolicy: 'no-referrer',
    //   body: null
    // }
    ).then(response => {
        // if (response.ok) {
        //     allBusinessProcessData.EmployeeReimbursement.masterData = response.length; 
        //     console.log("response ok");          
        // }
        if (response.ok) {
            console.log("response ok")
            response.json()
            .then((data) => {
              allBusinessProcessData.EmployeeReimbursement.masterData = data.length;
              //allBusinessProcessData.EmployeeReimbursement.masterData = data; 
              //res.json(data)
              //response = json(data);
            })
        }
        else {
          //res.sendStatus(response.status);
          console.log('Data fetching is unsuccessfull !!!')
        }
      })
      .catch(error => {
          console.log(error)
          alert(error.message)
      })
    
    return response;
}

//--------get data ends -----------





//let url = "http://api.wheretheiss.at/v1/satellites/25544";
//getData(url);
    
//const callExApiUsingHttp = 
//async (callback)=>{
                                    
//}


         
        //  (async () => {
        //     try {
        //         //let data =
        //         await fetch(url)
        //         .then(response => {
        //             if(response.ok){
        //                 response.json("response")
        //             }else{
        //                 console.log('unsuccesfull to fetch data')
        //             }
        //         })
        //         .then(data=>{
        //             allData.EmployeeReimbursement = data;
        //             // data.send(data[0].length);
        //             // io.emit('chat12', data[0].length);
        //             console.log(JSON.stringify(allData))});
        //         //return data;
        //     } catch(error) {
        //         spinner.fail(error);
        //     }
        //  })();
//------  get data ends------

//=============the below function can not fetch any json or xml api data -- Not Working =======
let xhr = async function(url){
    let user = 'spdbuser';
    let password = 'Bpbl2019';
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest; 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", xmlapi, true, user, password);

    xhr.onerror = function() { // only triggers if the request couldn't be made at all
        alert(`Network Error`);
      };
      
      xhr.onprogress = function(event) { // triggers periodically
        // event.loaded - how many bytes downloaded
        // event.lengthComputable = true if the server sent Content-Length header
        // event.total - total number of bytes (if lengthComputable)
        alert(`Received ${event.loaded} of ${event.total}`);
      };

    xhr.onreadystatechange = function () {
        console.log("readyState = " + this.readyState + ", status = " + this.status);
        if (this.readyState == 4 && this.status == 200) {
            var result = this.responseText;
            console.log("xhr............" + result);
        }else{
            console.log("error.........")
        }
    };

    xhr.onerror = function() {
        alert("Request failed");
      };

      xhr.onload = function() {
        let responseObj = xhr.response;
        alert(responseObj.message); // Hello, world!
      };
};
// ----the above function can not fetch any json or xml api data -- Not Working --------

//===================== not working , can not connect with server =====================
let fnWithMS = function (url){
    let config = {
         url: "https://portal.bergerbd.com/leaveauto/_api/web/lists/getByTitle('ReimburseMaster')/items?&$top=2&$select=ID,Title,RequestFor,PendingWith/ID,PendingWith/Title,Status,ItemName,Entitlement,GLCode,CostCenter,TotalReimbursementAmount,Teritory&$expand=PendingWith/ID",
         username: 'spdbuser',
         password: 'Bpbl2019',
         domain: 'portal.bergerbd.com/leaveauto',
         workstation: '',
         headers: {
             "Accept": "application/json;odata=verbose",
             "content-type": "application/json;odata=verbose;"
         }
     };

    let httpResponse = { "statusCode": 500, result: undefined };
    console.log(" fnWithMS() is executing... ")
    https.get(config,
         function success(error, response) {
             httpResponse.result = JSON.parse(response.body);            
             res.status(200).send(httpResponse.result.d.results);
             console.log("RowData from fnWithMS() is : " + JSON.stringify(httpResponse.result.d.results));
         });
}
//--------------------- not working , can not connect with server----------

let nodeXhr = function(url){
    let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest; 
    let xhr = new XMLHttpRequest();

    let promise = new Promise((resolve, reject)=>{
        
        xhr.open('GET', url);
        xhr.send();

        xhr.responseType = 'json';

        xhr.onload = ()=>{
            let result = xhr.response;
            resolve(xhr.response);
            console.log("Output of nodeXhr()" + result);
        }

    })

    return promise;
};





import * as sprequest from 'sp-request';
import * as spauth from 'node-sp-auth';
import * as request from 'request-promise';

let spRequestFn = ()=>{
    let myspurl = "https://portal.bergerbd.com/leaveauto/_api/web/lists/getByTitle('ReimburseMaster')/items?&$top=2&$select=ID,Title,RequestFor,PendingWith/ID,PendingWith/Title,Status,ItemName,Entitlement,GLCode,CostCenter,TotalReimbursementAmount,Teritory&$expand=PendingWith/ID";

    // //get auth options
    // spauth.getAuth(url, credentialOptions)
    // .then(options => {

    //     //perform request with any http-enabled library (request-promise in a sample below):
    //     let headers = options.headers;
    //     headers['Accept'] = 'application/json;odata=verbose';

    //     request.get({
    //     url: myspurl,
    //     headers: headers
    //     }).then(response => {
    //     //process data
    //     });
    // });

    let credentialOptions = {
        // key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
        // cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
        // passphrase: 'test',
        // username: "spdbuser",
        // password: "Bpbl2019$",
        username: "kamal",
        password: "@1AllahakberJuly",
        //online: true    
    }

    let spr = sprequest.create(credentialOptions);

    // spr.get("https://portal.bergerbd.com/leaveauto/_api/web/lists/getByTitle('ReimburseMaster')/items?&$top=2&$select=ID,Title,RequestFor,PendingWith/ID,PendingWith/Title,Status,ItemName,Entitlement,GLCode,CostCenter,TotalReimbursementAmount,Teritory&$expand=PendingWith/ID")
    //     .then(response => {
    //         console.log('List Id: ' + JSON.stringify(response));
    //         //console.log('List Id: ' + response.body.d.Id);
    //     })
    //     .catch(err =>{
    //         console.log('Ohhh, something went wrong...');
    //     });
    
    let promise = new Promise((resolve, reject)=>{
       
        spr.get("https://portal.bergerbd.com/leaveauto/_api/web/lists/getByTitle('ReimburseMaster')/items?&$top=2&$select=ID,Title,RequestFor,PendingWith/ID,PendingWith/Title,Status,ItemName,Entitlement,GLCode,CostCenter,TotalReimbursementAmount,Teritory&$expand=PendingWith/ID")
        .then(res=>{
            resolve(JSON.stringify(res));
            console.log(JSON.stringify(res))})

        })
        .catch((rej)=>{
            reject(rej.message);
            console.log("Rejection mgs from getSpPnpData() : " +rej.message);
        })
    return promise;
}


function getBusinessProcessData(){
    let bpLocalStorFolder = path.join(__dirname, './businessprocesslocaldata/');

    if(fs.existsSync(__dirname)){        
        let deadData = fs.readFileSync(bpLocalStorFolder + 'EmployeeReimbursement/ReimburseMaster.txt', {encoding: 'utf8'});
        console.log("File reading success !!");
        return deadData;        
    }
    else{
        console.log("File reading failed !!");
    }


    // spRequestFn().then(res=>{
    //          console.log("Print frm getSpPnpData() " + JSON.stringify(res))
    //      });;


    // let xmlapi = "https://petstore.swagger.io/v2/pet/findByStatus?status=available";
    // var aUrl22 = "https://api.wheretheiss.at/v1/satellites/25544";
    // let bpblurl = "https://portal.bergerbd.com/leaveauto/_api/web/lists/getByTitle('ReimburseMaster')/items?&$top=2&$select=ID,Title,RequestFor,PendingWith/ID,PendingWith/Title,Status,ItemName,Entitlement,GLCode,CostCenter,TotalReimbursementAmount,Teritory&$expand=PendingWith/ID";
    //getDataFromDBByServer(bpblurl);


    //authNdFetchData();
    // getSpPnpData()
    // .then(res=>{
    //     console.log("Print frm getSpPnpData() " + JSON.stringify(res))
    // });
    
    
    
    // nodeXhr(aUrl22).then(res=>{
    //     console.log("Print frm getBusinessProcessData() " + JSON.stringify(res))
    // })
        
    //getSPDataFromDBByServerWithHttp(aUrl22);



   
    //getDataFromDBByServerWithHttps(aUrl22);
   
    // getStoredData().then((res)=>{
    //     return JSON.stringify(res);
    // })

    //return JSON.stringify(allBusinessProcessData.EmployeeReimbursement.masterData);
}

// import { ListSubscriptionFactory, IListSubscription } from '@microsoft/sp-list-subscription';
// import { Guid } from '@microsoft/sp-core-library';

// let getListSubscription = function (url){    

//     export default class LatestDocumentsWebPart extends BaseClientSideWebPart<ILatestDocumentsWebPartProps> {
//     private _listSubscriptionFactory: ListSubscriptionFactory;
//     private _listSubscription: IListSubscription;

//     private createListSubscription(): void {
//         this._listSubscriptionFactory = new ListSubscriptionFactory(this);
//         this._listSubscription = this._listSubscriptionFactory.createSubscription({
//         listId: Guid.parse(this.properties.listId),
//         callbacks: {
//             notification: this._loadDocuments.bind(this)
//         }
//         });
//     }

//     private _loadDocuments(): void {
//         // load documents here
//     }

//     // omitted for brevity
//     }
// }

function subscribeReimburseMaster(){
    console.log("Subscription function starts....");
    let url = "https://portaldv.bergerbd.com/leaveauto/_api/web/lists('1c81ac25-d9fa-42f6-a3e8-8689f7e2971c')/items";
    
	let data = {
        "Title": "ReimbursementID-3348",
		'__metadata': {
			"type": "SP.Data.ReimburseMasterListItem"
		},
    }
    let options = {
        url: url,
        method: "POST",
        headers: {
			"Accept": "application/json; odata=verbose",
			"Content-Type": "application/json; odata=verbose",
			//"X-RequestDigest": $("#__REQUESTDIGEST").val()
        }            
    };
    
    let req = https.request(options, (res)=>{
        let body ='';
        console.log("Status Code: "+ res.statusCode)
        
        res.on('data', (chunk)=>{
            body+= data;
        })
        
        res.on('end', ()=>{
            //console.log("Body: "+ body)
        })
    })
    
    req.write(data);
    req.end();


    // let url = "https://portaldv.bergerbd.com/leaveauto/_api/web/lists('1c81ac25-d9fa-42f6-a3e8-8689f7e2971c')/subscriptions";
    // let data = {
    //     "resources": "https://portaldv.bergerbd.com/leaveauto/_api/web/lists('1c81ac25-d9fa-42f6-a3e8-8689f7e2971c')", 
    //     "notificationUrl": "https://portaldv.bergerbd.com:3000/",
    //     "expirationDateTime": "2021-11-14T18:00:00Z"
    // }
    // let options = {
    //     url: url,
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json'           
    //     }            
    // };
    
    // let req = serverHttps.request(options, (res)=>{
    //     let body ='';
    //     console.log("Status Code: "+ res.statusCode)
        
    //     res.on('data', (chunk)=>{
    //         body+= data;
    //     })
        
    //     res.on('end', ()=>{
    //         console.log("Body: "+ body)
    //     })
    // })
    
    // req.write(data);
    // req.end();
}



let numberOfOnlineUsers = 0;
let rooms ={}
// Ref-our socketIO ~~ io
socketIO.on('connection', (socket) => {

    console.log("New user connected with id: " + socket.id);

    socket.on('disconnect', () => {
        numberOfOnlineUsers--;
        //socketIO.emit('numberOfOnlineUsers', numberOfOnlineUsers);
        console.log('An user disconnected');
    });
    
    numberOfOnlineUsers++;
    //socketIO.emit('numberOfOnlineUsers', numberOfOnlineUsers);
    console.log('Total connected users: ' + numberOfOnlineUsers);
    
    socket.join('EmployeeReimbursement');        
        socketIO.sockets.in('EmployeeReimbursement').emit('EmployeeReimbursement', 'Message EmployeeReimbursement re Dashboard');
        socketIO.sockets.in('EmployeeReimbursement').emit('EmployeeReimbursementBack', 'Back data EmployeeReimbursement re Dashboard');
        //socketIO.sockets.in('EmployeeReimbursement').emit('EmployeeReimbursementBack', subscribeReimburseMaster());
        // let sizeER = socketIO.sockets.adapter.rooms.get('EmployeeReimbursement').size;
        // console.log("Connected users in the EmployeeReimbursement room is: " + sizeER);
        
    socket.join('MobileHandsetRequests');
        socketIO.sockets.in('MobileHandsetRequests').emit('MobileHandsetRequests', 'Message from MobileHandsetRequests Dashboard');
        socketIO.sockets.in('MobileHandsetRequests').emit('MobileHandsetRequestsBack', 'Back data from MobileHandsetRequests Dashboard');        
        // let sizeMHR = socketIO.sockets.adapter.rooms.get('MobileHandsetRequests').size;
        // console.log("Connected users in the EmployeeReimbursement room is: " + sizeMHR);
    
        
    //==== get data from client and update local storage data
    socket.on('updateData', (data, config) => {
        writeBPData(data, config.fileName).then(res => { 
            socketIO.sockets.in(config.proName).emit(config.proName + '-updateDataStatus', res);           
            //socketIO.emit(config.proName + '-updateDataStatus', res);            
        })
    });
    

    
    // socket.emit('WorkshopProposal', 'WorkshopProposal');
    // socket.emit('PoolCarRequisition', 'PoolCarRequisition');
    // socket.emit('EmployeePaintDiscount', 'EmployeePaintDiscount');
    // socket.emit('HRServices', 'HRServices');
    // socket.emit('EmployeeOffBoardingProcess', 'EmployeeOffBoardingProcess');
    // socket.emit('TravelRequest', 'TravelRequest');
    // socket.emit('MobileHandsetRequests', 'MobileHandsetRequests');
    // socket.emit('ManpowerRequisition', 'ManpowerRequisition');
    // socket.emit('AssetPurchaseRequest', 'AssetPurchaseRequest');
    // socket.emit('SupplementaryBudgetRequest', 'SupplementaryBudgetRequest');
    // socket.emit('EmployeeAdvanceRequest', 'EmployeeAdvanceRequest');
    // socket.emit('SecurityIncidence', 'SecurityIncidence');
    // socket.emit('VendorComplaint', 'VendorComplaint');
    // socket.emit('BOECheckPaymentProcess', 'BOECheckPaymentProcess');    
    
    //socket.emit('EmployeeReimbursement', getBusinessProcessData());


    //creating a new room for client side by calling 'new-user'
    socket.on('new-user', ( room) => {
        socket.join(room);
        //rooms[room].users[socket.id] = "username";
        socket.to(room).emit('user-connected', "username");        
    })

    //update number of total users of partucular room once any user being deleted
    socket.on('disconnect', () => {
        getUserRooms(socket).forEach(room => {
            socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id])
            delete rooms[room].users[socket.id]
        })
    })
});

function getUserRooms(socket) {
    return Object.entries(rooms).reduce((names, [name, room]) => {
      if (room.users[socket.id] != null) names.push(name)
      return names
    }, [])
};

//----------------------------https & express implementation ends =---------------------
