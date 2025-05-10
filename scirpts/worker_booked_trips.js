document.addEventListener('DOMContentLoaded', function() {
    const cancelButtons = document.querySelectorAll('.btn-cancel');
    const confirmButtons = document.querySelectorAll('.btn-confirm');
    const profileIcon = document.querySelector('.profile-icon');
    
    // Create modal elements
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.display = 'none';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalTitle = document.createElement('h3');
    modalTitle.textContent = 'Patvirtinkite atšaukimą';
    
    const modalText = document.createElement('p');
    modalText.textContent = 'Prašome nurodyti atšaukimo priežastį:';
    
    const textBox = document.createElement('textarea');
    textBox.className = 'cancel-reason';
    textBox.placeholder = 'Įveskite atšaukimo priežastį...';
    
    const confirmButton = document.createElement('button');
    confirmButton.className = 'btn btn-confirm modal-confirm';
    confirmButton.textContent = 'Patvirtinti';
    confirmButton.disabled = true; // Initially disabled
    
    const cancelButton = document.createElement('button');
    cancelButton.className = 'btn btn-cancel modal-cancel';
    cancelButton.textContent = 'Atšaukti';
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'modal-buttons';
    buttonContainer.appendChild(confirmButton);
    buttonContainer.appendChild(cancelButton);
    
    // Append elements to modal
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalText);
    modalContent.appendChild(textBox);
    modalContent.appendChild(buttonContainer);
    modalOverlay.appendChild(modalContent);
    
    // Add modal to body
    document.body.appendChild(modalOverlay);
    
    // Add CSS styles for modal
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .modal-content {
            background-color: rgba(10, 15, 71, 0.95);
            border-radius: 16px;
            padding: 2rem;
            width: 90%;
            max-width: 500px;
            color: white;
            box-shadow: 0 0 20px rgba(255, 204, 0, 0.3);
        }
        
        .modal-content h3 {
            margin-top: 0;
            color: #ffcc00;
        }
        
        .cancel-reason {
            width: 100%;
            min-height: 100px;
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid #ffcc00;
            border-radius: 8px;
            padding: 10px;
            margin: 15px 0;
            color: white;
            resize: vertical;
        }
        
        .modal-buttons {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 15px;
        }
    `;
    document.head.appendChild(modalStyle);
    
    // Current trip item to be removed
    let currentTripItem = null;
    
    // Event listeners for cancel buttons
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Store reference to trip item
            currentTripItem = this.closest('.trip-item');
            
            // Show modal
            modalOverlay.style.display = 'flex';
            textBox.value = ''; // Clear text box
            confirmButton.disabled = true; // Reset button state
            
            // Focus on text box
            textBox.focus();
        });
    });
    
    // Enable confirm button only when text is entered
    textBox.addEventListener('input', function() {
        confirmButton.disabled = this.value.trim() === '';
    });
    
    // Close modal when clicking close button
    cancelButton.addEventListener('click', function() {
        modalOverlay.style.display = 'none';
    });
    
    // Handle confirmation
    confirmButton.addEventListener('click', function() {
        if (currentTripItem && textBox.value.trim() !== '') {
            // Remove any confirmed status if present
            currentTripItem.classList.remove('confirmed');
            const existingBadge = currentTripItem.querySelector('.status-badge');
            if (existingBadge) {
                existingBadge.remove();
            }
            
            // Mark trip as canceled
            currentTripItem.classList.add('canceled');
            
            // Create status badge
            const statusBadge = document.createElement('div');
            statusBadge.className = 'status-badge canceled-badge';
            statusBadge.textContent = 'Atšaukta';
            
            // Add status badge to trip item
            const tripTitle = currentTripItem.querySelector('.trip-title');
            tripTitle.parentNode.insertBefore(statusBadge, tripTitle.nextSibling);
            
            // Change button states
            const buttonsContainer = currentTripItem.querySelector('.trip-actions');
            const confirmBtn = buttonsContainer.querySelector('.btn-confirm');
            const confirmedBtn = buttonsContainer.querySelector('.btn-confirmed');
            const cancelBtn = buttonsContainer.querySelector('.btn-cancel');
            
            // Update cancel button
            cancelBtn.textContent = 'Atšaukta';
            cancelBtn.classList.remove('btn-cancel');
            cancelBtn.classList.add('btn-canceled');
            cancelBtn.disabled = true;
            
            // Disable confirm button if it's not already confirmed
            if (confirmBtn && !confirmBtn.disabled) {
                confirmBtn.disabled = true;
                confirmBtn.classList.add('btn-disabled');
            }
            
            // Update an already-confirmed button if it exists
            if (confirmedBtn) {
                confirmedBtn.textContent = 'Patvirtinimas atšauktas';
                confirmedBtn.classList.remove('btn-confirmed');
                confirmedBtn.classList.add('btn-disabled');
            }
            
            // Create a toast notification
            const toast = document.createElement('div');
            toast.className = 'toast-notification cancel-toast';
            toast.textContent = 'Kelionė atšaukta sėkmingai!';
            document.body.appendChild(toast);
            
            // Show toast
            setTimeout(() => {
                toast.classList.add('show');
            }, 10);
            
            // Hide toast after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 500);
            }, 3000);
            
            // Close modal
            modalOverlay.style.display = 'none';
            
            // Store cancellation reason if needed
            currentTripItem.dataset.cancellationReason = textBox.value.trim();
            
            // Reset current trip item
            currentTripItem = null;
        }
    });
    
    // Close modal when clicking outside
    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            modalOverlay.style.display = 'none';
        }
    });
    
    // Close modal on ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modalOverlay.style.display === 'flex') {
            modalOverlay.style.display = 'none';
        }
    });
    
    // Profile dropdown functionality
    function setupProfileDropdown() {
        // Create profile dropdown elements
        const profileDropdown = document.createElement('div');
        profileDropdown.className = 'profile-dropdown';
        profileDropdown.style.display = 'none';
        
        const logoutButton = document.createElement('a');
        logoutButton.className = 'profile-button';
        logoutButton.textContent = 'Atsijungti';
        logoutButton.href = 'index.html';
        
        const editProfileButton = document.createElement('a');
        editProfileButton.className = 'profile-button';
        editProfileButton.textContent = 'Redaguoti profilį';
        editProfileButton.href = '#'; // Placeholder until page is created
        
        // Append buttons to dropdown
        profileDropdown.appendChild(editProfileButton);
        profileDropdown.appendChild(logoutButton);
        
        // Add dropdown to body
        document.body.appendChild(profileDropdown);
        
        // Add CSS styles for profile dropdown
        const dropdownStyle = document.createElement('style');
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
        profileIcon.addEventListener('click', function(e) {
            e.preventDefault();
            if (profileDropdown.style.display === 'none') {
                profileDropdown.style.display = 'block';
            } else {
                profileDropdown.style.display = 'none';
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!profileIcon.contains(event.target) && !profileDropdown.contains(event.target)) {
                profileDropdown.style.display = 'none';
            }
        });
        
        // Close dropdown on ESC key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && profileDropdown.style.display === 'block') {
                profileDropdown.style.display = 'none';
            }
        });
    }
    
    // Initialize profile dropdown
    if (profileIcon) {
        setupProfileDropdown();
    }
    
    // Confirmation button functionality
    confirmButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the parent trip-item element
            const tripItem = this.closest('.trip-item');
            
            // Skip if this is the modal confirm button or already confirmed
            if (button.classList.contains('modal-confirm') || tripItem.classList.contains('confirmed')) {
                return;
            }
            
            // Create a toast notification
            const toast = document.createElement('div');
            toast.className = 'toast-notification';
            toast.textContent = 'Kelionė patvirtinta sėkmingai!';
            document.body.appendChild(toast);
            
            // Show toast
            setTimeout(() => {
                toast.classList.add('show');
            }, 10);
            
            // Hide toast after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 500);
            }, 3000);
            
            // Mark trip as confirmed
            tripItem.classList.add('confirmed');
            
            // Change button states
            const buttonsContainer = this.closest('.trip-actions');
            
            // Update confirm button to show it's confirmed
            this.textContent = 'Patvirtinta';
            this.classList.remove('btn-confirm');
            this.classList.add('btn-confirmed');
            this.disabled = true;
            
            // Create status badge
            const statusBadge = document.createElement('div');
            statusBadge.className = 'status-badge';
            statusBadge.textContent = 'Patvirtinta';
            
            // Add status badge to trip item
            const tripTitle = tripItem.querySelector('.trip-title');
            tripTitle.parentNode.insertBefore(statusBadge, tripTitle.nextSibling);
            
            // Optional: Apply visual changes to the entire trip item
            tripItem.classList.add('confirmed');
        });
    });
    
    // Add CSS for confirmation elements
    const confirmStyles = document.createElement('style');
    confirmStyles.textContent = `
        .confirmed {
            background-color: rgba(10, 15, 71, 0.8);
            position: relative;
            padding-left: 15px !important;
            margin-left: -15px;
            box-sizing: border-box;
        }
        
        .confirmed::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background-color: #4CAF50;
        }
        
        .canceled {
            background-color: rgba(10, 15, 71, 0.8);
            position: relative;
            padding-left: 15px !important;
            margin-left: -15px;
            box-sizing: border-box;
        }
        
        .canceled::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background-color: #FF5252;
        }
        
        .btn-confirmed {
            background-color: #4CAF50;
            color: white;
            cursor: default;
        }
        
        .btn-canceled {
            background-color: #FF5252;
            color: white;
            cursor: default;
        }
        
        .btn-disabled {
            background-color: #888888;
            color: #dddddd;
            cursor: default;
            opacity: 0.7;
        }
        
        .status-badge {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            font-size: 12px;
            font-weight: bold;
            padding: 4px 8px;
            border-radius: 10px;
            margin-bottom: 10px;
            margin-right: 10px;
        }
        
        .canceled-badge {
            background-color: #FF5252;
        }
        
        .toast-notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background-color: #4CAF50;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 1100;
            opacity: 0;
            transition: transform 0.5s ease, opacity 0.5s ease;
        }
        
        .toast-notification.cancel-toast {
            background-color: #FF5252;
        }
        
        .toast-notification.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(confirmStyles);
});