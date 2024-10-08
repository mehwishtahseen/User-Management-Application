document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    // Data Validation
    if (!firstName || !lastName || !phone || !email || !address) {
        alert("All fields are required!");
        return;
    }

    const userDetails = {
        firstName,
        lastName,
        phone,
        email,
        address
    };

    // Store user details in local storage
    localStorage.setItem(email, JSON.stringify(userDetails));
    displayUserDetails();
    document.getElementById('userForm').reset();
});

// Display User Details
function displayUserDetails() {
    const userTable = document.getElementById('userTable');
    userTable.innerHTML = ''; // Clear existing table rows

    // Loop through local storage and populate the table
    for (let i = 0; i < localStorage.length; i++) {
        const email = localStorage.key(i);
        const user = JSON.parse(localStorage.getItem(email));

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>${user.address}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteUser('${email}')">Delete</button>
            </td>
        `;
        userTable.appendChild(row);
    }
}

// Delete User
function deleteUser(email) {
    localStorage.removeItem(email);
    displayUserDetails();
}

// Initial call to display any existing user details
displayUserDetails();
