// ========================================
// AI Navigation Event Website - Main JS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    initMobileNav();

    // Smooth Scrolling
    initSmoothScroll();

    // FAQ Accordion
    initFAQ();

    // Flow Tabs
    initFlowTabs();

    // Checklist Persistence
    initChecklist();

    // Active Nav Link on Scroll
    initActiveNav();

    // Navbar Shadow on Scroll
    initNavbarShadow();
});

// ========================================
// Mobile Navigation
// ========================================
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ========================================
// Smooth Scrolling
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            const navHeight = document.getElementById('navbar')?.offsetHeight || 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ========================================
// FAQ - answers are always visible
// ========================================
function initFAQ() {
    // No toggle needed; all answers displayed by default
}

// ========================================
// Flow Tabs
// ========================================
function initFlowTabs() {
    const tabs = document.querySelectorAll('.flow-tab');
    const contents = document.querySelectorAll('.flow-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-tab');

            // Update tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update content
            contents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetId) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// ========================================
// Checklist Persistence
// ========================================
function initChecklist() {
    const checkboxes = document.querySelectorAll('.checklist-items input[type="checkbox"]');

    // Load saved states
    checkboxes.forEach((checkbox, index) => {
        const savedState = localStorage.getItem(`checklist-${index}`);
        if (savedState === 'true') {
            checkbox.checked = true;
        }

        // Save state on change
        checkbox.addEventListener('change', () => {
            localStorage.setItem(`checklist-${index}`, checkbox.checked);
        });
    });
}

// ========================================
// Active Nav Link on Scroll
// ========================================
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
}

// ========================================
// Navbar Shadow on Scroll
// ========================================
function initNavbarShadow() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========================================
// Intersection Observer for Animations
// ========================================
if ('IntersectionObserver' in window) {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}
