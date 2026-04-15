// Initial commit: set up API fetch functionality

// Function to get users from API
function getUsers() {

    // Add commit: make API request using fetch
    fetch("https://jsonplaceholder.typicode.com/users")

        // Add commit: convert response to JSON
        .then(response => response.json())

        // Add commit: handle and display data
        .then(data => {
            displayUsers(data);
        })

        // Add commit: handle errors
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}


// Function to display users on page
function displayUsers(users) {

    const container = document.getElementById("userContainer");

    // Clear previous results
    container.innerHTML = "";

    // Loop through users
    users.forEach(user => {

        // Create card
        const card = document.createElement("div");
        card.classList.add("userCard");

        // Add user info
        card.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>City:</strong> ${user.address.city}</p>
        `;

        // Add commit: append user cards to DOM
        container.appendChild(card);
    });
}