/** @type {import('ts-jest').JestConfigWithTsJest} */

/*
For debugging purpose, uncomment the following code and run `npm test` to see the error message
const fs = require("fs");

let jsonString = "";
try {
  jsonString = fs.readFileSync("./tsconfig.json", "utf8");
  const customer = JSON.parse(jsonString);
} catch (err) {
  console.log(jsonString.length);
  // print jsonString from 190 to 200
  for (let i = 180; i < 200; i++) {
    console.log(`${i}:` + jsonString[i]);
  }

  console.log(err);
}*/

const { pathsToModuleNameMapper } = require("ts-jest");

const { compilerOptions } = require("./tsconfig");
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  setupFiles: ["<rootDir>/setup-tests-env.ts"],
};
