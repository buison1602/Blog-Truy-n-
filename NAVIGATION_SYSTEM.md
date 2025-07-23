# 🧭 Navigation System - Blog Truyện Template

## 📝 **Tổng Quan**
Hệ thống navigation hoàn chỉnh cho blog truyện với URL routing, deep linking, và SEO-friendly URLs.

## 🔗 **URL Structure**

### **Demo Mode (index.html)**
- **Homepage**: `index.html` hoặc `index.html#homepage`
- **Story Detail**: `index.html?story=kiem-than-vo-song&page=story-detail`
- **Reader**: `index.html?story=kiem-than-vo-song&chapter=1&page=reader`
- **Category**: `index.html?category=ngon-tinh&page=category`

### **Blogger Mode (template.xml)**
- **Homepage**: `/`
- **Story Detail**: `/2024/01/story-title.html`
- **Category**: `/search/label/Ngôn%20tình`
- **Search**: `/search?q=keyword`

## 🎯 **Navigation Functions**

### **Core Functions**
```javascript
// Navigate to story detail page
StoryNavigation.goToStory(storyId)

// Navigate to reading page
StoryNavigation.goToReader(storyId, chapterNumber)

// Navigate to category page
StoryNavigation.goToCategory(categoryName)

// Show homepage
StoryNavigation.showHomepage()
```

### **Utility Functions**
```javascript
// Create URL-friendly slug
URLUtils.createSlug(title)

// Create category slug
URLUtils.createCategorySlug(genre)

// Get URL parameters
URLUtils.getParams()

// Update URL without reload
URLUtils.updateURL(params)
```

## 📚 **Story Navigation**

### **"Đọc ngay" Buttons**
```html
<!-- Dynamic story reading -->
<a href="#" onclick="StoryNavigation.goToReader(${story.id}); return false;" class="read-btn">
    <i class="fas fa-book-open"></i>
    Đọc ngay
</a>
```

### **Story Title Links**
```html
<!-- Navigate to story detail -->
<a href="#" onclick="StoryNavigation.goToStory(${story.id}); return false;" title="${story.title}">
    ${story.title}
</a>
```

### **Chapter Navigation**
```html
<!-- Previous/Next chapter -->
<button onclick="navigateChapter('prev')">Chương trước</button>
<button onclick="navigateChapter('next')">Chương sau</button>

<!-- Chapter list -->
<a href="#" onclick="StoryNavigation.goToStory(1); return false;">Danh sách chương</a>
```

## 🏷️ **Category Navigation**

### **Category Tags**
```html
<!-- Filter by category -->
<a href="#" onclick="StoryNavigation.goToCategory('${category.name}'); return false;">
    ${category.name}
    <span class="category-count">(${category.count})</span>
</a>
```

### **Dropdown Menu**
```html
<li class="dropdown">
    <a href="#" class="dropdown-toggle">Thể loại <i class="fas fa-chevron-down"></i></a>
    <ul class="dropdown-menu">
        <li><a href="#" onclick="StoryNavigation.goToCategory('Ngôn tình'); return false;">Ngôn tình</a></li>
        <li><a href="#" onclick="StoryNavigation.goToCategory('Kiếm hiệp'); return false;">Kiếm hiệp</a></li>
    </ul>
</li>
```

## 🔍 **Filtering Functions**

### **Status Filtering**
```javascript
// Filter by completion status
filterByStatus('completed')  // Truyện hoàn thành
filterByStatus('updating')   // Truyện đang cập nhật
```

### **Category Filtering**
```javascript
// Show stories by category
StoryNavigation.goToCategory('Ngôn tình')
StoryNavigation.goToCategory('Kiếm hiệp')
```

## 🎨 **CSS Classes**

### **Dropdown Menu**
```css
.dropdown {
    position: relative;
}

.dropdown-menu {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all var(--transition-normal);
}

.dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}
```

## 📱 **Responsive Navigation**

### **Mobile Menu**
- Dropdown menus adapt to touch devices
- Simplified navigation for small screens
- Touch-friendly button sizes

### **Tablet Navigation**
- Optimized spacing for tablet screens
- Hover effects work on touch devices
- Readable font sizes

## 🔧 **Implementation Guide**

### **1. Include Navigation Script**
```html
<!-- In index.html -->
<script src="assets/js/navigation.js"></script>

<!-- In template.xml -->
<script src='https://cdn.jsdelivr.net/gh/yourusername/blogspot-template@main/assets/js/navigation.js'></script>
```

### **2. Update Story Cards**
```javascript
// Replace href="#" with navigation functions
const html = stories.map(story => `
    <article class="story-card">
        <h3 class="story-title">
            <a href="#" onclick="StoryNavigation.goToStory(${story.id}); return false;">
                ${story.title}
            </a>
        </h3>
        <a href="#" onclick="StoryNavigation.goToReader(${story.id}); return false;" class="read-btn">
            Đọc ngay
        </a>
    </article>
`);
```

### **3. Update Category Links**
```javascript
// Replace category href="#" with navigation
const html = categories.map(category => `
    <a href="#" onclick="StoryNavigation.goToCategory('${category.name}'); return false;">
        ${category.name}
    </a>
`);
```

## 🌟 **Features**

### **✅ Implemented**
- ✅ Story detail navigation
- ✅ Reading page navigation
- ✅ Category filtering
- ✅ Chapter navigation
- ✅ URL routing
- ✅ Browser back/forward support
- ✅ Deep linking
- ✅ Dropdown menus
- ✅ Responsive design

### **🔄 URL Mapping**
| Action | Demo URL | Blogger URL |
|--------|----------|-------------|
| Homepage | `index.html` | `/` |
| Story Detail | `?story=slug&page=story-detail` | `/2024/01/story-title.html` |
| Reader | `?story=slug&chapter=1&page=reader` | `/2024/01/story-title.html?chapter=1` |
| Category | `?category=slug&page=category` | `/search/label/Category` |

### **🎯 SEO Benefits**
- Clean, readable URLs
- Proper breadcrumb navigation
- Category-based organization
- Search engine friendly structure

## 🚀 **Usage Examples**

### **Basic Navigation**
```javascript
// Go to story detail
StoryNavigation.goToStory(1);

// Start reading from chapter 1
StoryNavigation.goToReader(1, 1);

// Show romance stories
StoryNavigation.goToCategory('Ngôn tình');

// Return to homepage
StoryNavigation.showHomepage();
```

### **Advanced Navigation**
```javascript
// Navigate with URL update
URLUtils.updateURL({ story: 'kiem-than-vo-song', page: 'story-detail' });

// Get current page parameters
const params = URLUtils.getParams();
console.log(params.story, params.chapter);

// Create SEO-friendly slug
const slug = URLUtils.createSlug('Kiếm Thần Vô Song');
// Result: "kiem-than-vo-song"
```

## 🔍 **Testing**

### **Test Navigation**
1. Click story titles → Should go to story detail
2. Click "Đọc ngay" → Should go to reader
3. Click category tags → Should filter stories
4. Use browser back/forward → Should work correctly
5. Refresh page → Should maintain current state

### **Test URLs**
1. `index.html?story=kiem-than-vo-song&page=story-detail`
2. `index.html?story=kiem-than-vo-song&chapter=1&page=reader`
3. `index.html?category=ngon-tinh&page=category`

Hệ thống navigation giờ đây hoàn chỉnh và ready for production! 🎉
