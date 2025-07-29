document.addEventListener('DOMContentLoaded', function() {

    // --- 1. SMOOTH SCROLLING for nav links ---
    const navLinks = document.querySelectorAll('#main-nav a, .nav-logo');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Adjust for fixed navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 2. DYNAMIC FADE-IN ANIMATIONS ON SCROLL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach(el => observer.observe(el));


    // --- 3. "BACK TO TOP" BUTTON ---
    const backToTopButton = document.createElement('a');
    backToTopButton.id = 'back-to-top-btn';
    backToTopButton.href = '#home';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // --- 4. ACTIVE NAVIGATION HIGHLIGHTING ON SCROLL ---
    const sections = document.querySelectorAll('main > section, header#home');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.id;
                document.querySelectorAll('#main-nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { 
        rootMargin: '-40% 0px -60% 0px'
    });

    sections.forEach(section => navObserver.observe(section));
});
