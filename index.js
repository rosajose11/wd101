
document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("user_form");

  // Load stored entries from localStorage or start with empty array
  let userEntries = JSON.parse(localStorage.getItem("user-entries")) || [];

  // Helper to calculate age from DOB string (yyyy-mm-dd)
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

  function displayStoredUsers() {
    const userList = document.getElementById("userList");
    userList.innerHTML = ""; // Clear existing list

    if (userEntries.length === 0) {
      userList.innerHTML = "<li>No users stored yet.</li>";
      return;
    }

    userEntries.forEach((user, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>User ${index + 1}:</strong> ${user.name}, Email: ${user.email}, DOB: ${user.dob}, Accepted Terms: ${
        user.acceptedterms ? "Yes" : "No"
      }
      `;
      userList.appendChild(li);
    });
  }

  const saveUserForm = (event) => {
    event.preventDefault();

    // Clear any previous custom validation messages
    const dobInput = document.getElementById("dob");
    dobInput.setCustomValidity("");

    // Validate DOB age between 18 and 55
    const dobValue = dobInput.value;
    const age = calculateAge(dobValue);

    if (age < 18 || age > 55) {
      dobInput.setCustomValidity(
        "Your age must be between 18 and 55 years to register."
      );
      dobInput.reportValidity();
      return; // Stop submission
    }

    if (!userForm.checkValidity()) {
      // If other validations fail, let browser show messages
      userForm.reportValidity();
      return;
    }

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const acceptedterms = document.getElementById("acceptterms").checked;

    const entry = {
      name,
      email,
      password,
      dob: dobValue,
      acceptedterms,
    };

    userEntries.push(entry); // push to loaded array
    localStorage.setItem("user-entries", JSON.stringify(userEntries)); // save updated array

    displayStoredUsers(); // update displayed list immediately

    userForm.reset();
    alert("Form submitted successfully!");
  };

  // Display users on page load
  displayStoredUsers();

  userForm.addEventListener("submit", saveUserForm);
});
