// menu toggle
const menuButton = document.querySelector('.menu-bar');
const menuToggleButton = document.querySelector('.menu-button');  

// Function to toggle the visibility of the menu
function toggleMenu() {
    menuButton.classList.toggle('menu-hidden');
}

// Scroll animation for smooth scrolling
const menuLinks = document.querySelectorAll('.menu-button');
menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        // Scroll smoothly to the target element
        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Update subtitle after a delay (for the subtitle example commented out)
window.addEventListener('load', () => {
    setTimeout(() => {
        const subtitle = document.querySelector('.sub-title');
        if (subtitle) {
            subtitle.innerHTML = "I'm a Computer Science major @ Morgan State University";
        }
    }, 2000); // Change subtitle text after 2 seconds
});

// to hide the menu bar initially and show it on a button click
menuToggleButton.addEventListener('click', toggleMenu);

// Optional: adding a class for hiding menu bar
document.addEventListener('DOMContentLoaded', () => {
    const menuBar = document.querySelector('.menu-bar');
    menuBar.classList.add('menu-hidden');  // Initially hide menu
});

//  to make the menu visible again after a delay
setTimeout(() => {
    const menuBar = document.querySelector('.menu-bar');
    menuBar.classList.remove('menu-hidden');
}, 5000);  