/* ==================================================
   SAHYADRI CONSTRUCTIONS - MAIN JAVASCRIPT FILE
   Handles:
   1. Mobile Navigation Toggle
   2. Closing Mobile Menu on Link Click
   3. Active Navigation Link Highlighting on Scroll
   ================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ELEMENT SELECTIONS ---
    // We select all the elements we need right at the beginning for efficiency.
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navLinksContainer = document.querySelector('#nav-links');
    const navLinks = document.querySelectorAll('#nav-links a');
    const sections = document.querySelectorAll('section[id]');


    // --- 2. MOBILE NAVIGATION LOGIC ---
    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', () => {
            // Toggle the .is-visible class on the navigation menu
            navLinksContainer.classList.toggle('is-visible');

            // Check if the menu is now visible to update the accessibility attribute
            const isVisible = navLinksContainer.classList.contains('is-visible');
            navToggle.setAttribute('aria-expanded', isVisible);

            // Update the menu icon (hamburger or 'X')
            if (isVisible) {
                navToggle.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i><span class="sr-only">Close menu</span>';
            } else {
                navToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i><span class="sr-only">Menu</span>';
            }
        });
    }

    // Close the mobile menu automatically when a link is clicked
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinksContainer.classList.contains('is-visible')) {
                    navToggle.click(); // Simulate a click on the toggle to close it
                }
            });
        });
    }


    // --- 3. ACTIVE LINK ON SCROLL (SCROLLSPY) LOGIC ---
    const onScroll = () => {
        const scrollPosition = window.scrollY + 150; // Add an offset to highlight a bit earlier

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                const currentSectionId = '#' + section.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === currentSectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    // Listen for scroll events to run the onScroll function
    window.addEventListener('scroll', onScroll);

    // Run it once on load to set the initial state
    onScroll();

});