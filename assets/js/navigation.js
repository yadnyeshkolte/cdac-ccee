// Navigation Toggle Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.querySelector('.side-bar');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            sidebar.classList.toggle('mobile-open');
        });
    }

    // Navigation expander functionality
    const expanders = document.querySelectorAll('.nav-list-expander');

    expanders.forEach(expander => {
        expander.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const listItem = this.parentElement;
            const childList = listItem.querySelector('.nav-list-child');

            if (childList) {
                // Toggle expanded state
                this.classList.toggle('expanded');
                childList.style.display = childList.style.display === 'block' ? 'none' : 'block';

                // Save state to localStorage
                const pageTitle = listItem.querySelector('.nav-list-link').textContent.trim();
                const isExpanded = this.classList.contains('expanded');
                localStorage.setItem('nav-' + pageTitle, isExpanded);
            }
        });
    });

    // Restore navigation state from localStorage
    expanders.forEach(expander => {
        const listItem = expander.parentElement;
        const pageTitle = listItem.querySelector('.nav-list-link').textContent.trim();
        const savedState = localStorage.getItem('nav-' + pageTitle);

        if (savedState === 'true') {
            expander.classList.add('expanded');
            const childList = listItem.querySelector('.nav-list-child');
            if (childList) {
                childList.style.display = 'block';
            }
        }
    });

    // Auto-expand active item's parents
    const activeLink = document.querySelector('.nav-list-link.active');
    if (activeLink) {
        let parent = activeLink.closest('.nav-list-child');
        while (parent) {
            parent.style.display = 'block';
            const parentExpander = parent.parentElement.querySelector('.nav-list-expander');
            if (parentExpander) {
                parentExpander.classList.add('expanded');
            }
            parent = parent.parentElement.closest('.nav-list-child');
        }
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (sidebar && sidebar.classList.contains('mobile-open')) {
            if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                sidebar.classList.remove('mobile-open');
            }
        }
    });
});
