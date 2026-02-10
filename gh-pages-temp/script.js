// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('-translate-x-full');
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('-translate-x-full');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact form handling
document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const formMessage = document.getElementById('form-message');
    const submitBtn = this.querySelector('button[type="submit"]');

    // Basic validation
    if (!name || !email || !message) {
        formMessage.className = 'mt-4 p-4 rounded-lg bg-red-100 text-red-800';
        formMessage.textContent = 'Please fill in all required fields.';
        formMessage.classList.remove('hidden');
        return;
    }

    // Show loading state
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Determine API URL
    // If hosted (production) or served by backend (localhost:3000), relative path works.
    // But for local dev via Live Server (port 5500) or file://, we need absolute URL to backend.
    const isBackendServing = window.location.port === '3000'; // Assuming backend runs on 3000
    const isProduction = window.location.hostname !== 'localhost' && window.location.protocol !== 'file:';
    
    let apiUrl = '/api/contact';
    if (!isProduction && !isBackendServing) {
        apiUrl = 'http://localhost:3000/api/contact';
    }

    try {
        // Send data to backend
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, subject, message })
        });

        const responseText = await response.text();
        console.log('Raw Response:', responseText);

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            throw new Error(`Server returned non-JSON response: ${responseText.substring(0, 50)}...`);
        }

        if (response.ok) {
            // Success message
            formMessage.className = 'mt-4 p-4 rounded-lg bg-green-100 text-green-800';
            formMessage.textContent = 'Thank you! Your message has been sent successfully.';
            this.reset();
        } else {
            throw new Error(data.message || 'Something went wrong');
        }
    } catch (error) {
        console.error('Error:', error);
        formMessage.className = 'mt-4 p-4 rounded-lg bg-red-100 text-red-800';
        formMessage.textContent = `Failed to send message: ${error.message}. Ensure backend is running on port 3000.`;
    } finally {
        // Reset button state
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        formMessage.classList.remove('hidden');

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }
});

// Add interactive hover effects
document.querySelectorAll('.hover-lift').forEach(element => {
    element.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px)';
    });

    element.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});