/* ===== READER JAVASCRIPT - TRANG ĐỌC TRUYỆN ===== */

(function() {
    'use strict';

    // Reader settings
    let readerSettings = {
        fontSize: 'medium',
        readingMode: 'normal',
        autoScroll: false,
        scrollSpeed: 1
    };

    // Initialize reader when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        if (isReaderPage()) {
            initializeReader();
            loadReaderSettings();
            initializeFontControls();
            initializeReadingProgress();
            initializeKeyboardShortcuts();
            initializeAutoBookmark();
            initializeReadingMode();
        }
    });

    // ===== READER DETECTION =====
    function isReaderPage() {
        return document.querySelector('.chapter-content') !== null;
    }

    // ===== READER INITIALIZATION =====
    function initializeReader() {
        createReaderControls();
        createBackToTopButton();
        createReadingProgressBar();
        setupChapterNavigation();
    }

    function createReaderControls() {
        const container = document.querySelector('.reader-container');
        if (!container) return;

        const controlsHTML = `
            <div class="reader-controls">
                <div class="controls-row">
                    <div class="font-controls">
                        <span class="font-size-label">Cỡ chữ:</span>
                        <button class="font-size-btn" data-size="small">A-</button>
                        <button class="font-size-btn active" data-size="medium">A</button>
                        <button class="font-size-btn" data-size="large">A+</button>
                    </div>
                    <button class="reading-mode-toggle" data-tooltip="Chế độ đọc tập trung">
                        <i class="fas fa-book-open"></i>
                        <span>Chế độ đọc</span>
                    </button>
                </div>
            </div>
        `;

        const breadcrumb = container.querySelector('.breadcrumb');
        if (breadcrumb) {
            breadcrumb.insertAdjacentHTML('afterend', controlsHTML);
        } else {
            container.insertAdjacentHTML('afterbegin', controlsHTML);
        }
    }

    function createBackToTopButton() {
        if (document.querySelector('.back-to-top')) return;

        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTop.setAttribute('data-tooltip', 'Lên đầu trang');
        
        document.body.appendChild(backToTop);

        backToTop.addEventListener('click', () => {
            window.smoothScrollTo(document.body);
        });
    }

    function createReadingProgressBar() {
        if (document.querySelector('.reading-progress')) return;

        const progressHTML = `
            <div class="reading-progress">
                <div class="reading-progress-bar"></div>
            </div>
        `;

        document.body.insertAdjacentHTML('afterbegin', progressHTML);
    }

    // ===== FONT CONTROLS =====
    function initializeFontControls() {
        const fontButtons = document.querySelectorAll('.font-size-btn');
        const chapterContent = document.querySelector('.chapter-content');

        fontButtons.forEach(button => {
            button.addEventListener('click', () => {
                const size = button.dataset.size;
                changeFontSize(size);
                
                // Update active state
                fontButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    function changeFontSize(size) {
        const chapterContent = document.querySelector('.chapter-content');
        if (!chapterContent) return;

        // Remove existing font size classes
        chapterContent.classList.remove('font-small', 'font-medium', 'font-large');
        
        // Add new font size class
        chapterContent.classList.add(`font-${size}`);
        
        // Save setting
        readerSettings.fontSize = size;
        saveReaderSettings();

        // Show notification
        const sizeNames = {
            small: 'Nhỏ',
            medium: 'Vừa',
            large: 'Lớn'
        };
        window.showNotification(`Đã thay đổi cỡ chữ: ${sizeNames[size]}`, 'success');
    }

    // ===== READING PROGRESS =====
    function initializeReadingProgress() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateReadingProgress();
                    updateBackToTopVisibility();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial update
        updateReadingProgress();
        updateBackToTopVisibility();
    }

    function updateReadingProgress() {
        const progressBar = document.querySelector('.reading-progress-bar');
        const chapterContent = document.querySelector('.chapter-content');
        
        if (!progressBar || !chapterContent) return;

        const contentRect = chapterContent.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const contentTop = contentRect.top;
        const contentHeight = contentRect.height;

        let progress = 0;

        if (contentTop < 0) {
            progress = Math.min(Math.abs(contentTop) / (contentHeight - windowHeight), 1);
        }

        progressBar.style.width = `${progress * 100}%`;

        // Auto-bookmark progress
        if (progress > 0.1) {
            saveReadingProgress(progress);
        }
    }

    function updateBackToTopVisibility() {
        const backToTop = document.querySelector('.back-to-top');
        if (!backToTop) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    // ===== KEYBOARD SHORTCUTS =====
    function initializeKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ignore if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            switch(e.key) {
                case 'ArrowLeft':
                case 'h':
                    e.preventDefault();
                    navigateChapter('prev');
                    break;
                
                case 'ArrowRight':
                case 'l':
                    e.preventDefault();
                    navigateChapter('next');
                    break;
                
                case 'ArrowUp':
                case 'k':
                    e.preventDefault();
                    scrollPage(-1);
                    break;
                
                case 'ArrowDown':
                case 'j':
                    e.preventDefault();
                    scrollPage(1);
                    break;
                
                case ' ':
                    e.preventDefault();
                    scrollPage(e.shiftKey ? -1 : 1);
                    break;
                
                case 'Home':
                    e.preventDefault();
                    window.smoothScrollTo(document.body);
                    break;
                
                case 'End':
                    e.preventDefault();
                    window.smoothScrollTo(document.documentElement.scrollHeight);
                    break;
                
                case 't':
                    e.preventDefault();
                    window.toggleTheme();
                    break;
                
                case 'f':
                    e.preventDefault();
                    toggleReadingMode();
                    break;
                
                case '1':
                    e.preventDefault();
                    changeFontSize('small');
                    updateFontButtonState('small');
                    break;
                
                case '2':
                    e.preventDefault();
                    changeFontSize('medium');
                    updateFontButtonState('medium');
                    break;
                
                case '3':
                    e.preventDefault();
                    changeFontSize('large');
                    updateFontButtonState('large');
                    break;
            }
        });
    }

    function scrollPage(direction) {
        const scrollAmount = window.innerHeight * 0.8;
        const currentScroll = window.pageYOffset;
        const targetScroll = currentScroll + (scrollAmount * direction);
        
        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    }

    function navigateChapter(direction) {
        const navButtons = document.querySelectorAll('.nav-btn');
        let targetButton = null;

        navButtons.forEach(button => {
            if (direction === 'prev' && button.textContent.includes('trước')) {
                targetButton = button;
            } else if (direction === 'next' && button.textContent.includes('sau')) {
                targetButton = button;
            }
        });

        if (targetButton && targetButton.href) {
            window.location.href = targetButton.href;
        }
    }

    function updateFontButtonState(size) {
        const fontButtons = document.querySelectorAll('.font-size-btn');
        fontButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.size === size);
        });
    }

    // ===== READING MODE =====
    function initializeReadingMode() {
        const readingModeToggle = document.querySelector('.reading-mode-toggle');
        if (readingModeToggle) {
            readingModeToggle.addEventListener('click', toggleReadingMode);
        }
    }

    function toggleReadingMode() {
        const body = document.body;
        const isReadingMode = body.classList.contains('reading-mode');
        
        if (isReadingMode) {
            exitReadingMode();
        } else {
            enterReadingMode();
        }
    }

    function enterReadingMode() {
        document.body.classList.add('reading-mode');
        
        // Hide elements
        const elementsToHide = [
            '.header',
            '.sidebar',
            '.footer',
            '.breadcrumb',
            '.reader-controls',
            '.chapter-navigation'
        ];
        
        elementsToHide.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.display = 'none';
            }
        });

        // Update toggle button
        const toggle = document.querySelector('.reading-mode-toggle');
        if (toggle) {
            toggle.innerHTML = '<i class="fas fa-times"></i><span>Thoát chế độ đọc</span>';
            toggle.style.position = 'fixed';
            toggle.style.top = '20px';
            toggle.style.right = '20px';
            toggle.style.zIndex = '1000';
        }

        readerSettings.readingMode = 'focus';
        saveReaderSettings();
        window.showNotification('Đã bật chế độ đọc tập trung. Nhấn F để thoát.', 'info');
    }

    function exitReadingMode() {
        document.body.classList.remove('reading-mode');
        
        // Show elements
        const elementsToShow = [
            '.header',
            '.sidebar',
            '.footer',
            '.breadcrumb',
            '.reader-controls',
            '.chapter-navigation'
        ];
        
        elementsToShow.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.display = '';
            }
        });

        // Reset toggle button
        const toggle = document.querySelector('.reading-mode-toggle');
        if (toggle) {
            toggle.innerHTML = '<i class="fas fa-book-open"></i><span>Chế độ đọc</span>';
            toggle.style.position = '';
            toggle.style.top = '';
            toggle.style.right = '';
            toggle.style.zIndex = '';
        }

        readerSettings.readingMode = 'normal';
        saveReaderSettings();
    }

    // ===== CHAPTER NAVIGATION =====
    function setupChapterNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.href) {
                    // Save current reading position before navigating
                    saveCurrentPosition();
                }
            });
        });
    }

    // ===== AUTO BOOKMARK =====
    function initializeAutoBookmark() {
        // Load saved position
        loadSavedPosition();
        
        // Save position periodically
        setInterval(saveCurrentPosition, 30000); // Every 30 seconds
        
        // Save position before leaving page
        window.addEventListener('beforeunload', saveCurrentPosition);
    }

    function saveCurrentPosition() {
        const scrollPosition = window.pageYOffset;
        const chapterUrl = window.location.href;
        
        localStorage.setItem(`bookmark_${chapterUrl}`, scrollPosition);
    }

    function loadSavedPosition() {
        const chapterUrl = window.location.href;
        const savedPosition = localStorage.getItem(`bookmark_${chapterUrl}`);
        
        if (savedPosition && parseInt(savedPosition) > 100) {
            setTimeout(() => {
                window.scrollTo(0, parseInt(savedPosition));
                window.showNotification('Đã khôi phục vị trí đọc trước đó', 'info');
            }, 1000);
        }
    }

    function saveReadingProgress(progress) {
        const chapterUrl = window.location.href;
        const progressData = {
            progress: progress,
            timestamp: Date.now()
        };
        
        localStorage.setItem(`progress_${chapterUrl}`, JSON.stringify(progressData));
    }

    // ===== SETTINGS MANAGEMENT =====
    function saveReaderSettings() {
        localStorage.setItem('reader_settings', JSON.stringify(readerSettings));
    }

    function loadReaderSettings() {
        const saved = localStorage.getItem('reader_settings');
        if (saved) {
            readerSettings = { ...readerSettings, ...JSON.parse(saved) };
            applyReaderSettings();
        }
    }

    function applyReaderSettings() {
        // Apply font size
        changeFontSize(readerSettings.fontSize);
        updateFontButtonState(readerSettings.fontSize);
        
        // Apply reading mode
        if (readerSettings.readingMode === 'focus') {
            setTimeout(enterReadingMode, 500);
        }
    }

    // ===== EXPORT FUNCTIONS =====
    window.readerFunctions = {
        changeFontSize,
        toggleReadingMode,
        navigateChapter,
        saveCurrentPosition,
        loadSavedPosition
    };

})();
