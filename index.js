document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("user_form");
  let userEntries = JSON.parse(localStorage.getItem("user-entries")) || [];

  function calculateAge(dobStr) {
    const today = new Date();
    const dob = new Date(dobStr);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }

  function displayEntries() {
    const entries = JSON.parse(localStorage.getItem("user-entries")) || [];
    const container = document.getElementById("user_details");

    if (entries.length === 0) {
      container.innerHTML = "<p>No users stored yet.</p>";
      return;
    }

    const tableRows = entries.map(entry => {
      return `
        <tr>
          <td class="border px-4 py-2">${entry.name}</td>
          <td class="border px-4 py-2">${entry.email}</td>
          <td class="border px-4 py-2">${entry.password}</td>
          <td class="border px-4 py-2">${entry.dob}</td>
          <td class="border px-4 py-2">${entry.acceptedterms ? "Yes" : "No"}</td>
        </tr>
      `;
    }).join("");

    const table = `
      <table class="table-auto w-full border border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Email</th>
            <th class="border px-4 py-2">Password</th>
            <th class="border px-4 py-2">DOB</th>
            <th class="border px-4 py-2">Accepted Terms</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;

    container.innerHTML = table;
  }

  const saveUserForm = (event) => {
    event.preventDefault();

    const dobInput = document.getElementById("dob");
    const dobValue = dobInput.value;
    const age = calculateAge(dobValue);

    dobInput.setCustomValidity("");
    if (age < 18 || age > 55) {
      dobInput.setCustomValidity("Your age must be between 18 and 55 years to register.");
      dobInput.reportValidity();
      return;
    }

    if (!userForm.checkValidity()) {
      userForm.reportValidity();
      return;
    }

    const entry = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      dob: dobValue,
      acceptedterms: document.getElementById("acceptterms").checked
    };

    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));

    userForm.reset();
    alert("Form submitted successfully!");

    displayEntries();
  };

  userForm.addEventListener("submit", saveUserForm);
  displayEntries(); // show on page load
});

