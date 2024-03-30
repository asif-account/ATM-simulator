import chalk from "chalk";
import inquirer from "inquirer";
 export async function first_page () {

    const { answer } = await inquirer.prompt([
        {
            type: "list",
            name: "answer",
            message: "Are you a registered customer? \n",
            choices: [
                "YES",
                "NO"]
        },
    ]);
    return answer;
}

//module.exports = first_page;