/* ==================================================
   SAHYADRI CONSTRUCTIONS - MAIN JAVASCRIPT FILE
   Handles:
   1. Mobile Navigation Toggle
   2. Closing Mobile Menu on Link Click
   3. Active Navigation Link Highlighting on Scroll
   4. AJAX Contact Form Submission
   ================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ELEMENT SELECTIONS ---
    // We select all the elements we need right at the beginning for efficiency.
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const header = document.querySelector('.header'); // Assuming you have a header element with this class
    const navLinksContainer = document.querySelector('#nav-links');
    const navLinks = document.querySelectorAll('#nav-links a');
    const sections = document.querySelectorAll('section[id]');
    const contactForm = document.querySelector('#contact-form');
    const thankYouMessage = document.querySelector('#thank-you-message');

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


    // --- HEADER SCROLL EFFECT ---
    // This feature requires the .header selection from your Element Selections block.
    if (header) {
        const handleScroll = () => {
        // Check if the user has scrolled more than 100px from the top
            if (window.scrollY > 420) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

    // Listen for scroll events on the window
        window.addEventListener('scroll', handleScroll);
    
    // Run the function once on load in case the page is reloaded halfway down
        handleScroll();
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


    // --- 4. AJAX CONTACT FORM SUBMISSION ---
    if (contactForm && thankYouMessage) {
        contactForm.addEventListener('submit', (event) => {
            // 1. Prevent the default browser action (which is to navigate away)
            event.preventDefault();

            // 2. Get the form data
            const formData = new FormData(contactForm);
            
            // 3. Send the data in the background using fetch()
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' // Tell FormSubmit to reply in a way JS can understand
                }
            }).then(response => {
                if (response.ok) {
                    // 4. If the submission was successful:
                    contactForm.style.display = 'none'; // Hide the form
                    thankYouMessage.classList.remove('hidden'); // Show the thank you message
                } else {
                    // If there was a server-side error
                    alert('Oops! There was a problem submitting your form. Please try again later.');
                }
            }).catch(error => {
                // If there was a network error (e.g., user is offline)
                alert('Oops! There was a problem with your connection. Please try again.');
            });
        });
    }


    // --- 5. TESTIMONIAL SLIDER LOGIC ---
    // Inside the main 'DOMContentLoaded' listener in main.js

// --- 5. SWIPER TESTIMONIAL SLIDER ---
const swiper = new Swiper('.testimonial-swiper', {
    // Optional parameters
    loop: true,             // Makes the slider infinite
    grabCursor: true,       // Shows a "grab" cursor on hover
    centeredSlides: true,   // Centers the active slide
    
    // How many slides to show. 'auto' works well with our CSS.
    slidesPerView: 'auto',

    // Space between slides
    spaceBetween: 20,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 768px
        768: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        // when window width is >= 1024px
        1024: {
            slidesPerView: 3,
            spaceBetween: 40
        }
    }
});

});