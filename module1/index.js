const yargs = require("yargs");
const fs = require("fs");
const path = require("path");
const { promises: fsPromises } = fs;
// const http = require("./http");
const exampleExpress = require("./express");

// fs.writeFile("example.txt", "first file creation", (error) => {
//   if (error) {
//     console.log(error);
//   }
// });

// fsPromises.writeFile("example2.txt", "xdsdzdsvzdvzsd").then(() => {
//   return fsPromises
//     .readFile("example.txt", "utf-8")
//     .then((data) => console.log(data));
//   return fsPromises.appendFile("example2.txt", "xds2222222svzdvzsd");
// });

// async function main() {
//   await fsPromises.writeFile("example2.txt", "xdsdzdsvzdvzsd");

//   const data = await fsPromises.readFile("example.txt", "utf-8");
//   console.log(data);

//   await fsPromises.appendFile("example2.txt", "xds2222222svzdvzsd");
// }

// async function main2() {
//   const pathToDirName = path.join(__dirname, "./package.json");
//   console.log(await fsPromises.readFile(pathToDirName, "utf-8"));
// }
// main2();

const obj = { a: 1, b: "string" };
const json = JSON.stringify(obj);
console.log(typeof json);

const pathTopacageJson = console.log(__dirname);
console.log(__filename);
const numbers = process.argv.slice(2);

const users = [
  { id: 1, name: "Blob", surname: "Bobenko" },
  { id: 2, name: "Bill", surname: "Billenko" },
];

const argv = yargs
  .number("id")
  .string("name")
  .string("surname")
  .alias("name", "n")
  .alias("surname", "s").argv;

const { id, name, surname } = argv;

const userFound = users.filter((user) => {
  if (id && id !== user.id) return false;
  if (name && name !== user.name) return false;
  if (surname && surname !== user.surname) return false;
  return true;
});

console.log(argv);
console.log(userFound);
