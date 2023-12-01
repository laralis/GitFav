import { update,noUsersYet } from './update.js';
import {deleteFromStorage} from './search.js'

export function createLineOnTable() {
  const tr = document.createElement("tr");
  tr.innerHTML += `<td>
  <img
    src="https://github.com/maykbrito.png"
    alt="Foto de usuário"
  />
  <div class="user">

    <h2>Mayk Brito</h2>
    <a href="https://github.com/maykbrito" target="_blank"><span>maykbrito</span></a>
  </div>
</td>
<td class="repositories">123</td>
<td class="followers">1234</td>
<td><button class="remove">Remover</button></td>`;
  return tr;
}
export function findOnStorage() {
  let tableData = JSON.parse(localStorage.getItem("@github-fav:")) || [];
  let table = document.querySelector("tbody");
  tableData.forEach((user) => {
    let newLine = createLineOnTable();
    newLine.querySelector("img").src = `https://github.com/${user.login}.png`;
    newLine.querySelector(".user h2").textContent = `${user.name}`;
    newLine.querySelector(".user a").href = `https://github.com/${user.login}`;
    newLine.querySelector(".user span").textContent = `${user.login}`;
    newLine.querySelector(".repositories").textContent = `${user.public_repos}`;
    newLine.querySelector(".followers").textContent = `${user.followers}`;
    newLine.querySelector(".remove").onclick = async () => {
      newLine.closest("tr").remove();
      noUsersYet();
      deleteFromStorage(newLine)
    };
    table.appendChild(newLine)
    update()
    noUsersYet()
  });
}
