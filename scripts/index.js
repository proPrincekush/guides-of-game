//  reference of dom
const guideList = document.querySelector(".guides");
const LogOuts = document.querySelectorAll(".logged-out");
const LogIns = document.querySelectorAll(".logged-in");
const Account = document.querySelector(".account-details")

const setupUi = (user) =>{
if (user) {

  db.collection("users").doc(user.uid).get()
  .then((doc)=>{
 
// account 
const html =`
<div>Logged in as ${user.email} </div>
<div> Meet ${doc.data().bio} </div>
`;
Account.innerHTML = html;
  })

  
  // view
LogIns.forEach(item => {item.style.display='block'});
LogOuts.forEach(item => {item.style.display='none'});

} else {
  Account.innerHTML = 'please login';
  LogIns.forEach(item=>{ item.style.display='none'});
  LogOuts.forEach(item=>{ item.style.display='block'});
}
}



// setup guides
const setupGuides = data =>{

  if(data.length){
  let html = "";
  data.forEach(doc => {
    const guides  = doc.data();
    const li = `
    <li>
    <div class="collapsible-header grey lighten-4">${guides.title}</div>
    <div class="collapsible-body white">${guides.content}</div>
  </li>
    `;
    html += li;
    // console.log(guides);
  });

  guideList.innerHTML = html;
}else{
  guideList.innerHTML = `<h2 class="center-align"> LogIn to View the Guides of the Game </h2>`
}
}




// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});