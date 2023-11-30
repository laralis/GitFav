let users=document.querySelectorAll("table .remove");
function deleteUser(){
  users.forEach(addEventListener('click',()=>{
    const user= event.target.closest('tr').remove();
    users=document.querySelectorAll("table .remove");
    if(users.length==0){
      document.querySelector('table').classList.add('isEmpty')
    }
  }))
}
deleteUser()

