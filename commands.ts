export interface template {
    packages: string[];
    commands: string[];
}

export const jest: template = {
    packages: ["jest", "babel-jest", "@babel/core", "@babel/preset-env"],
    commands: ['npm pkg set scripts.test="jest"'],
};

export const jest_ts: template = {
    packages: [
        "ts-jest",
        "babel-jest",
        "@babel/coreD",
        "@babel/preset-env",
        "@types/jest",
    ],
    commands: ['npm pkg set scripts.test="jest"'],
};

export const husky: template = {
    packages: ["husky"],
    commands: [
        'npm pkg set scripts.prepare="husky install"',
        "npm run prepare",
        'npx husky add .husky/pre-commit "npm test"',
        "git add .husky/pre-commit",
    ],
};
