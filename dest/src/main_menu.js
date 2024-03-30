"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main_menu = void 0;
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
async function main_menu() {
    const answer = await inquirer_1.default.prompt([
        {
            type: "list",
            name: "answer",
            message: chalk_1.default.redBright("Please select your desired operation?"),
            choices: [
                "Deposit Amount",
                "Withdraw Amount",
                "Balance Inquiry",
                "Transfer Amount",
                "Exit",
            ],
        },
    ]);
    return answer.answer;
}
exports.main_menu = main_menu;
