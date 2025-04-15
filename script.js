document.addEventListener("DOMContentLoaded", () => {
  // Add glitch effect to all elements with data-text attribute
  document.querySelectorAll(".glitch").forEach((element) => {
    const text = element.getAttribute("data-text");
    element.innerHTML = `
            <span aria-hidden="true">${text}</span>
            ${text}
            <span aria-hidden="true">${text}</span>
        `;
  });

  // Add scanline effect
  const crt = document.querySelector(".crt");
  setInterval(() => {
    crt.style.backgroundPosition = `${Math.random() * 100}% ${Math.random() * 100}%`;
  }, 50);

  // Add hover effect to project cards
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
});
