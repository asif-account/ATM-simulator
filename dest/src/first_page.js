"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.first_page = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
async function first_page() {
    const { answer } = await inquirer_1.default.prompt([
        {
            type: "list",
            name: "answer",
            message: "Are you a registered customer? \n",
            choices: [
                "YES",
                "NO"
            ]
        },
    ]);
    return answer;
}
exports.first_page = first_page;
//module.exports = first_page;
