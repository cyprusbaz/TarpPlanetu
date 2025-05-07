document.addEventListener('DOMContentLoaded', function() {
    const cancelButtons = document.querySelectorAll('.btn-cancel');
    
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the parent trip-item element
            const tripItem = this.closest('.trip-item');
            
            // Add a fade-out animation
            tripItem.style.transition = 'opacity 0.5s ease';
            tripItem.style.opacity = '0';
            
            // Wait for animation to complete before removing the element
            setTimeout(() => {
                tripItem.remove();
            }, 500);
        });
    });
});