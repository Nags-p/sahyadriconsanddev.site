// Select the DOM elements we need to work with
const navToggle = document.querySelector('.mobile-nav-toggle');
const navLinksContainer = document.querySelector('#nav-links');

// --- Main Toggle Functionality ---
navToggle.addEventListener('click', () => {
    // Toggle the .is-visible class on the nav links container
    navLinksContainer.classList.toggle('is-visible');

    // Check if the menu is now visible to update aria-expanded
    const isVisible = navLinksContainer.classList.contains('is-visible');
    navToggle.setAttribute('aria-expanded', isVisible);

    // Update the icon based on visibility
    if (isVisible) {
        // Change icon to 'X' (close)
        navToggle.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i><span class="sr-only">Close menu</span>';
    } else {
        // Change icon back to 'bars' (menu)
        navToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i><span class="sr-only">Menu</span>';
    }
});


// --- PRO-TIP: Close menu when a link is clicked ---
// This is great for single-page applications (like yours)
const navLinks = document.querySelectorAll('#nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // First, check if the menu is actually open
        if (navLinksContainer.classList.contains('is-visible')) {
            // If it's open, simulate a click on the toggle button to close it
            navToggle.click();
        }
    });
});