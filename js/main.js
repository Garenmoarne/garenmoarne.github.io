class SmoothScroll {
    constructor() {
        this.sections = document.querySelectorAll('.fullscreen-section');
        this.navLinks = document.querySelectorAll('.neon-link');
        this.setupEventListeners();
        this.setupIntersectionObserver();
    }

    setupEventListeners() {
        document.addEventListener('scroll', this.handleScroll.bind(this));
        this.navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.activateSection(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.sections.forEach(section => observer.observe(section));
    }

    activateSection(section) {
        // Update navigation and section states
    }
}

// Initialize the scroll system
new SmoothScroll();
