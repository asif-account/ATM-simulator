"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const welcome_js_1 = require("./welcome.js");
const first_page_js_1 = require("./first_page.js");
const registration_page_js_1 = require("./registration_page.js");
const hardcoded_obj_js_1 = require("./hardcoded_obj.js");
const main_menu_js_1 = require("./main_menu.js");
const withdraw_js_1 = require("./withdraw.js");
const deposit_js_1 = require("./deposit.js");
//Data Structures and Global Variable
let isauthenticated = false;
let authenticatedUser;
let retrieved_user;
let users = [];
users.push(hardcoded_obj_js_1.user1);
users.push(hardcoded_obj_js_1.user2);
//Print Welcome Screen to the Customer
(0, welcome_js_1.print_welcome)();
//First page; Whether Registered Customer or Not ??
let answer = await (0, first_page_js_1.first_page)();
if (answer === "YES") {
    // Take pin from the user for login
    console.log("\n");
    const entered_pin = await inquirer_1.default.prompt([
        {
            type: "number",
            name: "pin",
            message: "Please enter your 4-digit code: ",
            mask: "*",
            validate: function (input) {
                const isValid = /^\d{4}$/.test(input);
                if (isValid) {
                    return true;
                }
                else {
                    return chalk_1.default.yellow("Please enter a valid 4-digit number");
                }
            },
        },
    ]);
    retrieved_user = search_user(entered_pin.pin);
    if (retrieved_user) {
        isauthenticated = true;
        authenticatedUser = retrieved_user.Name;
        console.log("\n");
        console.info(chalk_1.default.yellowBright(`Welcome ${authenticatedUser}. Your Acc #: ${retrieved_user.Account_No}, Balance: ${retrieved_user.Balance} `));
        console.info(`------------------------------------------------------------------------ `);
        do {
            console.log("\n");
            await loggedin_user_operations(retrieved_user, isauthenticated); //----------------
            var ans = await inquirer_1.default.prompt([{
                    type: "input",
                    name: "further_ops",
                    message: "Do you want to continue? yes/no",
                }]);
            if (ans.further_ops.toLowerCase() === "yes") {
                isauthenticated = true;
            }
            else {
                isauthenticated = false;
                authenticatedUser = null;
            }
        } while (isauthenticated === true);
    }
    else {
        isauthenticated = false;
        authenticatedUser = null;
        console.log("User not exist.....!");
    }
}
else {
    // New customer. Registration page
    console.log("\n");
    const { username, card_no, pin, cash } = await (0, registration_page_js_1.registration_page)();
    let newuser = {
        Name: username,
        Account_No: card_no,
        Pin: pin,
        Balance: cash,
    };
    users.push(newuser);
    console.log("\n");
    console.log("User added successfully!");
    isauthenticated = true;
    retrieved_user = search_user(pin);
    if (retrieved_user) {
        isauthenticated = true;
        authenticatedUser = retrieved_user.Name;
        console.log("\n");
        console.info(chalk_1.default.yellowBright(`Welcome ${authenticatedUser}. Your Acc #: ${retrieved_user.Account_No}, Balance: ${retrieved_user.Balance} `));
        console.log(`------------------------------------------------------------------------ `);
        do {
            console.log("\n");
            await loggedin_user_operations(retrieved_user, isauthenticated); //----------------
            console.log("\n");
            var ans = await inquirer_1.default.prompt([{
                    type: "input",
                    name: "further_ops",
                    message: "Do you want to continue? yes/no",
                }]);
            if (ans.further_ops.toLowerCase() === "yes") {
                isauthenticated = true;
            }
            else {
                isauthenticated = false;
                authenticatedUser = null;
            }
        } while (isauthenticated === true);
    }
    else {
    }
}
//
function search_user(_Pin) {
    // Assuming users is an array of type User
    let result = users.find((user) => user.Pin === _Pin);
    return result;
}
async function loggedin_user_operations(retrieved_user, isauthenticated) {
    //display main menu
    let operation_selected = await (0, main_menu_js_1.main_menu)();
    //console.log(operation_selected);
    if (isauthenticated) {
        switch (operation_selected) {
            case "Deposit Amount":
                console.log("\n");
                let deposit_amount = await (0, deposit_js_1.deposit_form)();
                console.log("\nDeposit successful");
                console.log("\n");
                retrieved_user.Balance = retrieved_user.Balance + deposit_amount;
                console.log(`Your new Balance is Rs. ${retrieved_user.Balance}`);
                console.log("\n");
                break;
            case "Withdraw Amount":
                let withdraw_amount = await (0, withdraw_js_1.withdraw_form)();
                if (withdraw_amount > retrieved_user.Balance) {
                    console.log("\n");
                    console.log("Insufficient balance");
                    console.log("\n");
                }
                else {
                    console.log("\n");
                    console.log("Withdrawal successful");
                    console.log("\n");
                    retrieved_user.Balance = retrieved_user.Balance - withdraw_amount;
                    console.log(`Remaining Balance is Rs. ${retrieved_user.Balance}`);
                    console.log("\n");
                }
                // console.log(typeof(operation_selected));
                break;
            case "Balance Inquiry":
                console.log("\n");
                console.log(`Your Account Balance is: ${retrieved_user.Balance}`);
                console.log("\n");
                break;
            case "Transfer Amount":
                console.log("\n");
                await Transfer_Balance(retrieved_user);
                console.log("\n");
                break;
            case "Exit":
                process.exit(0);
            default:
                console.log("Invalid");
                break;
        }
    }
}
async function Transfer_Balance(_sender_account) {
    const answer = await inquirer_1.default.prompt([
        {
            type: "number",
            name: "amount",
            message: "Enter the Amount you want to transfer : Rs: ",
        },
        {
            type: "number",
            name: "Acc",
            message: "Enter the recepient Account #: ",
        },
    ]);
    let receipent = users.find((user) => user.Account_No === answer.Acc);
    if (receipent) {
        console.log("\n");
        console.log(`${answer.amount} is sucessfully transferred to ${receipent.Name}`);
        _sender_account.Balance = _sender_account.Balance - answer.amount;
        receipent.Balance = receipent.Balance + answer.amount;
        console.log("\n");
        console.log(`your remaining balance is ${_sender_account.Balance}`);
        console.log(`Recipient balance is: ${receipent.Balance}`);
        console.log("\n");
    }
    else {
        console.log("\n");
        console.log("Failed. May be invalid information provided by you");
    }
}
