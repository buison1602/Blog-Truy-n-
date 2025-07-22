# Hướng Dẫn Tùy Chỉnh Template

## Tùy Chỉnh Màu Sắc và Giao Diện

### 1. Thay Đổi Màu Chủ Đạo

Tìm phần CSS variables trong template và chỉnh sửa:

```css
:root {
  /* Màu chính - thay đổi theo brand của bạn */
  --primary-color: #2563eb;        /* Xanh dương */
  --primary-hover: #1d4ed8;        /* Xanh đậm khi hover */
  
  /* Màu phụ */
  --accent-color: #f59e0b;         /* Vàng cam */
  --success-color: #10b981;        /* Xanh lá */
  --warning-color: #f59e0b;        /* Vàng */
  --error-color: #ef4444;          /* Đỏ */
}
```

### 2. Tùy Chỉnh Dark Mode

Chỉnh sửa màu cho dark mode:

```css
[data-theme="dark"] {
  --bg-color: #0f172a;            /* Nền tối */
  --surface-color: #1e293b;       /* Nền card */
  --text-primary: #f1f5f9;        /* Chữ chính */
  --text-secondary: #cbd5e1;      /* Chữ phụ */
  --border-color: #334155;        /* Viền */
}
```

### 3. Thay Đổi Font Chữ

```css
:root {
  /* Font cho giao diện */
  --font-sans: 'Roboto', 'Inter', sans-serif;
  
  /* Font cho nội dung truyện */
  --font-serif: 'Crimson Text', 'Times New Roman', serif;
}
```

## Tùy Chỉnh Layout

### 1. Thay Đổi Kích Thước Container

```css
:root {
  --container-max-width: 1400px;  /* Tăng độ rộng */
  --sidebar-width: 350px;         /* Tăng độ rộng sidebar */
}
```

### 2. Điều Chỉnh Grid Stories

```css
.stories-grid {
  /* Thay đổi số cột hiển thị */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--space-4);
}

/* Responsive cho mobile */
@media (max-width: 768px) {
  .stories-grid {
    grid-template-columns: 1fr; /* 1 cột trên mobile */
  }
}
```

## Tùy Chỉnh Header và Navigation

### 1. Thay Đổi Logo

Thay thế phần logo trong template:

```html
<a class='logo' expr:href='data:blog.homepageUrl'>
  <img src='URL_LOGO_CUA_BAN' alt='Logo' style='height: 40px;'/>
</a>
```

### 2. Cập Nhật Menu Navigation

```html
<ul class='nav-menu'>
  <li><a expr:href='data:blog.homepageUrl'>Trang chủ</a></li>
  <li><a href='/search/label/Ngôn%20tình'>Ngôn tình</a></li>
  <li><a href='/search/label/Kiếm%20hiệp'>Kiếm hiệp</a></li>
  <li><a href='/search/label/Trinh%20thám'>Trinh thám</a></li>
  <li><a href='/p/lien-he.html'>Liên hệ</a></li>
</ul>
```

### 3. Thêm Social Links

```html
<div class='social-links'>
  <a href='https://facebook.com/yourpage' target='_blank'>
    <i class='fab fa-facebook'></i>
  </a>
  <a href='https://twitter.com/yourhandle' target='_blank'>
    <i class='fab fa-twitter'></i>
  </a>
  <a href='mailto:contact@yourblog.com'>
    <i class='fas fa-envelope'></i>
  </a>
</div>
```

## Tùy Chỉnh Sidebar

### 1. Thêm Widget Mới

```html
<b:widget id='HTML5' locked='false' title='Widget Mới' type='HTML'>
  <b:includable id='main'>
    <div class='widget custom-widget'>
      <h3 class='widget-title'>
        <i class='fas fa-star'></i>
        Tiêu đề widget
      </h3>
      <div class='widget-content'>
        <!-- Nội dung widget -->
      </div>
    </div>
  </b:includable>
</b:widget>
```

### 2. Tùy Chỉnh Widget Categories

```html
<div class='categories-list'>
  <a class='category-tag' href='/search/label/Ngôn%20tình'>
    Ngôn tình <span class='category-count'>(25)</span>
  </a>
  <a class='category-tag' href='/search/label/Kiếm%20hiệp'>
    Kiếm hiệp <span class='category-count'>(18)</span>
  </a>
  <!-- Thêm các thể loại khác -->
</div>
```

