// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const sidebar = document.querySelector('.side-bar');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function () {
      sidebar.classList.toggle('active');
      menuToggle.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }

  // Navigation expander functionality
  const expanders = document.querySelectorAll('.nav-list-expander');

  expanders.forEach(function (expander) {
    expander.addEventListener('click', function (e) {
      e.preventDefault();
      const parentItem = expander.closest('.nav-list-item');
      const childList = parentItem.querySelector(':scope > .nav-list-child');

      if (childList) {
        const isExpanded = childList.style.display === 'block';
        childList.style.display = isExpanded ? 'none' : 'block';
        expander.classList.toggle('expanded');
      }
    });
  });

  // Auto-expand active items and their parents
  function expandActiveItems() {
    const activeItems = document.querySelectorAll('.nav-list-item.active');

    activeItems.forEach(function (item) {
      // Expand this item's children if it has any
      const childList = item.querySelector(':scope > .nav-list-child');
      if (childList) {
        childList.style.display = 'block';
        const expander = item.querySelector(':scope > .nav-list-expander');
        if (expander) {
          expander.classList.add('expanded');
        }
      }

      // Expand all parent lists
      let parent = item.parentElement;
      while (parent) {
        if (parent.classList.contains('nav-list-child')) {
          parent.style.display = 'block';
          // Find and expand the parent's expander
          const parentItem = parent.closest('.nav-list-item');
          if (parentItem) {
            const expander = parentItem.querySelector(':scope > .nav-list-expander');
            if (expander) {
              expander.classList.add('expanded');
            }
          }
        }
        parent = parent.parentElement;
      }
    });
  }

  // Initialize - hide all child lists except active ones
  document.querySelectorAll('.nav-list-child').forEach(function (childList) {
    childList.style.display = 'none';
  });

  // Then expand active items
  expandActiveItems();

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (e) {
    if (sidebar && menuToggle) {
      if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    }
  });
});
