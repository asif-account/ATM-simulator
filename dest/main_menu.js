import chalk from "chalk";
import inquirer from "inquirer";
export async function main_menu() {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "answer",
            message: chalk.redBright("Please select your desired operation?"),
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
