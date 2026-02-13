// External JavaScript file for IronPulse Gym Ghana

// Navigation Logic
function navigateTo(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        setTimeout(() => {
            if (!page.classList.contains('active')) {
                page.style.display = 'none';
            }
        }, 500);
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    targetPage.style.display = 'block';
    setTimeout(() => {
        targetPage.classList.add('active');
    }, 10);
    
    // Update nav active states
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active', 'text-orange-500');
        link.classList.add('text-gray-300');
        if (link.dataset.page === pageId) {
            link.classList.add('active', 'text-orange-500');
            link.classList.remove('text-gray-300');
        }
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Animate elements in new page
    setTimeout(() => {
        animateElements();
    }, 100);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('open');
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target + (target > 100 ? '+' : '');
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for animations
function animateElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card-hover, .group').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Form Handling
function handleContactSubmit(e) {
    e.preventDefault();
    showToast('Message sent successfully! We\'ll get back to you soon.');
    document.getElementById('contactForm').reset();
}

function selectPlan(plan) {
    showToast(`Great choice! You've selected the ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan. Redirecting to registration...`);
    setTimeout(() => {
        navigateTo('contact');
    }, 1500);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.innerText = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-black/95', 'shadow-lg');
        navbar.classList.remove('bg-black/80');
    } else {
        navbar.classList.remove('bg-black/95', 'shadow-lg');
        navbar.classList.add('bg-black/80');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    animateCounters();
    animateElements();
    
    // Check for hash in URL
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        navigateTo(hash);
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href').replace('#', '');
        if (target) {
            navigateTo(target);
        }
    });
});
