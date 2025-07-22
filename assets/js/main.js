/* ===== MAIN JAVASCRIPT - TEMPLATE BLOGSPOT TRUYỆN ===== */

(function() {
    'use strict';

    // Global variables
    let currentTheme = 'light';
    let isSearching = false;
    
    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeTheme();
        initializeSearch();
        initializeLazyLoading();
        initializeScrollEffects();
        initializeMobileMenu();
        initializeTooltips();
    });

    // ===== THEME MANAGEMENT =====
    function initializeTheme() {
        // Load saved theme or default to light
        const savedTheme = localStorage.getItem('blog-theme') || 'light';
        currentTheme = savedTheme;
        
        // Apply theme
        document.body.setAttribute('data-theme', currentTheme);
        updateThemeIcon();
        
        // Add theme toggle event listener
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
    }

    function toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', currentTheme);
        localStorage.setItem('blog-theme', currentTheme);
        updateThemeIcon();
        
        // Animate theme transition
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    function updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-toggle i');
        if (themeIcon) {
            themeIcon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // ===== SEARCH FUNCTIONALITY =====
    function initializeSearch() {
        const searchInputs = document.querySelectorAll('.search-input');
        const searchButtons = document.querySelectorAll('.search-btn');
        
        searchInputs.forEach(input => {
            input.addEventListener('keypress', handleSearchKeypress);
            input.addEventListener('input', handleSearchInput);
        });
        
        searchButtons.forEach(button => {
            button.addEventListener('click', performSearch);
        });
    }

    function handleSearchKeypress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    }

    function handleSearchInput(e) {
        const query = e.target.value.trim();
        if (query.length > 2) {
            debounce(showSearchSuggestions, 300)(query);
        } else {
            hideSearchSuggestions();
        }
    }

    function performSearch() {
        const searchInput = document.querySelector('.search-input');
        const query = searchInput ? searchInput.value.trim() : '';
        
        if (query.length < 2) {
            showNotification('Vui lòng nhập ít nhất 2 ký tự để tìm kiếm', 'warning');
            return;
        }
        
        if (isSearching) return;
        
        isSearching = true;
        showSearchLoading();
        
        // Simulate search (replace with actual search implementation)
        setTimeout(() => {
            hideSearchLoading();
            isSearching = false;
            
            // Redirect to search results page
            const searchUrl = `/search?q=${encodeURIComponent(query)}`;
            window.location.href = searchUrl;
        }, 1000);
    }

    function showSearchSuggestions(query) {
        // Implementation for search suggestions
        console.log('Showing suggestions for:', query);
    }

    function hideSearchSuggestions() {
        const suggestions = document.querySelector('.search-suggestions');
        if (suggestions) {
            suggestions.style.display = 'none';
        }
    }

    function showSearchLoading() {
        const searchButtons = document.querySelectorAll('.search-btn');
        searchButtons.forEach(btn => {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;
        });
    }

    function hideSearchLoading() {
        const searchButtons = document.querySelectorAll('.search-btn');
        searchButtons.forEach(btn => {
            btn.innerHTML = '<i class="fas fa-search"></i>';
            btn.disabled = false;
        });
    }

    // ===== LAZY LOADING =====
    function initializeLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            // Observe all images with data-src attribute
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            document.querySelectorAll('img[data-src]').forEach(loadImage);
        }
    }

    function loadImage(img) {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
            
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            
            img.addEventListener('error', () => {
                img.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop&crop=face';
                img.style.filter = 'grayscale(100%) opacity(0.5)';
            });
        }
    }

    // ===== SCROLL EFFECTS =====
    function initializeScrollEffects() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header scroll effect
        const header = document.querySelector('.header');
        if (header) {
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            if (scrollTop > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
        
        // Reading progress (for single post pages)
        updateReadingProgress();
    }

    function updateReadingProgress() {
        const progressBar = document.querySelector('.reading-progress-bar');
        if (!progressBar) return;
        
        const content = document.querySelector('.chapter-content');
        if (!content) return;
        
        const contentTop = content.offsetTop;
        const contentHeight = content.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;
        
        const progress = Math.min(
            Math.max((scrollTop - contentTop + windowHeight) / contentHeight, 0),
            1
        );
        
        progressBar.style.width = `${progress * 100}%`;
    }

    // ===== MOBILE MENU =====
    function initializeMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileToggle.classList.toggle('active');
                
                // Update icon
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.className = navMenu.classList.contains('active') 
                        ? 'fas fa-times' 
                        : 'fas fa-bars';
                }
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    
                    const icon = mobileToggle.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-bars';
                    }
                }
            });
        }
    }

    // ===== TOOLTIPS =====
    function initializeTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', showTooltip);
            element.addEventListener('mouseleave', hideTooltip);
        });
    }

    function showTooltip(e) {
        const text = e.target.getAttribute('data-tooltip');
        if (!text) return;
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
        
        setTimeout(() => tooltip.classList.add('visible'), 10);
    }

    function hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    // ===== UTILITY FUNCTIONS =====
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('visible'), 10);
        
        setTimeout(() => {
            notification.classList.remove('visible');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    function smoothScrollTo(target, duration = 800) {
        const targetElement = typeof target === 'string' 
            ? document.querySelector(target) 
            : target;
            
        if (!targetElement) return;
        
        const targetPosition = targetElement.offsetTop - 100;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }

    // ===== GLOBAL FUNCTIONS =====
    window.toggleTheme = toggleTheme;
    window.smoothScrollTo = smoothScrollTo;
    window.showNotification = showNotification;

    // ===== BACK TO TOP FUNCTIONALITY =====
    document.addEventListener('click', (e) => {
        if (e.target.closest('.back-to-top')) {
            e.preventDefault();
            smoothScrollTo(document.body);
        }
    });

})();
