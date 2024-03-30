import chalk from "chalk";
import inquirer from "inquirer";
export async function registration_page() {
    console.log("Please Register by providing the following details?\n");
    const { username, card_no, pin, cash } = await inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "What is your name?",
        },
        {
            type: "input",
            name: "card_no",
            message: "What is your Debit Card # ?",
        },
        {
            type: "password",
            name: "pin",
            message: "Please enter your 4-digit code: ",
            mask: "*",
            validate: function (input) {
                const isValid = /^\d{4}$/.test(input);
                if (isValid) {
                    return true;
                }
                else {
                    return chalk.yellow('Please enter a valid 4-digit number');
                }
            },
        },
        {
            type: "number",
            name: "cash",
            message: "Enter initial deposit amount? :",
        },
    ]);
    return { username, card_no, pin, cash };
}
