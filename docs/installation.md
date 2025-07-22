# Hướng Dẫn Cài Đặt Template Blogspot Truyện

## Yêu Cầu Hệ Thống

- Tài khoản Google/Gmail
- Blog Blogger đã tạo sẵn
- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Kết nối internet ổn định

## Bước 1: Chuẩn Bị File Template

1. **Tải xuống template**: Đảm bảo bạn có file `template.xml` hoàn chỉnh
2. **Backup template cũ**: Trước khi cài đặt, hãy sao lưu template hiện tại của blog

### Backup Template Hiện Tại

1. Đăng nhập vào Blogger.com
2. Chọn blog của bạn
3. Vào **Theme** (Giao diện)
4. Click **Backup** (Sao lưu)
5. Lưu file backup vào máy tính

## Bước 2: Upload Template Mới

### Cách 1: Upload File XML

1. Trong trang **Theme**, click **Customize** (Tùy chỉnh)
2. Click **Edit HTML** (Chỉnh sửa HTML)
3. Xóa toàn bộ code hiện tại (Ctrl+A rồi Delete)
4. Copy toàn bộ nội dung file `template.xml`
5. Paste vào editor
6. Click **Save** (Lưu)

### Cách 2: Restore từ File

1. Trong trang **Theme**, click mũi tên xuống bên cạnh **Customize**
2. Chọn **Restore** (Khôi phục)
3. Chọn file `template.xml` từ máy tính
4. Click **Upload** (Tải lên)

## Bước 3: Cấu Hình Cơ Bản

### 3.1 Cập Nhật Thông Tin Blog

1. Vào **Settings** (Cài đặt) > **Basic** (Cơ bản)
2. Cập nhật:
   - **Title**: Tên blog truyện của bạn
   - **Description**: Mô tả về blog (tối đa 500 ký tự)
   - **Language**: Tiếng Việt

### 3.2 Cấu Hình Posts và Comments

1. Vào **Settings** > **Posts, comments and sharing**
2. Thiết lập:
   - **Show at most**: 6 posts (để hiển thị 6 truyện/trang)
   - **Comment location**: Embedded
   - **Comment moderation**: Always (để kiểm duyệt bình luận)

### 3.3 Cài Đặt Privacy

1. Vào **Settings** > **Privacy**
2. Chọn **Visible to search engines**: Yes
3. Bật **Adult content**: No (trừ khi blog có nội dung 18+)

## Bước 4: Tùy Chỉnh Template

### 4.1 Thay Đổi Logo

1. Vào **Theme** > **Customize**
2. Tìm phần **Header** hoặc **Logo**
3. Upload logo của bạn (khuyến nghị: 200x60px, PNG/JPG)

### 4.2 Cập Nhật Menu Navigation

1. Trong **Edit HTML**, tìm đoạn code:
```html
<ul class='nav-menu'>
  <li><a href='#'>Trang chủ</a></li>
  <li><a href='#'>Thể loại</a></li>
  <!-- Thêm menu items khác -->
</ul>
```

2. Thay đổi links và tên menu theo ý muốn

### 4.3 Cấu Hình Màu Sắc (Tùy chọn)

1. Trong **Edit HTML**, tìm phần CSS variables:
```css
:root {
  --primary-color: #2563eb;  /* Màu chính */
  --accent-color: #f59e0b;   /* Màu phụ */
  /* Thay đổi theo ý muốn */
}
```

## Bước 5: Cài Đặt Tính Năng Bổ Sung

### 5.1 Google Analytics

1. Tạo tài khoản Google Analytics
2. Lấy Tracking ID (dạng: GA_TRACKING_ID)
3. Trong template, thay thế `GA_TRACKING_ID` bằng ID thực của bạn

### 5.2 Facebook Comments

1. Tạo Facebook App tại developers.facebook.com
2. Lấy App ID
3. Trong template, cập nhật Facebook SDK với App ID của bạn

### 5.3 Google AdSense (Tùy chọn)

1. Đăng ký Google AdSense
2. Được duyệt và lấy mã quảng cáo
3. Thay thế phần `ads-placeholder` bằng mã AdSense thực

## Bước 6: Kiểm Tra và Test

### 6.1 Kiểm Tra Responsive

1. Mở blog trên các thiết bị khác nhau:
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)

### 6.2 Test Tính Năng

- [ ] Dark mode toggle hoạt động
- [ ] Search box hiển thị đúng
- [ ] Navigation menu responsive
- [ ] Story cards hiển thị đẹp
- [ ] Sidebar widgets hoạt động
- [ ] Comments system hoạt động

### 6.3 Kiểm Tra SEO

1. Sử dụng Google PageSpeed Insights
2. Kiểm tra meta tags với Facebook Debugger
3. Test structured data với Google Rich Results Test

## Bước 7: Tối Ưu Hóa

### 7.1 Tối Ưu Tốc Độ

1. Nén hình ảnh trước khi upload
2. Sử dụng CDN cho static files
3. Enable browser caching

### 7.2 SEO On-Page

1. Viết title và description hấp dẫn
2. Sử dụng heading tags đúng cách
3. Thêm alt text cho hình ảnh
4. Tạo sitemap XML

## Xử Lý Sự Cố Thường Gặp

### Lỗi Template Không Load

**Nguyên nhân**: Syntax error trong XML
**Giải pháp**: 
1. Kiểm tra lại file template.xml
2. Đảm bảo không có ký tự đặc biệt
3. Restore backup và thử lại

### Lỗi CSS Không Hiển Thị

**Nguyên nhân**: CDN links bị lỗi
**Giải pháp**:
1. Kiểm tra links CSS external
2. Thay thế bằng links backup
3. Host CSS files trên GitHub Pages

### Lỗi JavaScript Không Hoạt Động

**Nguyên nhân**: Conflict với Blogger scripts
**Giải pháp**:
1. Kiểm tra Console errors
2. Đảm bảo jQuery được load trước
3. Wrap code trong document.ready

## Hỗ Trợ

Nếu gặp vấn đề trong quá trình cài đặt:

1. **Email**: support@example.com
2. **Documentation**: Xem thêm tại docs/
3. **FAQ**: Câu hỏi thường gặp
4. **Community**: Diễn đàn hỗ trợ

## Cập Nhật Template

Để cập nhật template lên phiên bản mới:

1. Backup template hiện tại
2. Backup dữ liệu blog
3. Download template mới
4. So sánh và merge customizations
5. Test trên staging environment
6. Deploy lên production

---

**Lưu ý**: Luôn backup trước khi thực hiện bất kỳ thay đổi nào!
