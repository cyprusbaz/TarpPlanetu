document.addEventListener('DOMContentLoaded', function() {
    // Setup all dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      const menu = dropdown.querySelector('.dropdown-menu');
      const items = dropdown.querySelectorAll('.dropdown-item');
      const text = dropdown.querySelector('.dropdown-text');
      
      // Toggle dropdown menu
      toggle.addEventListener('click', function() {
        // Close all other dropdowns
        document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
          if (openMenu !== menu) {
            openMenu.classList.remove('show');
          }
        });
        
        menu.classList.toggle('show');
      });
      
      // Select item from dropdown
      items.forEach(item => {
        item.addEventListener('click', function() {
          text.textContent = this.textContent;
          menu.classList.remove('show');
        });
      });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
          menu.classList.remove('show');
        });
      }
    });
    
    // Setup buttons
    const editBtn = document.querySelector('button.primary');
    editBtn.addEventListener('click', function() {
      alert('Redaguojama kelionė į Neptūną');
    });
    
    const deleteBtn = document.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', function() {
      if(confirm('Ar tikrai norite ištrinti kelionę?')) {
        alert('Kelionė ištrinta');
      }
    });
  });