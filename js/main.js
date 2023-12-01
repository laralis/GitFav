import { search } from "./search.js";
import { findOnStorage } from "./savedUsers.js";
const button = document.querySelector("#favUser");

function main() {
  findOnStorage()
  button.addEventListener("click", () => search());
}
main();
