// Utility functions
const utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Main application class
class WebsiteController {
    constructor() {
        this.loadingScreen = document.querySelector('.neural_loading_wrapper');
        this.sections = document.querySelectorAll('.psychosis_section');
        this.navLinks = document.querySelectorAll('.mind_melt_button');
        this.isLoading = true;
        this.observers = new Map();
        
        this.init();
    }

    async init() {
        try {
            await this.setupLoading();
            this.setupNavigation();
            this.setupIntersectionObserver();
            this.setupEventListeners();
        } catch (error) {
            console.error('Initialization error:', error);
            this.handleError(error);
        }
    }

    async setupLoading() {
        const preloadImages = () => {
            const images = document.querySelectorAll('img');
            const promises = Array.from(images).map(img => {
                return new Promise((resolve, reject) => {
                    if (img.complete) {
                        resolve();
                    } else {
                        img.addEventListener('load', resolve);
                        img.addEventListener('error', reject);
                    }
                });
            });
            return Promise.all(promises);
        };

        try {
            await Promise.all([
                preloadImages(),
                new Promise(resolve => setTimeout(resolve, 1000))
            ]);
            this.completeLoading();
        } catch (error) {
            console.error('Loading error:', error);
            this.completeLoading(); // Fallback
        }
    }

    completeLoading() {
        this.isLoading = false;
        this.loadingScreen?.classList.add('loaded');
    }

    setupNavigation() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });
    }

    setupIntersectionObserver() {
        const observerCallback = utils.throttle((entries) => {
            entries.forEach(entry => {
                try {
                    const id = entry.target.id;
                    if (!id) return;

                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        this.updateNavigation(id);
                    } else {
                        entry.target.classList.remove('visible');
                    }
                } catch (error) {
                    console.error('Observer error:', error);
                }
            });
        }, 100);

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.3,
            rootMargin: '-20% 0px'
        });

        this.sections.forEach(section => {
            try {
                observer.observe(section);
                this.observers.set(section, observer);
            } catch (error) {
                console.error('Failed to observe section:', error);
            }
        });
    }

    updateNavigation(activeId) {
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'true');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    handleNavClick(e) {
        try {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('href');
            if (!targetId) return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } catch (error) {
            console.error('Navigation error:', error);
        }
    }

    setupEventListeners() {
        // Resize handler
        const handleResize = utils.debounce(() => {
            this.sections.forEach(section => {
                section.style.minHeight = `${window.innerHeight}px`;
            });
        }, 250);

        window.addEventListener('resize', handleResize);
        handleResize();

        // Cleanup on page hide
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.cleanup();
            }
        });
    }

    cleanup() {
        // Disconnect all observers
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
    }

    handleError(error) {
        // Add error handling UI if needed
        console.error('Application error:', error);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new WebsiteController());
} else {
    new WebsiteController();
}
