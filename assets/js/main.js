document.addEventListener('DOMContentLoaded', () => {
    // Loading screen with promise-based asset loading
    const loadingScreen = document.querySelector('.neural_loading_wrapper');
    
    // Function to check if images are loaded
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

    // Enhanced loading management
    Promise.all([
        preloadImages(),
        new Promise(resolve => setTimeout(resolve, 1000)) // Minimum loading time
    ])
        .then(() => {
            loadingScreen.classList.add('loaded');
        })
        .catch(error => {
            console.error('Loading error:', error);
            loadingScreen.classList.add('loaded'); // Fallback to hide loading screen
        });

    // Improved Intersection Observer with error handling
    const sections = document.querySelectorAll('.psychosis_section');
    const navLinks = document.querySelectorAll('.mind_melt_button');
    
    // Debounce function for performance
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const observer = new IntersectionObserver(debounce((entries) => {
        entries.forEach(entry => {
            try {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    if (!id) return; // Skip if no ID

                    entry.target.classList.add('visible');
                    
                    // Update navigation
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (!href) return; // Skip if no href

                        link.classList.toggle('active', href === `#${id}`);
                    });
                } else {
                    entry.target.classList.remove('visible');
                }
            } catch (error) {
                console.error('Observer error:', error);
            }
        });
    }, 100), { threshold: 0.3 });

    // Safe section observation
    sections.forEach(section => {
        try {
            observer.observe(section);
        } catch (error) {
            console.error('Failed to observe section:', error);
        }
    });

    // Smooth scroll with error handling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            try {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (!targetId) return; // Skip if no href

                const targetElement = document.querySelector(targetId);
                if (!targetElement) return; // Skip if target not found

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } catch (error) {
                console.error('Scroll error:', error);
            }
        });
    });

    // Add resize handler for mobile optimization
    const handleResize = debounce(() => {
        // Recalculate any necessary dimensions
        sections.forEach(section => {
            section.style.minHeight = `${window.innerHeight}px`;
        });
    }, 250);

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
});
