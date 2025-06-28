/* ==================================================
   SAHYADRI CONSTRUCTIONS - MAIN JAVASCRIPT FILE
   Handles:
   1. Mobile Navigation Toggle (Updated for Header Transparency)
   2. Closing Mobile Menu on Link Click
   3. Active Navigation Link Highlighting on Scroll
   4. AJAX Contact Form Submission
   5. Testimonial Slider Logic
   ================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ELEMENT SELECTIONS ---
    // We select all the elements we need right at the beginning for efficiency.
    const header = document.querySelector('.header'); // <-- ADDED THIS LINE
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navLinksContainer = document.querySelector('#nav-links');
    const navLinks = document.querySelectorAll('#nav-links a');
    const sections = document.querySelectorAll('section[id]');
    const contactForm = document.querySelector('#contact-form');
    const thankYouMessage = document.querySelector('#thank-you-message');


    // ===================================================================
    // --- 2. MOBILE NAVIGATION LOGIC (REVISED FOR HEADER TRANSPARENCY) ---
    // ===================================================================

    // Function to cleanly CLOSE the mobile menu
    const closeMobileMenu = () => {
        if (navLinksContainer.classList.contains('is-visible')) {
            header.classList.remove('menu-open'); // <-- MODIFIED: Removes class from header
            navLinksContainer.classList.remove('is-visible');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i><span class="sr-only">Menu</span>';
        }
    };

    // Function to cleanly OPEN the mobile menu
    const openMobileMenu = () => {
        header.classList.add('menu-open'); // <-- MODIFIED: Adds class to header
        navLinksContainer.classList.add('is-visible');
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i><span class="sr-only">Close menu</span>';
    };

    // Main event listener for the hamburger/close button
    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', () => {
            const isVisible = navLinksContainer.classList.contains('is-visible');
            if (isVisible) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    // Close the mobile menu automatically when a link inside it is clicked
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
    }

    // ===================================================================
    // --- END OF REVISED NAVIGATION LOGIC ---
    // ===================================================================


    // --- 3. ACTIVE LINK ON SCROLL (SCROLLSPY) LOGIC ---
    // This feature is UNCHANGED.
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
    // This feature is UNCHANGED.
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
    // This feature is UNCHANGED.
    // Ensure you have Swiper.js library included in your HTML for this to work
    if (typeof Swiper !== 'undefined') {
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
    }

});