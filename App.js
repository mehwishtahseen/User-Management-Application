// document.addEventListener('DOMContentLoaded', () => {
//     const userForm = document.getElementById('userForm');
//     const userList = document.getElementById('userList');
//     let users = [];

//     // Add User
//     userForm.addEventListener('submit', function (e) {
//         e.preventDefault();

//         const user = {
//             firstName: document.getElementById('firstName').value,
//             lastName: document.getElementById('lastName').value,
//             phoneNumber: document.getElementById('phoneNumber').value,
//             email: document.getElementById('email').value,
//             address: document.getElementById('address').value
//         };

//         // Validate input fields
//         if (validateForm(user)) {
//             users.push(user);
//             displayUsers();
//             userForm.reset(); // Reset form after submission
//         }
//     });

//     // Validate Form
//     function validateForm(user) {
//         if (!user.firstName || !user.lastName || !user.phoneNumber || !user.email || !user.address) {
//             alert('Please fill all fields.');
//             return false;
//         }
//         if (!/^\d{10}$/.test(user.phoneNumber)) {
//             alert('Phone number must be 10 digits.');
//             return false;
//         }
//         if (!/\S+@\S+\.\S+/.test(user.email)) {
//             alert('Invalid email format.');
//             return false;
//         }
//         return true;
//     }

//     // Display Users
//     function displayUsers() {
//         userList.innerHTML = '';
//         users.forEach((user, index) => {
//             const li = document.createElement('li');
//             li.innerHTML = `${user.firstName} ${user.lastName} - ${user.phoneNumber} - ${user.email} - ${user.address} 
//                             <button onclick="deleteUser(${index})">Delete</button>`;
//             userList.appendChild(li);
//         });
//     }

//     // Delete User
//     window.deleteUser = function (index) {
//         users.splice(index, 1);
//         displayUsers();
//     };
// });

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
