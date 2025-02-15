document.addEventListener('DOMContentLoaded', () => {
    // Loading screen
    const loadingScreen = document.querySelector('.neural_loading_wrapper');
    
    // Simulate loading time (you can adjust this based on actual asset loading)
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
    }, 2000);

    // Intersection Observer for sections
    const sections = document.querySelectorAll('.psychosis_section');
    const navLinks = document.querySelectorAll('.mind_melt_button');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                entry.target.classList.add('visible');
                
                // Update navigation
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));

    // Smooth scroll for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
});
