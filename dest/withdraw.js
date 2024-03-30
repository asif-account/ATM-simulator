import inquirer from "inquirer";
export async function withdraw_form() {
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