## Tùy Chỉnh Trang Đọc Truyện

### 1. Thay Đổi Font Size Options

```javascript
// Trong reader.js, tùy chỉnh các size font
const fontSizes = {
  small: '16px',
  medium: '18px', 
  large: '20px',
  xlarge: '22px'  // Thêm size mới
};
```

### 2. Tùy Chỉnh Reader Controls

```html
<div class='reader-controls'>
  <div class='font-controls'>
    <span class='font-size-label'>Cỡ chữ:</span>
    <button class='font-size-btn' data-size='small'>Nhỏ</button>
    <button class='font-size-btn active' data-size='medium'>Vừa</button>
    <button class='font-size-btn' data-size='large'>Lớn</button>
    <button class='font-size-btn' data-size='xlarge'>Rất lớn</button>
  </div>
</div>
```

## Tùy Chỉnh SEO

### 1. Meta Tags Tùy Chỉnh

```html
<!-- Thêm vào phần head -->
<meta name='keywords' content='truyện chữ, đọc truyện online, [thể loại của bạn]'/>
<meta name='author' content='Tên tác giả/Admin'/>
<meta property='og:site_name' content='Tên Blog Của Bạn'/>
```

### 2. Schema Markup Tùy Chỉnh

```javascript
// Cập nhật thông tin trong schema
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Tên Blog Của Bạn",
  "url": "https://yourblog.blogspot.com",
  "description": "Mô tả blog của bạn",
  "publisher": {
    "@type": "Organization",
    "name": "Tên tổ chức/cá nhân",
    "logo": "URL logo của bạn"
  }
}
```

## Tùy Chỉnh Comments

### 1. Sử dụng Disqus

```html
<!-- Thay thế Facebook Comments -->
<div id='disqus_thread'></div>
<script>
var disqus_config = function () {
  this.page.url = '<data:post.url/>';
  this.page.identifier = '<data:post.id/>';
};
(function() {
  var d = document, s = d.createElement('script');
  s.src = 'https://YOUR_DISQUS_SHORTNAME.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
})();
</script>
```

### 2. Tùy Chỉnh Facebook Comments

```html
<div class='fb-comments' 
     expr:data-href='data:post.url' 
     data-width='100%' 
     data-numposts='10'
     data-colorscheme='light'
     data-order-by='social'>
</div>
```

## Tùy Chỉnh Responsive

### 1. Breakpoints Tùy Chỉnh

```css
/* Tablet nhỏ */
@media (max-width: 900px) {
  .main-content {
    grid-template-columns: 1fr;
  }
}

/* Mobile lớn */
@media (max-width: 600px) {
  .stories-grid {
    grid-template-columns: 1fr;
  }
}
```

### 2. Mobile Menu Tùy Chỉnh

```css
.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-primary);
  cursor: pointer;
}

@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: block;
  }
  
  .nav-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--surface-color);
    flex-direction: column;
    padding: var(--space-4);
  }
  
  .nav-menu.active {
    display: flex;
  }
}
```

## Tùy Chỉnh Performance

### 1. Lazy Loading Images

```html
<!-- Thay vì src, sử dụng data-src -->
<img data-src='URL_HINH_ANH' alt='Alt text' class='lazy-load'/>
```

### 2. Minify CSS

Sử dụng tools online để minify CSS:
- CSS Minifier
- UglifyCSS
- CleanCSS

### 3. Optimize JavaScript

```javascript
// Sử dụng async/defer cho external scripts
<script src='script.js' defer></script>
<script src='analytics.js' async></script>
```

## Backup và Version Control

### 1. Backup Template

```bash
# Tạo backup định kỳ
cp template.xml template-backup-$(date +%Y%m%d).xml
```

### 2. Git Version Control

```bash
git init
git add .
git commit -m "Initial template setup"
git branch -M main
git remote add origin https://github.com/username/blog-template.git
git push -u origin main
```

## Testing và Debug

### 1. Browser Testing

- Chrome DevTools
- Firefox Developer Tools
- Safari Web Inspector
- Edge DevTools

### 2. Performance Testing

- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Lighthouse

### 3. SEO Testing

- Google Search Console
- Facebook Debugger
- Twitter Card Validator
- Schema.org Validator

---

**Lưu ý**: Luôn test trên staging environment trước khi apply lên production!
