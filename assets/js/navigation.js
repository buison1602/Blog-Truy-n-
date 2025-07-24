/* ===== NAVIGATION SYSTEM - BLOG TRUYỆN ===== */

(function() {
    'use strict';

    // Global navigation state
    let currentStory = null;
    let currentChapter = null;
    let currentCategory = null;

    // URL utilities
    const URLUtils = {
        // Create story slug from title
        createSlug: function(title) {
            return title
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
                .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .replace(/-+/g, '-') // Replace multiple hyphens
                .trim('-'); // Remove leading/trailing hyphens
        },

        // Create category slug from genre
        createCategorySlug: function(genre) {
            const categoryMap = {
                'Ngôn tình': 'ngon-tinh',
                'Kiếm hiệp': 'kiem-hiep', 
                'Trinh thám': 'trinh-tham',
                'Teen': 'teen',
                'Học đường': 'hoc-duong',
                'Cổ trang': 'co-trang',
                'Cung đấu': 'cung-dau',
                'Hoàng gia': 'hoang-gia',
                'Hiện đại': 'hien-dai',
                'Tổng giám đốc': 'tong-giam-doc',
                'Huyền huyễn': 'huyen-huyen',
                'Tu tiên': 'tu-tien',
                'Ma pháp': 'ma-phap',
                'Bí ẩn': 'bi-an',
                'Hành động': 'hanh-dong',
                'Tình yêu': 'tinh-yeu',
                'Khoa học viễn tưởng': 'khoa-hoc-vien-tuong',
                'Siêu năng lực': 'sieu-nang-luc',
                'Phiêu lưu': 'phieu-luu'
            };
            return categoryMap[genre] || this.createSlug(genre);
        },

        // Parse URL parameters
        getParams: function() {
            const params = new URLSearchParams(window.location.search);
            const hash = window.location.hash.substring(1);
            
            return {
                story: params.get('story'),
                chapter: params.get('chapter'),
                category: params.get('category'),
                page: params.get('page') || hash || 'homepage'
            };
        },

        // Update URL without page reload
        updateURL: function(params) {
            const url = new URL(window.location);
            
            // Clear existing params
            url.search = '';
            
            // Add new params
            Object.keys(params).forEach(key => {
                if (params[key]) {
                    url.searchParams.set(key, params[key]);
                }
            });
            
            window.history.pushState({}, '', url);
        }
    };

    // Story navigation functions
    const StoryNavigation = {
        // Navigate to story detail page
        goToStory: function(storyId) {
            const story = this.findStoryById(storyId);
            if (!story) return;

            const slug = URLUtils.createSlug(story.title);
            URLUtils.updateURL({ story: slug, page: 'story-detail' });
            
            currentStory = story;
            this.showStoryDetail(story);
        },

        // Navigate to reading page
        goToReader: function(storyId, chapterNumber = 1) {
            const story = this.findStoryById(storyId);
            if (!story) return;

            const slug = URLUtils.createSlug(story.title);
            URLUtils.updateURL({ 
                story: slug, 
                chapter: chapterNumber,
                page: 'reader' 
            });
            
            currentStory = story;
            currentChapter = chapterNumber;
            this.showReader(story, chapterNumber);
        },

        // Navigate to category page
        goToCategory: function(categoryName) {
            const slug = URLUtils.createCategorySlug(categoryName);
            URLUtils.updateURL({ category: slug, page: 'category' });
            
            currentCategory = categoryName;
            this.showCategoryPage(categoryName);
        },

        // Find story by ID
        findStoryById: function(id) {
            if (typeof demoData !== 'undefined' && demoData.stories) {
                return demoData.stories.find(story => story.id == id);
            }
            return null;
        },

        // Find story by slug
        findStoryBySlug: function(slug) {
            if (typeof demoData !== 'undefined' && demoData.stories) {
                return demoData.stories.find(story => 
                    URLUtils.createSlug(story.title) === slug
                );
            }
            return null;
        },

        // Show story detail page
        showStoryDetail: function(story) {
            // Hide all demo sections
            document.querySelectorAll('.demo-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show story detail section
            const storyDetailSection = document.getElementById('story-detail');
            if (storyDetailSection) {
                storyDetailSection.classList.add('active');
                this.updateStoryDetailContent(story);
            }
        },

        // Show reader page
        showReader: function(story, chapterNumber) {
            // Hide all demo sections
            document.querySelectorAll('.demo-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show reader section
            const readerSection = document.getElementById('reader');
            if (readerSection) {
                readerSection.classList.add('active');
                this.updateReaderContent(story, chapterNumber);
            }
        },

        // Show category page
        showCategoryPage: function(categoryName) {
            // Filter stories by category
            const filteredStories = demoData.stories.filter(story => 
                story.genre.includes(categoryName)
            );
            
            // Update homepage with filtered stories
            this.showHomepage();
            this.updateStoriesGrid(filteredStories, `Thể loại: ${categoryName}`);
        },

        // Show homepage
        showHomepage: function() {
            document.querySelectorAll('.demo-section').forEach(section => {
                section.classList.remove('active');
            });
            
            const homepageSection = document.getElementById('homepage');
            if (homepageSection) {
                homepageSection.classList.add('active');
            }
        },

        // Update story detail content
        updateStoryDetailContent: function(story) {
            // Update story info in detail page
            const titleElement = document.querySelector('#story-detail .story-title');
            const coverElement = document.querySelector('#story-detail .cover-image');
            const authorElement = document.querySelector('#story-detail .story-author');
            const descElement = document.querySelector('#story-detail .story-description');
            
            if (titleElement) titleElement.textContent = story.title;
            if (coverElement) coverElement.src = story.cover;
            if (authorElement) authorElement.textContent = story.author;
            if (descElement) descElement.textContent = story.description;
        },

        // Update reader content
        updateReaderContent: function(story, chapterNumber) {
            // Load chapter content from chapters.json
            this.loadChapterContent(story.id, chapterNumber).then(chapter => {
                const titleElement = document.querySelector('#reader .chapter-title');
                const contentElement = document.querySelector('#reader .chapter-content');

                if (titleElement && chapter) {
                    titleElement.textContent = chapter.title;
                }

                if (contentElement && chapter) {
                    // Format chapter content with proper paragraphs
                    const formattedContent = chapter.content
                        .split('\n\n')
                        .map(paragraph => `<p>${paragraph.trim()}</p>`)
                        .join('');

                    contentElement.innerHTML = `
                        <div class="chapter-header">
                            <h2>${chapter.title}</h2>
                            <div class="chapter-meta">
                                <span class="story-title">${story.title}</span>
                                <span class="chapter-info">${chapter.wordCount} từ • ${new Date(chapter.publishDate).toLocaleDateString('vi-VN')}</span>
                            </div>
                        </div>
                        <div class="chapter-text">
                            ${formattedContent}
                        </div>
                    `;
                } else {
                    // Fallback content if chapter not found
                    contentElement.innerHTML = `
                        <div class="chapter-header">
                            <h2>Chương ${chapterNumber}: Đang cập nhật</h2>
                            <div class="chapter-meta">
                                <span class="story-title">${story.title}</span>
                            </div>
                        </div>
                        <div class="chapter-text">
                            <p>Chương này đang được tác giả cập nhật. Vui lòng quay lại sau!</p>
                        </div>
                    `;
                }
            });
        },

        // Load chapter content from JSON
        loadChapterContent: function(storyId, chapterNumber) {
            return fetch('./demo-data/chapters.json')
                .then(response => response.json())
                .then(data => {
                    return data.chapters.find(chapter =>
                        chapter.storyId === storyId && chapter.chapterNumber === chapterNumber
                    );
                })
                .catch(error => {
                    console.error('Error loading chapter content:', error);
                    return null;
                });
        },

        // Update stories grid with filtered results
        updateStoriesGrid: function(stories, title = 'Cập nhật mới nhất') {
            const titleElement = document.querySelector('.latest-section .section-title');
            const gridElement = document.querySelector('.stories-grid');
            
            if (titleElement) {
                titleElement.innerHTML = `<i class="fas fa-filter"></i> ${title}`;
            }
            
            if (gridElement && stories.length > 0) {
                const html = stories.map(story => `
                    <article class="story-card">
                        <div class="story-thumbnail">
                            <img src="${story.cover}" alt="${story.title}" loading="lazy">
                            <div class="story-overlay">
                                <div class="story-status">
                                    ${story.genre.map(g => `<span class="status-badge">${g}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                        <div class="story-info">
                            <h3 class="story-title">
                                <a href="#" onclick="StoryNavigation.goToStory(${story.id}); return false;" title="${story.title}">${story.title}</a>
                            </h3>
                            <p class="story-author">
                                <i class="fas fa-user"></i>
                                <span>${story.author}</span>
                            </p>
                            <p class="story-excerpt">${story.description.substring(0, 100)}...</p>
                            <div class="story-meta">
                                <!-- Chapter count hidden for simplified demo -->
                                <!-- <span class="chapter-count">
                                    <i class="fas fa-book"></i>
                                    <span class="chapter-number">${story.chapters}</span> chương
                                </span> -->
                                <span class="view-count">
                                    <i class="fas fa-eye"></i>
                                    <span class="view-number">${story.views}</span> lượt xem
                                </span>
                            </div>
                            <div class="story-actions">
                                <a href="#" onclick="StoryNavigation.goToReader(${story.id}); return false;" class="read-btn">
                                    <i class="fas fa-book-open"></i>
                                    Đọc ngay
                                </a>
                                <button class="bookmark-btn" data-story-id="${story.id}">
                                    <i class="far fa-bookmark"></i>
                                </button>
                            </div>
                        </div>
                    </article>
                `).join('');
                
                gridElement.innerHTML = html;
            }
        }
    };

    // Initialize navigation system
    function initializeNavigation() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', handleURLChange);
        
        // Handle initial page load
        handleURLChange();
        
        // Make navigation functions globally available
        window.StoryNavigation = StoryNavigation;
        window.URLUtils = URLUtils;
    }

    // Handle URL changes
    function handleURLChange() {
        const params = URLUtils.getParams();
        
        switch (params.page) {
            case 'story-detail':
                if (params.story) {
                    const story = StoryNavigation.findStoryBySlug(params.story);
                    if (story) {
                        StoryNavigation.showStoryDetail(story);
                    }
                }
                break;
                
            case 'reader':
                if (params.story) {
                    const story = StoryNavigation.findStoryBySlug(params.story);
                    if (story) {
                        const chapter = parseInt(params.chapter) || 1;
                        StoryNavigation.showReader(story, chapter);
                    }
                }
                break;
                
            case 'category':
                if (params.category) {
                    // Find category name from slug
                    const categoryName = Object.keys({
                        'ngon-tinh': 'Ngôn tình',
                        'kiem-hiep': 'Kiếm hiệp',
                        'trinh-tham': 'Trinh thám',
                        'teen': 'Teen',
                        'co-trang': 'Cổ trang'
                    }).find(key => key === params.category);
                    
                    if (categoryName) {
                        StoryNavigation.showCategoryPage(categoryName);
                    }
                }
                break;
                
            default:
                StoryNavigation.showHomepage();
                break;
        }
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', initializeNavigation);

})();
