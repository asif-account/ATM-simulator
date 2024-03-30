"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.print_welcome = void 0;
const chalk_1 = __importDefault(require("chalk"));
function print_welcome() {
    console.info(`
        █████╗     ████████╗    ███╗   ███╗
        ██╔══██╗    ╚══██╔══╝    ████╗ ████║
        ███████║       ██║       ██╔████╔██║
        ██╔══██║       ██║       ██║╚██╔╝██║
        ██║  ██║       ██║       ██║ ╚═╝ ██║
        ╚═╝  ╚═╝       ╚═╝       ╚═╝     ╚═╝`);
    console.log("\n");
    console.info(chalk_1.default.bold.yellow("          -------------------------------"));
    console.info(chalk_1.default.bold.green("           Welcome to JazzBank ATM Machine"));
    console.info(chalk_1.default.bold.yellow("          -------------------------------"));
}
exports.print_welcome = print_welcome;
