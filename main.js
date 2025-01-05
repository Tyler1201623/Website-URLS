// Simple anchor click handler
document.querySelectorAll('.url-card a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href) {
            window.open(href, '_blank');
        }
    });
});
