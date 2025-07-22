/* ===== DEMO DATA LOADER ===== */

(function() {
    'use strict';

    // Demo data URLs (replace with actual paths)
    const DEMO_DATA_URLS = {
        stories: './demo-data/stories.json',
        chapters: './demo-data/chapters.json'
    };

    // Cache for demo data
    let demoData = {
        stories: null,
        chapters: null,
        loaded: false
    };

    // Load demo data
    async function loadDemoData() {
        if (demoData.loaded) return demoData;

        try {
            const [storiesResponse, chaptersResponse] = await Promise.all([
                fetch(DEMO_DATA_URLS.stories),
                fetch(DEMO_DATA_URLS.chapters)
            ]);

            const storiesData = await storiesResponse.json();
            const chaptersData = await chaptersResponse.json();

            demoData.stories = storiesData.stories;
            demoData.chapters = chaptersData.chapters;
            demoData.categories = storiesData.categories;
            demoData.loaded = true;

            return demoData;
        } catch (error) {
            console.error('Error loading demo data:', error);
            // Fallback to inline demo data
            return getInlineDemoData();
        }
    }

    // Fallback inline demo data
    function getInlineDemoData() {
        return {
            stories: [
                {
                    id: 1,
                    title: "Tổng Giám Đốc Lạnh Lùng Và Cô Vợ Nhỏ",
                    author: "Minh Nguyệt",
                    genre: ["Ngôn tình", "Hiện đại"],
                    status: "Đang cập nhật",
                    chapters: 25,
                    views: 15200,
                    rating: 4.5,
                    cover: "https://via.placeholder.com/300x400/e2e8f0/64748b?text=TGD",
                    description: "Lâm Tiểu Hy, một cô gái bình thường, bất ngờ được sắp xếp kết hôn với Lý Hàn Thần...",
                    featured: true
                },
                {
                    id: 2,
                    title: "Kiếm Thần Vô Song",
                    author: "Phong Hỏa Hí Chư Hầu",
                    genre: ["Kiếm hiệp", "Huyền huyễn"],
                    status: "Đang cập nhật",
                    chapters: 180,
                    views: 28500,
                    rating: 4.7,
                    cover: "https://via.placeholder.com/300x400/1e40af/ffffff?text=KTV",
                    description: "Trần Phong, một thiếu niên bình thường, tình cờ nhặt được một thanh kiếm cổ...",
                    featured: true
                }
            ],
            chapters: [],
            categories: [
                { name: "Ngôn tình", count: 4 },
                { name: "Kiếm hiệp", count: 3 },
                { name: "Trinh thám", count: 2 },
                { name: "Teen", count: 3 },
                { name: "Cổ trang", count: 2 }
            ],
            loaded: true
        };
    }

    // Populate homepage with demo data
    async function populateHomepage() {
        const data = await loadDemoData();
        
        // Populate featured stories
        populateFeaturedStories(data.stories.filter(story => story.featured));
        
        // Populate latest stories
        populateLatestStories(data.stories);
        
        // Populate popular stories in sidebar
        populatePopularStories(data.stories.slice(0, 5));
        
        // Populate categories
        populateCategories(data.categories);
    }

    function populateFeaturedStories(stories) {
        const container = document.querySelector('.featured-stories');
        if (!container || !stories.length) return;

        const html = stories.map(story => `
            <div class="featured-story-card">
                <div class="featured-thumbnail">
                    <img src="${story.cover}" alt="${story.title}" loading="lazy">
                    <div class="featured-overlay">
                        <div class="featured-info">
                            <h3 class="featured-title">${story.title}</h3>
                            <p class="featured-author">Tác giả: ${story.author}</p>
                            <div class="featured-meta">
                                <span class="featured-chapters">${story.chapters} chương</span>
                                <span class="featured-views">${formatNumber(story.views)} lượt xem</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
    }

    function populateLatestStories(stories) {
        const container = document.querySelector('.stories-grid');
        if (!container) return;

        // Sort by last update (simulate)
        const sortedStories = [...stories].sort((a, b) => b.id - a.id);

        const html = sortedStories.map(story => `
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
                        <a href="/story/${story.id}" title="${story.title}">${story.title}</a>
                    </h3>
                    <p class="story-author">
                        <i class="fas fa-user"></i>
                        <span>${story.author}</span>
                    </p>
                    <p class="story-excerpt">${story.description.substring(0, 100)}...</p>
                    <div class="story-meta">
                        <span class="chapter-count">
                            <i class="fas fa-book"></i>
                            <span class="chapter-number">${story.chapters}</span> chương
                        </span>
                        <span class="update-time">
                            <i class="fas fa-calendar"></i>
                            ${getRelativeTime(new Date())}
                        </span>
                        <span class="view-count">
                            <i class="fas fa-eye"></i>
                            <span class="view-number">${formatNumber(story.views)}</span> lượt xem
                        </span>
                    </div>
                    <div class="story-actions">
                        <a href="/story/${story.id}/chapter/1" class="read-btn">
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

        container.innerHTML = html;
    }

    function populatePopularStories(stories) {
        const container = document.querySelector('.popular-list');
        if (!container) return;

        // Sort by views
        const popularStories = [...stories].sort((a, b) => b.views - a.views);

        const html = popularStories.map((story, index) => `
            <div class="popular-item">
                <div class="popular-rank">${index + 1}</div>
                <div class="popular-info">
                    <h4 class="popular-title">
                        <a href="/story/${story.id}">${story.title}</a>
                    </h4>
                    <p class="popular-meta">${formatNumber(story.views)} lượt xem • ${story.chapters} chương</p>
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
    }

    function populateCategories(categories) {
        const container = document.querySelector('.categories-list');
        if (!container || !categories) return;

        const html = categories.map(category => `
            <a class="category-tag" href="/category/${encodeURIComponent(category.name)}">
                ${category.name} 
                <span class="category-count">(${category.count})</span>
            </a>
        `).join('');

        container.innerHTML = html;
    }

    // Utility functions
    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    function getRelativeTime(date) {
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Vừa xong';
        if (diffInHours < 24) return `${diffInHours} giờ trước`;
        
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays} ngày trước`;
        
        const diffInWeeks = Math.floor(diffInDays / 7);
        if (diffInWeeks < 4) return `${diffInWeeks} tuần trước`;
        
        const diffInMonths = Math.floor(diffInDays / 30);
        return `${diffInMonths} tháng trước`;
    }

    // Initialize demo data when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Only populate on homepage
        if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
            populateHomepage();
        }
    });

    // Export functions for global use
    window.demoData = {
        load: loadDemoData,
        populateHomepage: populateHomepage,
        formatNumber: formatNumber,
        getRelativeTime: getRelativeTime
    };

})();
