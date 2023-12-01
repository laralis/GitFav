export function noUsersYet() {
  let users = document.querySelectorAll("table .remove");
  if (users.length == 0) {
    document.querySelector("table").classList.add("isEmpty");
  } else {
    document.querySelector("table").classList.remove("isEmpty");
  }
}
export function update() {
  let users = document.querySelectorAll("table .remove");
  return users;
}
