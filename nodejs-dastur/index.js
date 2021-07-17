// function greet(name) {
//     console.log("Salom "+name);
// }
// greet('Abdurashid'); 

// let name='Abdurashid';
// global.name;
// console.log(module);

// const log = require('./logger');
// log('salom')

// const path = require('path');
// console.log(__filename);
// const pathObj=path.parse(__filename);
// console.log(pathObj);


// const os = require('os');
// const freeMem=os.freemem();
// const userInfo=os.userInfo();

// console.log(`Bo'sh xotira miqdori : ${freeMem}`);
// console.log(`Foydalanuvchi haqida ma'lumot: ${userInfo}`);

// const fs = require('fs');
// // const files=fs.readdirSync('./');
// // console.log(files);
// fs.readdir(sd, function (err,files) {
//     if(err) console.log(err);
//     else console.log(files);
// })


const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('messageLogged',function () {
    console.log('listener chaqirildi ');
});
emitter.emit('messageLogged');