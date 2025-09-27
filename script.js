// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slideshows
    const slideshowContainers = document.querySelectorAll('.slideshow-container');
    const slideshows = [];
    
    // Set up each slideshow
    slideshowContainers.forEach((container, galleryIndex) => {
        const slides = container.querySelectorAll('.slide');
        const dots = document.querySelectorAll(`.slide-dots:nth-of-type(${galleryIndex + 1}) .dot`);
        
        // Store slideshow data
        slideshows.push({
            slides: slides,
            dots: document.querySelectorAll(`.project:nth-of-type(${galleryIndex + 1}) .dot`),
            currentSlide: 0
        });
        
        // Show first slide
        if (slides.length > 0) {
            slides[0].classList.add('active');
        }
    });
    
    // Make slideshow functions global
    window.slideshows = slideshows;
    window.changeSlide = changeSlide;
    window.currentSlide = currentSlide;
    
    // Auto advance slideshows
    slideshows.forEach((slideshow, index) => {
        setInterval(() => {
            changeSlide(1, index);
        }, 5000); // Change slide every 5 seconds
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const headerHeight = document.querySelector('header').offsetHeight;
            
            window.scrollTo({
                top: targetSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        });
    });
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For now, we'll just show an alert
            alert('आपला संदेश यशस्वीरित्या पाठवला गेला आहे! धन्यवाद, ' + name);
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Add scroll reveal animation
    const revealElements = document.querySelectorAll('.leader-card, .team-member, .project');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles for animation
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Call the function on load and scroll
    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', revealOnScroll);
    
    // Add sticky header effect
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '0.5rem 5%';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '1rem 5%';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});

// Slideshow functions
function changeSlide(n, galleryIndex) {
    const slideshow = window.slideshows[galleryIndex];
    let newIndex = slideshow.currentSlide + n;
    
    // Handle wrap-around
    if (newIndex >= slideshow.slides.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = slideshow.slides.length - 1;
    }
    
    currentSlide(newIndex, galleryIndex);
}

function currentSlide(n, galleryIndex) {
    const slideshow = window.slideshows[galleryIndex];
    
    // Hide all slides
    slideshow.slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    slideshow.dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show the current slide
    slideshow.slides[n].classList.add('active');
    slideshow.dots[n].classList.add('active');
    
    // Update current slide index
    slideshow.currentSlide = n;
}