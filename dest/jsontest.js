"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
fs.readFile("config.json", "utf8", (error, data) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log(JSON.parse(data));
});
//fs.readFileSync(path, option, callback);  Callback method is most prominent
// the call back function here takes two args. first is error and second is json data.
// const config = {ip: '192.16.0.1', port: 8080 };
// console.log(JSON.stringify(config));
// const config2 = JSON.stringify(config); 
// //const obj = {"ip":"192.16.0.1","port":"8080"}; 
// console.log(JSON.parse(config2));
