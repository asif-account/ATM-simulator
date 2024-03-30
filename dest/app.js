import chalk from "chalk";
import inquirer from "inquirer";
import { print_welcome } from "./welcome.js";
import { first_page } from "./first_page.js";
import { registration_page } from "./registration_page.js";
import { user1, user2 } from "./hardcoded_obj.js";
import { main_menu } from "./main_menu.js";
import { withdraw_form } from "./withdraw.js";
import { deposit_form } from "./deposit.js";
//Data Structures and Global Variable
let isauthenticated = false;
let authenticatedUser;
let retrieved_user;
let users = [];
users.push(user1);
users.push(user2);
//Print Welcome Screen to the Customer
print_welcome();
//First page; Whether Registered Customer or Not ??
let answer = await first_page();
if (answer === "YES") {
    // Take pin from the user for login
    console.log("\n");
    const entered_pin = await inquirer.prompt([
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
                    return chalk.yellow("Please enter a valid 4-digit number");
                }
            },
        },
    ]);
    retrieved_user = search_user(entered_pin.pin);
    if (retrieved_user) {
        isauthenticated = true;
        authenticatedUser = retrieved_user.Name;
        console.log("\n");
        console.info(chalk.yellowBright(`Welcome ${authenticatedUser}. Your Acc #: ${retrieved_user.Account_No}, Balance: ${retrieved_user.Balance} `));
        console.info(`------------------------------------------------------------------------ `);
        do {
            console.log("\n");
            await loggedin_user_operations(retrieved_user, isauthenticated); //----------------
            var ans = await inquirer.prompt([{
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
    const { username, card_no, pin, cash } = await registration_page();
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
        console.info(chalk.yellowBright(`Welcome ${authenticatedUser}. Your Acc #: ${retrieved_user.Account_No}, Balance: ${retrieved_user.Balance} `));
        console.log(`------------------------------------------------------------------------ `);
        do {
            console.log("\n");
            await loggedin_user_operations(retrieved_user, isauthenticated); //----------------
            console.log("\n");
            var ans = await inquirer.prompt([{
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
    let operation_selected = await main_menu();
    //console.log(operation_selected);
    if (isauthenticated) {
        switch (operation_selected) {
            case "Deposit Amount":
                console.log("\n");
                let deposit_amount = await deposit_form();
                console.log("\nDeposit successful");
                console.log("\n");
                retrieved_user.Balance = retrieved_user.Balance + deposit_amount;
                console.log(`Your new Balance is Rs. ${retrieved_user.Balance}`);
                console.log("\n");
                break;
            case "Withdraw Amount":
                let withdraw_amount = await withdraw_form();
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
    const answer = await inquirer.prompt([
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
