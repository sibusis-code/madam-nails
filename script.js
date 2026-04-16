// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('open');
            menuToggle.classList.remove('open');
        }
    });
});

// Navbar scroll class
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Form Submission Handler
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Show success message (you can customize this)
        alert('Thank you for your booking request! We will contact you shortly to confirm your appointment.');
        
        // Reset form
        this.reset();
        
        // In a real application, you would send this data to a server
        // Example:
        // fetch('/api/booking', {
        //     method: 'POST',
        //     body: formData
        // }).then(response => response.json())
        //   .then(data => console.log(data));
    });
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.service-card, .gallery-item, .info-card, .pricing-category, .stat');
revealElements.forEach(el => el.classList.add('reveal'));

const revealOnScroll = () => {
    const wh = window.innerHeight;
    revealElements.forEach(el => {
        if (el.getBoundingClientRect().top < wh - 80) {
            el.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Gallery Image Click Handler (Simple lightbox effect)
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
            // You can implement a lightbox/modal here
            // For now, we'll just log it
            console.log('Gallery item clicked:', img.src);
            // Example: open in new tab
            // window.open(img.src, '_blank');
        }
    });
});

// Intersection Observer for better scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
