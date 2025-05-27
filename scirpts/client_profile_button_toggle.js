const profileIcon = document.querySelector(".profile-icon");

function setupProfileDropdown() {
  // Create profile dropdown elements
  const profileDropdown = document.createElement("div");
  profileDropdown.className = "profile-dropdown";
  profileDropdown.style.display = "none";

  const logoutButton = document.createElement("a");
  logoutButton.className = "profile-button";
  logoutButton.textContent = "Atsijungti";
  logoutButton.href = "index.html";

  const editProfileButton = document.createElement("a");
  editProfileButton.className = "profile-button";
  editProfileButton.textContent = "Redaguoti profilį";
  editProfileButton.href = "client_edit_profile.html";

  // Append buttons to dropdown
  profileDropdown.appendChild(editProfileButton);
  profileDropdown.appendChild(logoutButton);

  // Add dropdown to body
  document.body.appendChild(profileDropdown);

  // Add CSS styles for profile dropdown
  const dropdownStyle = document.createElement("style");
  dropdownStyle.textContent = `
            .profile-dropdown {
                position: absolute;
                top: 70px;
                right: 20px;
                background-color: rgba(10, 15, 71, 0.95);
                border-radius: 8px;
                padding: 10px;
                display: flex;
                flex-direction: column;
                min-width: 180px;
                box-shadow: 0 0 10px rgba(255, 204, 0, 0.3);
                z-index: 900;
            }
            
            .profile-button {
                color: white;
                text-decoration: none;
                padding: 10px 15px;
                border-radius: 5px;
                margin: 2px 0;
                font-weight: bold;
                transition: background-color 0.2s;
            }
            
            .profile-button:hover {
                background-color: rgba(255, 204, 0, 0.2);
            }
        `;
  document.head.appendChild(dropdownStyle);

  // Toggle dropdown on profile icon click
  profileIcon.addEventListener("click", function (e) {
    e.preventDefault();
    if (profileDropdown.style.display === "none") {
      profileDropdown.style.display = "block";
    } else {
      profileDropdown.style.display = "none";
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !profileIcon.contains(event.target) &&
      !profileDropdown.contains(event.target)
    ) {
      profileDropdown.style.display = "none";
    }
  });

  // Close dropdown on ESC key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && profileDropdown.style.display === "block") {
      profileDropdown.style.display = "none";
    }
  });
}

// Initialize profile dropdown
if (profileIcon) {
  setupProfileDropdown();
}
