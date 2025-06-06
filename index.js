localStorage.removeItem("user-Entries");
let userForm=document.getElementById('user_form');

const retreiveUserEntries=()=>{
  let entries=localStorage.getItem("user-Entries");
  if(entries){
    entries=JSON.parse(entries);
  }
  else{
    entries=[];
  }
  return entries;
}
function isvaliddob(dob){
  const birthDate=new Date(dob);
  const today=new Date();
  let age=today.getFullYear()-birthDate.getFullYear();
  const monthDiff=today.getMonth()-birthDate.getMonth();
  if(monthDiff<0 || (monthDiff===0 && today.getDate()<birthDate.getDate())){
    age--;
  }
  return age>=18 && age<=55;
}

let userEntries=retreiveUserEntries();

const displayUserEntries=()=>{
  const entries= retreiveUserEntries();
  let TableEntries="";
  if(entries.length===0){
    TableEntries=`<tr> 
      <td class="border px-4 py-2" colspan="5"></td>
    </tr>`;
  }else{
  TableEntries=entries.map((entry)=>{
    return `<tr>
      <td class="border px-4 py-2">${entry.name}</td>
      <td class="border px-4 py-2">${entry.email}</td>
      <td class="border px-4 py-2">${entry.password}</td>
      <td class="border px-4 py-2">${entry.dob}</td>
      <td class="border px-4 py-2">${entry.acceptedTermsAndConditions ? "Yes" : "No"}</td>
    </tr>`;
  }).join("\n");
}
  const table=`<table class='table-auto w-full'>
  <thead class="bg-gray-100">
  <tr>
  <th class="px-4 py-2">Name</th>
  <th class="px-4 py-2">Email</th>
  <th class="px-4 py-2">Password</th>
  <th class="px-4 py-2">Date of Birth</th>
  <th class="px-4 py-2">Accepted Terms and Conditions</th>
  </tr>
  </thead>
  <tbody>
  ${TableEntries}
  </tbody></table>`;
  let details=document.getElementById('user-entries');
  details.innerHTML=table;
}
const saveUserForm=(event)=>{
  event.preventDefault();
  const name=document.getElementById('name').value;
  const email=document.getElementById('email').value;
  const password=document.getElementById('password').value;
  const dob=document.getElementById('dob').value;
  const acceptedTermsAndConditions=document.getElementById('terms').checked;
  if(!isvaliddob(dob)){
    alert("You must be between 18 and 55 years old to register.");
    return;
  }
  const entry={
    name,
    email,
    password,
    dob,
    acceptedTermsAndConditions
  };
  userEntries.push(entry);
  localStorage.setItem('user-Entries',JSON.stringify(userEntries));
  displayUserEntries();
}
userForm.addEventListener('submit',saveUserForm);
displayUserEntries();
