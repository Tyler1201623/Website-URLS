// Card animation handlers
document.querySelectorAll('.url-card').forEach(card => {
    const handleMouseOver = () => {
        card.style.animation = 'pulse 1s infinite';
    };
    
    const handleMouseOut = () => {
        card.style.animation = 'none';
    };
    
    card.addEventListener('mouseover', handleMouseOver);
    card.addEventListener('mouseout', handleMouseOut);
    
    // Clean up listeners when element is removed
    const observer = new MutationObserver((mutations) => {
        if (!document.contains(card)) {
            card.removeEventListener('mouseover', handleMouseOver);
            card.removeEventListener('mouseout', handleMouseOut);
            observer.disconnect();
        }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
});

// Anchor click handler with ripple effect
document.querySelectorAll('a').forEach(anchor => {
    const handleClick = (e) => {
        try {
            const href = anchor.getAttribute('href');
            if (!href) return;
            
            if (href.startsWith('http')) {
                // Position ripple effect at click coordinates
                const rect = anchor.getBoundingClientRect();
                const ripple = document.createElement('div');
                ripple.classList.add('ripple');
                
                // Position the ripple at click point
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                // Ensure anchor has position relative
                if (getComputedStyle(anchor).position === 'static') {
                    anchor.style.position = 'relative';
                }
                
                anchor.appendChild(ripple);
                
                // Remove ripple after animation
                ripple.addEventListener('animationend', () => {
                    ripple.remove();
                });
            }
        } catch (error) {
            console.error('Error handling anchor click:', error);
        }
    };
    
    anchor.addEventListener('click', handleClick);
    
    // Clean up listeners when element is removed
    const observer = new MutationObserver((mutations) => {
        if (!document.contains(anchor)) {
            anchor.removeEventListener('click', handleClick);
            observer.disconnect();
        }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
});