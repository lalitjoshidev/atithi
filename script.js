document.addEventListener('DOMContentLoaded', function() {
    // Global variables
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let lastScroll = 0;

    // Language Toggle Functionality
    const languageToggle = document.querySelector('.language-toggle');
    const body = document.body;
    let currentLang = 'en';

    // Hide Hindi text by default
    document.querySelectorAll('.hi').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.en').forEach(el => el.style.display = 'block');

    languageToggle.addEventListener('click', function() {
        if (currentLang === 'en') {
            currentLang = 'hi';
            languageToggle.querySelector('.lang-text').textContent = 'HI';
            body.classList.add('hindi-active');
        } else {
            currentLang = 'en';
            languageToggle.querySelector('.lang-text').textContent = 'EN';
            body.classList.remove('hindi-active');
        }

        // Update navigation links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.textContent = link.dataset[currentLang];
        });
    });

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        }
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
            if (currentScroll > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 1)';
                navbar.style.boxShadow = 'none';
            }
        }
        lastScroll = currentScroll;
    });

    // Project Filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Contact Form Handling
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message. We will get back to you soon!');
            inquiryForm.reset();
        });
    }

    // Form input animation
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // Smooth scroll with offset
    function scrollToSection(target) {
        const headerHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // Update scroll event listeners
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                scrollToSection(target);
            }
        });
    });

    // Section visibility on scroll
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px'
    });

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Make introduction section visible immediately
    const introSection = document.querySelector('#introduction');
    if (introSection) {
        introSection.classList.add('visible');
        // Remove any transform or opacity styles that might be affecting visibility
        introSection.style.transform = 'none';
        introSection.style.opacity = '1';
    }

    // Make hero section visible immediately
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.visibility = 'visible';
    }
});
