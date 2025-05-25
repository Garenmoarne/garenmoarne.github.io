document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('backgroundMusic');
    const toggleButton = document.getElementById('toggleAudio');
    
    // Auto-play is often blocked by browsers
    // So we'll wait for user interaction
    toggleButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play()
                .then(() => {
                    toggleButton.classList.add('audio-playing');
                })
                .catch(error => {
                    console.error('Audio playback failed:', error);
                });
        } else {
            audio.pause();
            toggleButton.classList.remove('audio-playing');
        }
    });
    
    // Add ambient effects
    const container = document.querySelector('.container');
    
    // Subtle parallax effect on mouse move
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const depth = 100; // Lower = more subtle
        const moveX = mouseX * depth;
        const moveY = mouseY * depth;
        
        container.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
    });
    
    // Fade in elements
    document.querySelectorAll('.welcome-text, .logo').forEach(element => {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.transition = 'opacity 2s ease-in-out';
            element.style.opacity = '1';
        }, 100);
    });
});
