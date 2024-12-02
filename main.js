document.querySelectorAll('.url-card').forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.animation = 'pulse 1s infinite';
    });
    
    card.addEventListener('mouseout', () => {
        card.style.animation = 'none';
    });
});

// Add smooth scroll behavior
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href.startsWith('http')) {
            // Add a nice click effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            anchor.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);
        }
    });
});
