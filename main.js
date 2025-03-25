// Card interaction handlers - improved for smoother transitions
document.querySelectorAll('.url-card').forEach(card => {
    // Hover effect with subtle rotation - reduced intensity for better experience
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xRotation = ((y - rect.height / 2) / rect.height) * 5; // Reduced from 8 to 5
        const yRotation = ((x - rect.width / 2) / rect.width) * -5; // Reduced from 8 to 5
        
        card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateY(-8px)`; // Reduced from -10px to -8px
    });
    
    // Reset on mouse leave
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });

    // Handle link clicks
    const link = card.querySelector('a');
    if (link) {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href) {
                window.open(href, '_blank');
            }
        });
    }
});

// Improved smooth scroll for the scroll indicator
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    const firstSection = document.querySelector('.category-section');
    if (firstSection) {
        const offsetTop = firstSection.offsetTop - 20; // 20px padding
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    } else {
        // Fallback if no sections found
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
});

// Improved Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Adjusted for better triggering
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all category sections
document.querySelectorAll('.category-section').forEach(section => {
    observer.observe(section);
});

// Add visible class to category sections that are already in view on page load
function handleVisibleSectionsOnLoad() {
    document.querySelectorAll('.category-section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            section.classList.add('visible');
        }
    });
}

// Run on page load after a small delay to allow for any initial animations
window.addEventListener('load', () => {
    setTimeout(handleVisibleSectionsOnLoad, 100);
});

// Function to ensure all cards have proper height for their content
function adjustCardHeights() {
    document.querySelectorAll('.url-card').forEach(card => {
        const content = card.querySelector('.card-content');
        const button = card.querySelector('a');
        
        if (content && button) {
            // Make sure card height accommodates content + button
            const totalContentHeight = content.scrollHeight + button.scrollHeight;
            if (totalContentHeight > card.offsetHeight) {
                card.style.height = totalContentHeight + 'px';
            }
        }
    });
}

// Run on load and resize
window.addEventListener('load', adjustCardHeights);
window.addEventListener('resize', adjustCardHeights);

// Run our card height adjustment after sections become visible
const originalObserverCallback = observer.callback;
observer.callback = (entries) => {
    originalObserverCallback(entries);
    setTimeout(adjustCardHeights, 50); // Small delay to allow for animations
};
