import { update, noUsersYet } from "./update.js";
import { createLineOnTable } from "./savedUsers.js";
const field = document.querySelector("#search");
let tableData = JSON.parse(localStorage.getItem("@github-fav")) || [];

export function search() {
  newUser();
  document.querySelector("#search").value = "";
}

function saveOnStorage(newLine) {
  tableData.push(newLine);
  localStorage.setItem("@github-fav:", JSON.stringify(tableData));
}
export function deleteFromStorage(newLine) {
  const filteredEntries = tableData.filter(
    (entry) => entry.login != newLine.login
  );
  console.log(filteredEntries)
  tableData = filteredEntries;
  localStorage.setItem("@github-fav:", JSON.stringify(tableData));
}
function test(data) {
  try {
    const userExists = tableData.find((entry) => entry.login == data.login);
    if (userExists) {
      throw new Error("Usuário já cadastrado!");
    }
    if (data.login === undefined) {
      throw new Error("Usuário não encontrado!");
    }
  } catch (error) {
    alert(error.message);
    return false;
  }
  return true;
}
async function newUser() {
  const user = `https://api.github.com/users/${field.value}`;
  await fetch(user)
    .then((response) => response.json())
    .then((data) => {
      const newLine = createLineOnTable();
      if (test(data)) {
        newLine.querySelector(
          "img"
        ).src = `https://github.com/${data.login}.png`;
        newLine.querySelector(".user h2").textContent = `${data.name}`;
        newLine.querySelector(
          ".user a"
        ).href = `https://github.com/${data.login}`;
        newLine.querySelector(".user span").textContent = `${data.login}`;
        newLine.querySelector(
          ".repositories"
        ).textContent = `${data.public_repos}`;
        newLine.querySelector(".followers").textContent = `${data.followers}`;
        newLine.querySelector(".remove").onclick = () => {
          let index = tableData.indexOf(newLine);
          deleteFromStorage(newLine, index);
          newLine.closest("tr").remove();
          noUsersYet();
        };

        const tabela = document.querySelector("tbody");
        tabela.appendChild(newLine);
        saveOnStorage(data);
      }
    });
  update();
  noUsersYet();
}
