import chalk from "chalk";
export function print_welcome() {
    console.info(`
        █████╗     ████████╗    ███╗   ███╗
        ██╔══██╗    ╚══██╔══╝    ████╗ ████║
        ███████║       ██║       ██╔████╔██║
        ██╔══██║       ██║       ██║╚██╔╝██║
        ██║  ██║       ██║       ██║ ╚═╝ ██║
        ╚═╝  ╚═╝       ╚═╝       ╚═╝     ╚═╝`);
    console.log("\n");
    console.info(chalk.bold.yellow("          -------------------------------"));
    console.info(chalk.bold.green("           Welcome to JazzBank ATM Machine"));
    console.info(chalk.bold.yellow("          -------------------------------"));
}
