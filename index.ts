import * as c from "./commands";
import * as p from "@clack/prompts";
import color from "ansi-colors";

import util from 'node:util'

async function main() {
    const exec = util.promisify(await (await import('node:child_process')).exec)
    
    p.intro("Welcome to Node Utils");
    const packageManager = await p.select({
        message: "Select package manager.",
        options: [
            { value: "npm install", label: "Npm" },
            { value: "pnpm install", label: "Pnpm" },
            { value: "yarn install", label: "Yarn" },
        ],
    });

    // @ts-ignore
    const utilPackages: c.template[] = await p.multiselect({
        message: "Select package manager.",
        options: [
            { value: c.jest, label: "jest" },
            // { value: "jest-ts", label: "jest-ts" },
            { value: c.husky, label: "husky" },
            // { value: "eslint", label: "eslint" },
            // { value: "stagelint", label: "stagelint" },
            // { value: "prettier", label: "prettier" },
        ],
    })

    const spin = p.spinner();
    ``;

    try {
        // run commands here

        spin.start("Adding packages...");
        for (let pkg of utilPackages) {
            const install = [
                packageManager,
                "-D",
                ...pkg.packages,
            ].join(" ");
            spin.message(install)
            const {stdout,stderr} = await exec(install)
            if (stderr) {
                throw new Error('failed to run command')
            }
            for (let command of pkg.commands) {
                spin.message(command)
                const {stderr:err2} = await exec(command)
                if (err2) {
                    throw new Error('failed to run command')
                }
            }
        }
        spin.stop(color.green.bold(`Successfully installed packages!`));
    } catch (err) {
        spin.stop(color.redBright.bold(`Something went wrong.`));
    }
    p.outro("Goodbye!");
}

main();
