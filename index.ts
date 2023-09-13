import { exec } from "node:child_process";
import * as c from "./commands";
import * as p from "@clack/prompts";
import color from 'ansi-colors'

async function main() {
    p.intro("Welcome to Node Utils");
    const packageManager = await p.select({
        message: "Select package manager.",
        options: [
            { value: "npm install", label: "Npm" },
            { value: "pnpm install", label: "Pnpm" },
            { value: "yarn install", label: "Yarn" },
        ],
    });
    const utilPackages = await p.multiselect({
        message: "Select package manager.",
        options: [
            { value: "jest", label: "jest" },
            { value: "jest-ts", label: "jest-ts" },
            { value: "husky", label: "husky" },
            { value: "eslint", label: "eslint" },
            { value: "stagelint", label: "stagelint" },
            { value: "prettier", label: "prettier" },
        ],
    });

    const spinner = p.spinner();

    spinner.start("Adding packages...");

    try {
        spinner.stop(
            color.green.bold(`Successfully installed packages!`)
        );
    } catch (err) {
        spinner.stop(color.redBright.bold(`Something went wrong.`));
    }
    p.outro("Goodbye!");
}

main();
