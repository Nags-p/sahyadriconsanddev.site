// This script handles the mobile navigation toggle.

const navLinks = document.querySelector('#nav-links');
const navToggle = document.querySelector('.mobile-nav-toggle');

navToggle.addEventListener('click', () => {
    // Check the current state of the navigation menu
    const isVisible = navLinks.getAttribute('data-visible');

    // If the menu is hidden, show it
    if (isVisible === "false" || isVisible === null) {
        navLinks.setAttribute('data-visible', true);
        navToggle.setAttribute('aria-expanded', true);
        // Change the icon to a close 'X'
        navToggle.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i><span class="sr-only">Close menu</span>';
    } 
    // If the menu is visible, hide it
    else {
        navLinks.setAttribute('data-visible', false);
        navToggle.setAttribute('aria-expanded', false);
        // Change the icon back to the hamburger 'bars'
        navToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i><span class="sr-only">Menu</span>';
    }
});