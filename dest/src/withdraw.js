"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdraw_form = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
async function withdraw_form() {
    console.log("\n");
    const answer = await inquirer_1.default.prompt([
        {
            type: "number",
            name: "amount",
            message: "Enter Amount: ",
        },
    ]);
    return answer.amount;
}
exports.withdraw_form = withdraw_form;
