/**
 * Nivaya Documentation Script
 * Handles Theme Toggling and Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeBtns = document.querySelectorAll('.theme-btn');
    const htmlEl = document.documentElement;
    
    // 1. Theme Logic
    const setTheme = (theme) => {
        if (theme === 'system') {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            htmlEl.setAttribute('data-theme', isDark ? 'dark' : 'light');
        } else {
            htmlEl.setAttribute('data-theme', theme);
        }
        
        // Update Active Button
        themeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });
        
        // Save Preference
        localStorage.setItem('nivaya-doc-theme', theme);
    };

    // Initialize Theme
    const savedTheme = localStorage.getItem('nivaya-doc-theme') || 'system';
    setTheme(savedTheme);

    // Event Listeners for Theme Buttons
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setTheme(btn.dataset.theme);
        });
    });

    // Handle System Theme Changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem('nivaya-doc-theme') === 'system') {
            htmlEl.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });

    // 2. Scroll Spy Logic
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveLink = () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink(); // Initial check
});
