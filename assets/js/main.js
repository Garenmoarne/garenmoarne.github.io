document.addEventListener('DOMContentLoaded', () => {
    // Scroll handling
    const sections = document.querySelectorAll('.fullscreen-section');
    const navLinks = document.querySelectorAll('.neon-link');
    
    // Intersection Observer setup
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.5 });

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

    // Terminal text effect
    const terminalText = document.querySelector('.terminal-text');
    if (terminalText) {
        let text = "⇓⇓⇓SCROLL DOWN TO CONTINUE⇓⇓⇓";
        let index = 0;
        const timer = setInterval(() => {
            terminalText.textContent = text.substring(0, index);
            index++;
            if (index > text.length) clearInterval(timer);
        }, 100);
    }
});
