// Navigation Toggle Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.querySelector('.side-bar');

    // Restore sidebar scroll position with delay to ensure DOM is ready
    if (sidebar) {
        const savedScrollPosition = sessionStorage.getItem('sidebarScrollPosition');
        if (savedScrollPosition) {
            const scrollPos = parseInt(savedScrollPosition, 10);

            // First attempt - immediate after DOM ready
            requestAnimationFrame(() => {
                sidebar.scrollTop = scrollPos;
            });

            // Second attempt - after a short delay for slower pages
            setTimeout(() => {
                sidebar.scrollTop = scrollPos;
            }, 150);

            // Third attempt - final fallback
            setTimeout(() => {
                sidebar.scrollTop = scrollPos;
            }, 300);
        }
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            sidebar.classList.toggle('mobile-open');
        });
    }

    // Navigation expander functionality - now on links themselves
    const expanderLinks = document.querySelectorAll('.nav-list-expander-link');

    expanderLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const listItem = this.parentElement;
            const childList = listItem.querySelector('.nav-list-child');

            if (childList) {
                // Toggle expanded state
                this.classList.toggle('expanded');
                childList.style.display = childList.style.display === 'block' ? 'none' : 'block';

                // Save state to localStorage
                const pageTitle = this.textContent.trim();
                const isExpanded = this.classList.contains('expanded');
                localStorage.setItem('nav-' + pageTitle, isExpanded);
            }
        });
    });

    // Restore navigation state from localStorage
    expanderLinks.forEach(link => {
        const listItem = link.parentElement;
        const pageTitle = link.textContent.trim();
        const savedState = localStorage.getItem('nav-' + pageTitle);

        if (savedState === 'true') {
            link.classList.add('expanded');
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
            const parentLink = parent.parentElement.querySelector('.nav-list-expander-link');
            if (parentLink) {
                parentLink.classList.add('expanded');
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

    // Save sidebar scroll position before navigation
    const navLinks = document.querySelectorAll('.nav-list-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (sidebar) {
                sessionStorage.setItem('sidebarScrollPosition', sidebar.scrollTop);
            }
        });
    });
});
