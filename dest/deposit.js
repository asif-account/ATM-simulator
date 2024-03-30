import inquirer from "inquirer";
export async function deposit_form() {
    console.log("\n");
    const answer = await inquirer.prompt([
        {
            type: "number",
            name: "amount",
            message: "Enter Amount: ",
        },
    ]);
    return answer.amount;
}
